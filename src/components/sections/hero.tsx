"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CloudRain, 
  Sprout, 
  Wind, 
  Cloud, 
  Radio, 
  Activity, 
  Navigation, 
  ShoppingBag, 
  Cpu, 
  Store, 
  Bike,
  ShieldCheck,
  Signal
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSettings } from "@/context/settings-context";
import Link from "next/link";

const AgricultureScene = () => (
  <div className="absolute bottom-0 left-0 w-full h-48 opacity-15 pointer-events-none overflow-hidden z-0">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-primary">
      <path d="M0,120 L1200,120 L1200,80 C1100,60 1000,100 900,80 C800,60 700,90 600,70 C500,50 400,100 300,80 C200,60 100,90 0,70 Z" />
      <rect x="50" y="40" width="30" height="30" className="fill-krishi-soil" />
      <path d="M45,40 L65,15 L85,40 Z" className="fill-krishi-amber" />
      <g className="fill-krishi-lime">
        {Array.from({ length: 15 }).map((_, i) => (
          <circle key={i} cx={200 + i * 20} cy={95} r="3" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={210 + i * 20} cy={105} r="3" />
        ))}
      </g>
    </svg>
  </div>
);

const SkyElements = () => (
  <div className="absolute top-20 right-10 w-64 h-64 pointer-events-none z-0 hidden md:block">
    <motion.div
      animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute top-0 right-0 text-primary/10"
    >
      <Cloud size={80} />
    </motion.div>
    <motion.div
      animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, delay: 1 }}
      className="absolute top-10 right-20 text-primary/5"
    >
      <Cloud size={120} />
    </motion.div>
  </div>
);

const PlatformPulseNetwork = () => {
  const [logs, setLogs] = useState<string[]>([
    "SAT_LINK: ACTIVE",
    "CLUSTER_09: OPTIMAL",
    "RIDER_42: ON_TASK",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvents = [
        "BASMATI_ORD: RECEIVED",
        "RIDER_SYNC: OK",
        "SPECTRAL_SCAN: COMPLETE",
        "PADDY_FIELD_04: IRRIGATE",
        "MARKET_PEAK: +12%",
      ];
      setLogs(prev => [newEvents[Math.floor(Math.random() * newEvents.length)], prev[0], prev[1]]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative p-1 rounded-[3rem] bg-gradient-to-br from-primary/40 to-transparent w-full max-w-[500px] mx-auto"
    >
      <div className="bg-[#0A0F08] rounded-[2.8rem] p-6 md:p-8 border border-white/5 shadow-2xl overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-krishi-gold/80" />
            <div className="w-2 h-2 rounded-full bg-primary/80" />
          </div>
          <div className="flex items-center gap-2">
             <Signal size={12} className="text-primary animate-pulse" />
             <span className="text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">Pulse Intelligence</span>
          </div>
        </div>

        <div className="relative flex-1 bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden mb-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ 
                scale: [0.1, 1.5], 
                opacity: [0.5, 0] 
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 1.3,
                ease: "easeOut"
              }}
              className="absolute w-[150px] md:w-[200px] h-[150px] md:h-[200px] border border-primary/30 rounded-full"
            />
          ))}

          <div className="relative z-30">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-primary/20 p-4 rounded-full border border-primary/50 shadow-[0_0_30px_rgba(76,175,80,0.3)] backdrop-blur-md"
            >
              <Sprout size={32} className="text-primary" />
            </motion.div>
          </div>

          {/* IoT Nodes */}
          <div className="absolute top-[20%] left-[25%] text-primary/80">
             <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }}>
                <Cpu size={16} />
             </motion.div>
          </div>

          {/* Seller / Farmer */}
          <div className="absolute top-[40%] right-[15%] text-krishi-gold">
            <Store size={20} />
          </div>

          {/* Rider */}
          <motion.div
            animate={{ x: [-5, 10, -5], y: [-10, 5, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[30%] text-blue-400"
          >
            <Bike size={18} />
          </motion.div>

          {/* Buyer */}
          <div className="absolute bottom-[20%] right-[25%] text-white/70">
            <ShoppingBag size={18} />
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-3">
           <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Navigation size={10} className="text-krishi-gold" />
                <span className="text-[9px] font-bold text-krishi-gold uppercase tracking-widest">Network Stream</span>
              </div>
           </div>
           <div className="space-y-1.5">
              {logs.map((log, i) => (
                <div key={log + i} className="flex items-center justify-between text-[10px] font-medium font-code">
                   <span className="text-white/60">_ {log}</span>
                   <span className="text-[8px] text-white/20">{new Date().toLocaleTimeString()}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Hero = () => {
  const { lang } = useSettings();
  
  const content = {
    badge: lang === 'en' ? "Bharat’s Most Advanced Farm-to-Store Network." : "भारत का सबसे उन्नत फार्म-टू-स्टोर नेटवर्क।",
    headline: lang === 'en' ? 'Decoding Nature, Delivering Quality.' : 'प्रकृति को समझना, गुणवत्ता प्रदान करना।',
    subline: lang === 'en' 
      ? 'AI-powered precision for farmers and nationwide organic commerce delivered fresh from local clusters.' 
      : 'किसानों के लिए एआई-संचालित सटीकता और स्थानीय क्लस्टरों से ताज़ा वितरित राष्ट्रव्यापी जैविक वाणिज्य।',
    ctaPrimary: lang === 'en' ? 'Start Growing Free' : 'मुफ्त में शुरू करें',
    ctaSecondary: lang === 'en' ? 'Lease My Land →' : 'मेरी जमीन पट्टे पर दें →',
    stat1: lang === 'en' ? '40% yield increase' : '40% पैदावार वृद्धि',
    stat2: lang === 'en' ? '3-sec diagnosis' : '3-सेकंड निदान',
    stat3: lang === 'en' ? 'Nationwide Speed' : 'राष्ट्रव्यापी गति',
  };

  const headlineWords = content.headline.split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-32 pb-16 grain bg-background">
      <AgricultureScene />
      <SkyElements />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
        
        <div className="lg:col-span-7 space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-headline font-bold uppercase tracking-widest"
          >
            <Sprout size={14} />
            {content.badge}
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-display font-medium leading-[1.15] text-foreground max-w-2xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl text-foreground/70 max-w-xl font-body leading-relaxed"
          >
            {content.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg font-bold group w-full shadow-xl shadow-primary/20">
                {content.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/lease-registration" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-10 h-16 text-lg font-bold w-full">
                {content.ctaSecondary}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-6 pt-4"
          >
            <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary">
              <Sprout size={16} /> {content.stat1}
            </div>
            <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary">
              <CloudRain size={16} /> {content.stat2}
            </div>
            <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary">
              <Wind size={16} /> {content.stat3}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <PlatformPulseNetwork />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
