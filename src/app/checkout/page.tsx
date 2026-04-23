
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
import { Badge } from "@/components/ui/badge";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { Trash2, ShoppingBag, ArrowRight, Bike, Clock, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { user, isUserLoading } = useUser();
  const { cart, totalPrice, removeFromCart, clearCart } = useCart();
  const { lang } = useSettings();
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handlePlaceOrder = () => {
    if (!firestore || !user || cart.length === 0) return;
    setIsProcessing(true);

    const orderData = {
      userId: user.uid,
      items: cart,
      total: totalPrice + 30, // ₹30 Delivery charge
      paymentMethod,
      status: "preparing",
      deliveryTime: "45-60 min",
      createdAt: serverTimestamp(),
    };

    const colRef = collection(firestore, "orders");
    const newOrderRef = doc(colRef);

    // Non-blocking write to leverage optimistic UI
    setDoc(newOrderRef, orderData)
      .catch(async (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: newOrderRef.path,
          operation: 'create',
          requestResourceData: orderData,
        });
        errorEmitter.emit('permission-error', permissionError);
        setIsProcessing(false);
      });

    toast({
      title: lang === 'en' ? "Order Placed!" : "ऑर्डर दिया गया!",
      description: lang === 'en' ? "Your order will be delivered soon." : "आपका ऑर्डर जल्द ही पहुँचा दिया जाएगा।",
    });

    clearCart();
    router.push(`/order-track/${newOrderRef.id}`);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 py-32 container mx-auto px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-display mb-12">
          {lang === 'en' ? "Harit" : "हरित"} <span className="text-primary italic">{lang === 'en' ? "Checkout" : "चेकआउट"}</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                    <Bike size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Hyper-local Pincode Delivery</p>
                    <p className="text-xs text-foreground/40">Est. Time: 45-60 mins</p>
                  </div>
               </div>
               <Badge variant="outline" className="border-primary/20 text-primary font-bold">₹30 CHARGE</Badge>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-20 bg-muted/20 rounded-[2.5rem] border border-dashed border-border">
                <ShoppingBag className="mx-auto h-12 w-12 text-foreground/20 mb-4" />
                <p className="text-foreground/40">{lang === 'en' ? "Your cart is empty." : "आपका कार्ट खाली है।"}</p>
                <Button variant="link" onClick={() => router.push("/products")} className="text-primary mt-4 font-bold">
                  {lang === 'en' ? "Explore Nearby Farms →" : "पास के खेतों को देखें →"}
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-card rounded-[2rem] border border-border items-center">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-muted">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline font-bold">{item.name}</h3>
                    <p className="text-sm text-foreground/60">₹{item.price} x {item.quantity}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10 rounded-xl">
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))
            )}
          </div>

          <div className="space-y-8">
            <div className="p-8 bg-card rounded-[2.5rem] border border-border shadow-xl">
              <h2 className="text-xl font-headline font-bold mb-6">{lang === 'en' ? "Bill Summary" : "बिल का विवरण"}</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">{lang === 'en' ? "Item Total" : "आइटम का कुल"}</span>
                  <span className="font-bold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">{lang === 'en' ? "Delivery Fee" : "वितरण शुल्क"}</span>
                  <span className="text-primary font-bold">₹30</span>
                </div>
                <div className="pt-4 border-t border-border flex justify-between text-lg font-bold">
                  <span>{lang === 'en' ? "Grand Total" : "कुल योग"}</span>
                  <span className="text-primary">₹{totalPrice + 30}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{lang === 'en' ? "Payment Method" : "भुगतान का तरीका"}</p>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="gap-3">
                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer font-medium">{lang === 'en' ? "Cash on Delivery" : "कैश ऑन डिलीवरी"}</Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-xl border border-border cursor-pointer hover:bg-muted/30 opacity-50">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex-1 cursor-pointer font-medium">{lang === 'en' ? "Credit/Debit Card (Coming Soon)" : "क्रेडिट/डेबिट कार्ड"}</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="p-4 bg-muted/30 rounded-xl mb-6 flex items-start gap-3">
                 <ShieldCheck className="text-primary shrink-0" size={16} />
                 <p className="text-[10px] text-foreground/60 leading-relaxed">
                   By placing order, you agree to KrishiAI's quality and organic standards.
                 </p>
              </div>

              <Button 
                onClick={handlePlaceOrder}
                disabled={isProcessing || cart.length === 0}
                className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-8 font-bold text-lg shadow-lg shadow-primary/20 group"
              >
                {isProcessing ? "Processing..." : (lang === 'en' ? "Place Order" : "ऑर्डर करें")}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
