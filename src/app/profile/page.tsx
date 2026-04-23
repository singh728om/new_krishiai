
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { useSettings } from "@/context/settings-context";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { collection, query, where, orderBy } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation, Package, Clock, IndianRupee } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isUserLoading, logout } = useUser();
  const { lang } = useSettings();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/login");
  }, [user, isUserLoading, router]);

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [firestore, user]);

  const { data: orders } = useCollection(ordersQuery);

  if (isUserLoading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 py-32 container mx-auto px-6 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 p-10 bg-card rounded-[3rem] border border-border shadow-sm">
          <Avatar className="h-24 w-24 ring-4 ring-primary/20">
            <AvatarImage src={user.photoURL || ""} />
            <AvatarFallback className="bg-primary text-white font-bold text-2xl">
              {user.displayName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-display">{user.displayName}</h1>
            <p className="text-foreground/60 font-body">{user.email}</p>
          </div>
          <Button variant="outline" onClick={() => logout()} className="rounded-full px-8 h-12 border-destructive/20 text-destructive hover:bg-destructive/5 font-bold">
            {lang === 'en' ? "Logout" : "लॉगआउट"}
          </Button>
        </div>

        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-display italic">{lang === 'en' ? "Order History" : "ऑर्डर इतिहास"}</h2>
            <Link href="/products">
              <Button variant="link" className="text-primary font-bold">New Order →</Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {orders && orders.length > 0 ? (
              orders.map((order: any) => (
                <div key={order.id} className="p-8 bg-card rounded-[2.5rem] border border-border shadow-sm hover:shadow-lg transition-all group">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="space-y-1">
                      <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-[0.2em]">
                        {order.createdAt?.toDate().toLocaleDateString(undefined, { dateStyle: 'long' })}
                      </p>
                      <p className="text-2xl font-display flex items-center gap-2">
                        <IndianRupee size={20} className="text-primary" />
                        {order.total}
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                       <Badge variant="secondary" className="uppercase text-[10px] tracking-widest px-4 py-2 bg-muted/50">
                         {order.status}
                       </Badge>
                       {(order.status === 'preparing' || order.status === 'delivering') && (
                         <Link href={`/order-track/${order.id}`}>
                           <Button size="sm" className="rounded-full bg-primary text-white font-bold gap-2">
                              <Navigation size={14} /> Track Live
                           </Button>
                         </Link>
                       )}
                    </div>
                  </div>

                  <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar border-t border-border pt-6">
                    {order.items.map((item: any, i: number) => (
                      <div key={i} className="flex-shrink-0 flex items-center gap-3 bg-muted/20 p-2 rounded-2xl border border-border">
                        <div className="h-12 w-12 relative rounded-xl overflow-hidden bg-muted">
                          <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                        </div>
                        <div className="pr-4">
                           <p className="text-xs font-bold whitespace-nowrap">{item.name}</p>
                           <p className="text-[10px] text-foreground/40 font-medium">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-24 bg-muted/10 rounded-[3rem] border border-dashed border-border space-y-6">
                <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto text-foreground/20">
                  <Package size={40} />
                </div>
                <p className="text-foreground/40 font-medium">{lang === 'en' ? "No orders found." : "कोई ऑर्डर नहीं मिला।"}</p>
                <Link href="/products">
                  <Button className="rounded-full px-8">Start Shopping</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
