
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useCollection } from "@/firebase";
import { useSettings } from "@/context/settings-context";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { collection, query, where, orderBy } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useMemoFirebase } from "@/firebase/firestore/use-collection";

export default function ProfilePage() {
  const { user, loading, logout } = useUser();
  const { lang } = useSettings();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const ordersQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
  }, [firestore, user]);

  const { data: orders } = useCollection(ordersQuery);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 py-24 container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-6 mb-16 p-8 bg-card rounded-3xl border border-border">
          <Avatar className="h-20 w-20 ring-4 ring-primary/20">
            <AvatarImage src={user.photoURL || ""} />
            <AvatarFallback className="bg-primary text-white font-bold text-xl">
              {user.displayName?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-3xl font-display">{user.displayName}</h1>
            <p className="text-foreground/60">{user.email}</p>
          </div>
          <button onClick={() => logout()} className="text-sm font-bold text-destructive hover:underline">
            {lang === 'en' ? "Logout" : "लॉगआउट"}
          </button>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-headline font-bold">{lang === 'en' ? "Order History" : "ऑर्डर इतिहास"}</h2>
          {orders && orders.length > 0 ? (
            orders.map((order: any) => (
              <div key={order.id} className="p-6 bg-card rounded-2xl border border-border shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">
                      {order.createdAt?.toDate().toLocaleDateString()}
                    </p>
                    <p className="font-bold">₹{order.total}</p>
                  </div>
                  <Badge variant="secondary" className="uppercase text-[10px] tracking-widest">
                    {order.status}
                  </Badge>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="min-w-[40px] h-10 w-10 relative rounded-md overflow-hidden bg-muted">
                      <img src={item.imageUrl} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-12 text-foreground/40 bg-muted/10 rounded-2xl border border-dashed border-border">
              {lang === 'en' ? "No orders yet." : "अभी तक कोई ऑर्डर नहीं है।"}
            </p>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
