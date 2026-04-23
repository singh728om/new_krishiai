
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { useUser } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bike, MapPin, IndianRupee, Clock, Navigation, CheckCircle2 } from "lucide-react";

const MOCK_ORDERS = [
  { id: "ORD-9912", items: "Organic Tomatoes", price: 180, distance: "1.2km", status: "Ready", farm: "Varanasi North Plot" },
  { id: "ORD-9915", items: "Banarasi Mangoes", price: 600, distance: "3.4km", status: "Picking", farm: "Ghazipur Road Farm" },
  { id: "ORD-9920", items: "Mustard Oil", price: 320, distance: "0.8km", status: "Ready", farm: "City Edge Cluster" },
];

export default function DeliveryDashboard() {
  const { lang } = useSettings();
  const { user } = useUser();
  const [activeOrders, setActiveOrders] = useState(MOCK_ORDERS);

  const t = {
    title: lang === 'en' ? "Rider Dashboard" : "राइडर डैशबोर्ड",
    subtitle: lang === 'en' ? "Nearby delivery tasks within 15km." : "15 किमी के भीतर पास के वितरण कार्य।",
    earnings: lang === 'en' ? "Today's Earnings" : "आज की कमाई",
    deliveries: lang === 'en' ? "Deliveries Done" : "डिलीवरी पूरी हुई",
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-5xl">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
              <Bike size={14} />
              Partner Active
            </div>
            <h1 className="text-4xl md:text-6xl font-display">{t.title}</h1>
            <p className="text-xl text-foreground/60">{t.subtitle}</p>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="rounded-3xl p-8 bg-krishi-black text-white border-none shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><IndianRupee size={80} /></div>
            <p className="text-krishi-gold text-[10px] font-bold uppercase tracking-widest mb-4">{t.earnings}</p>
            <h2 className="text-5xl font-display">₹1,240</h2>
          </Card>
          <Card className="rounded-3xl p-8 bg-card border-border shadow-sm">
            <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-4">{t.deliveries}</p>
            <h2 className="text-5xl font-display text-foreground">12</h2>
          </Card>
          <Card className="rounded-3xl p-8 bg-card border-border shadow-sm">
             <p className="text-foreground/40 text-[10px] font-bold uppercase tracking-widest mb-4">Rating</p>
             <h2 className="text-5xl font-display text-krishi-gold">4.9</h2>
          </Card>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-headline font-bold">Available Orders</h3>
          <div className="grid gap-4">
            {activeOrders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.01 }}
                className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex gap-6 items-center">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                    <Navigation size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-lg">{order.items}</span>
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">
                        {order.distance} Away
                      </Badge>
                    </div>
                    <p className="text-xs text-foreground/40 font-medium flex items-center gap-1">
                      <MapPin size={12} /> {order.farm}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-bold">₹{order.price}</p>
                    <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">Payout</p>
                  </div>
                  <Button className="rounded-full px-6 bg-primary text-white font-bold">
                    Accept Task
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
