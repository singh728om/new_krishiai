"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore } from "@/firebase";
import { useCart } from "@/context/cart-context";
import { useSettings } from "@/context/settings-context";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { user, loading } = useUser();
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const { lang } = useSettings();
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handlePlaceOrder = () => {
    if (!firestore || !user || cart.length === 0) return;
    setIsProcessing(true);

    const orderData = {
      userId: user.uid,
      items: cart,
      total: totalPrice,
      paymentMethod,
      status: "pending",
      createdAt: serverTimestamp(),
    };

    const colRef = collection(firestore, "orders");

    // Optimistic write
    addDoc(colRef, orderData)
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: colRef.path,
          operation: 'create',
          requestResourceData: orderData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

    toast({
      title: lang === 'en' ? "Order Placed!" : "ऑर्डर दिया गया!",
      description: lang === 'en' ? "Your order will be delivered soon." : "आपका ऑर्डर जल्द ही पहुँचा दिया जाएगा।",
    });

    clearCart();
    router.push("/profile");
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 py-24 container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-display mb-12">
          {lang === 'en' ? "Your" : "आपका"} <span className="text-primary italic">{lang === 'en' ? "Cart" : "कार्ट"}</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
                <ShoppingBag className="mx-auto h-12 w-12 text-foreground/20 mb-4" />
                <p className="text-foreground/40">{lang === 'en' ? "Your cart is empty." : "आपका कार्ट खाली है।"}</p>
                <Button variant="link" onClick={() => router.push("/products")} className="text-primary mt-4">
                  {lang === 'en' ? "Go Shopping →" : "खरीदारी करें →"}
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-card rounded-2xl border border-border items-center">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline font-bold">{item.name}</h3>
                    <p className="text-sm text-foreground/60">₹{item.price} x {item.quantity}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive">
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-card rounded-3xl border border-border shadow-xl">
              <h2 className="text-xl font-headline font-bold mb-6">{lang === 'en' ? "Summary" : "विवरण"}</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-foreground/60">{lang === 'en' ? "Subtotal" : "उपयोग"}</span>
                  <span className="font-bold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">{lang === 'en' ? "Shipping" : "शिपिंग"}</span>
                  <span className="text-primary font-bold">{lang === 'en' ? "FREE" : "मुफ्त"}</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
                  <span>{lang === 'en' ? "Total" : "कुल"}</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">{lang === 'en' ? "Payment Method" : "भुगतान का तरीका"}</p>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">{lang === 'en' ? "Cash on Delivery" : "कैश ऑन डिलीवरी"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">{lang === 'en' ? "Credit/Debit Card" : "क्रेडिट/डेबिट कार्ड"}</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={handlePlaceOrder}
                disabled={isProcessing || cart.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-6 font-bold"
              >
                {isProcessing ? "Processing..." : (lang === 'en' ? "Place Order" : "ऑर्डर करें")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
