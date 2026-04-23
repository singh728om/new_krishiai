
"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { 
  Bike, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Phone, 
  MessageSquare,
  Package,
  ShieldCheck,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [riderPosition, setRiderPosition] = useState({ x: 10, y: 80 });

  const orderRef = useMemoFirebase(() => {
    if (!firestore || !orderId) return null;
    return doc(firestore, "orders", orderId as string);
  }, [firestore, orderId]);

  const { data: order, isLoading } = useDoc(orderRef);

  useEffect(() => {
    if (!isUserLoading && !user) router.push("/login");
  }, [user, isUserLoading, router]);

  // Simulate rider movement and status updates
  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      setSimulatedProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 1;
      });

      setRiderPosition(prev => ({
        x: prev.x + (90 - prev.x) * 0.01,
        y: prev.y - (prev.y - 20) * 0.01,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [order]);

  if (isLoading || isUserLoading) return <div className="min-h-screen flex items-center justify-center">Loading Tracking Data...</div>;
  if (!order) return <div className="min-h-screen flex items-center justify-center">Order not found</div>;

  const steps = [
    { label: "Order Received", status: simulatedProgress >= 0 },
    { label: "Farm Picking & QA", status: simulatedProgress >= 30 },
    { label: "Out for Delivery", status: simulatedProgress >= 60 },
    { label: "Arrived", status: simulatedProgress >= 95 },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <section className="flex-1 py-32 container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-8">
            <header className="space-y-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 uppercase tracking-widest font-code">
                ORDER_ID: {orderId?.toString().slice(-8).toUpperCase()}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-display leading-tight">Tracking your <span className="text-primary italic">Harvest</span>.</h1>
              <p className="text-xl text-foreground/60 font-body">Est. Delivery in {order.deliveryTime}</p>
            </header>

            {/* Progress Timeline */}
            <div className="space-y-6">
              <div className="relative">
                <Progress value={simulatedProgress} className="h-2 bg-muted rounded-full" />
                <div className="absolute top-0 left-0 w-full flex justify-between -translate-y-1/2 mt-1">
                   {steps.map((s, i) => (
                     <div key={i} className={`w-3 h-3 rounded-full border-2 border-background transition-colors ${s.status ? 'bg-primary' : 'bg-muted'}`} />
                   ))}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                 {steps.map((s, i) => (
                   <p key={i} className={`text-[10px] font-bold uppercase tracking-widest text-center ${s.status ? 'text-primary' : 'text-foreground/20'}`}>
                     {s.label}
                   </p>
                 ))}
              </div>
            </div>

            {/* Rider Info */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-card rounded-[2.5rem] border border-border shadow-xl space-y-6"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Bike size={32} />
                     </div>
                     <div>
                        <h4 className="font-headline font-bold text-lg">Rahul Singh</h4>
                        <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">Certified Delivery Partner</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <Button size="icon" variant="outline" className="rounded-full h-12 w-12"><Phone size={18} /></Button>
                     <Button size="icon" variant="outline" className="rounded-full h-12 w-12"><MessageSquare size={18} /></Button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-2xl border border-border">
                     <p className="text-[10px] text-foreground/40 uppercase font-bold mb-1">Items</p>
                     <p className="font-bold">{order.items.length} Organic Products</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-2xl border border-border">
                     <p className="text-[10px] text-foreground/40 uppercase font-bold mb-1">Status</p>
                     <p className="font-bold text-krishi-gold uppercase tracking-tighter text-sm">{simulatedProgress < 30 ? "Picking" : simulatedProgress < 60 ? "Quality Check" : "On the way"}</p>
                  </div>
               </div>
            </motion.div>
          </div>

          {/* Map Simulation */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square bg-muted/50 rounded-[3rem] border border-border shadow-2xl overflow-hidden relative"
            >
               {/* Animated Map Grid */}
               <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               
               {/* Grid Lines */}
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

               {/* Store Point */}
               <div className="absolute top-[80%] left-[10%] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="p-3 bg-krishi-gold rounded-full shadow-lg shadow-krishi-gold/30">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <p className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-krishi-gold bg-background/80 px-2 py-1 rounded whitespace-nowrap">KRISHI_HUB_NORTH</p>
               </div>

               {/* User Point */}
               <div className="absolute top-[20%] left-[90%] -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="p-3 bg-primary rounded-full shadow-lg shadow-primary/30 animate-pulse">
                    <Navigation size={24} className="text-white rotate-45" />
                  </div>
                  <p className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] font-bold text-primary bg-background/80 px-2 py-1 rounded whitespace-nowrap">HOME_LOCATION</p>
               </div>

               {/* Rider Animation */}
               <motion.div 
                 className="absolute z-20 pointer-events-none"
                 style={{ left: `${riderPosition.x}%`, top: `${riderPosition.y}%` }}
               >
                  <div className="relative">
                    <motion.div 
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} 
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-blue-500 rounded-full"
                    />
                    <div className="p-2 bg-blue-600 rounded-lg text-white shadow-xl">
                      <Bike size={20} />
                    </div>
                  </div>
               </motion.div>

               {/* Verified Tag */}
               <div className="absolute bottom-8 left-8 right-8 z-30">
                  <div className="bg-background/90 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                     <ShieldCheck className="text-primary" size={20} />
                     <p className="text-xs font-bold uppercase tracking-widest text-foreground/60">100% Organic & QA Verified Supply</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
