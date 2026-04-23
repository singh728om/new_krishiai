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
      <g className="fill-krishi-soil">
        <motion.path 
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          d="M850,70 h15 v8 h-15 Z M862,70 v-5 h3 v5 Z" 
        />
      </g>
      <motion.g
        initial={{ x: -100 }}
        animate={{ x: 1300 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <rect x="0" y="80" width="20" height="12" rx="2" className="fill-krishi-amber" />
        <rect x="12" y="70" width="10" height="10" rx="1" className="fill-krishi-soil" />
        <circle cx="4" cy="92" r="4" className="fill-black" />
        <circle cx="16" cy="92" r="4" className="fill-black" />
      </motion.g>
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
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative p-1 rounded-[3rem] bg-gradient-to-br from-primary/40 to-transparent"
    >
      <div className="bg-[#0A0F08] rounded-[2.8rem] p-8 border border-white/5 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-krishi-gold/80" />
            <div className="w-2 h-2 rounded-full bg-primary/80" />
          </div>
          <div className="flex items-center gap-2">
             <Signal size={12} className="text-primary animate-pulse" />
             <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Pulse Intelligence</span>
          </div>
        </div>

        {/* Pulse Network Visual */}
        <div className="relative flex-1 bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden mb-6">
          
          {/* Radiating Pulse Waves */}
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
              className="absolute w-[200px] h-[200px] border border-primary/30 rounded-full"
            />
          ))}

          {/* Central Hub */}
          <div className="relative z-30">
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-primary/20 p-4 rounded-full border border-primary/50 shadow-[0_0_30px_rgba(76,175,80,0.3)] backdrop-blur-md"
            >
              <Sprout size={32} className="text-primary" />
            </motion.div>
            {/* Core Pulse */}
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary/40 rounded-full -z-10"
            />
          </div>

          {/* Network Nodes with Individual Pulse Feedback */}
          {/* IoT Nodes */}
          <div className="absolute top-[20%] left-[25%] text-primary/80 group">
             <motion.div whileHover={{ scale: 1.2 }}>
                <Cpu size={18} />
             </motion.div>
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.8, 0.2] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="absolute -inset-2 bg-primary/10 rounded-full -z-10 blur-sm"
             />
          </div>

          <div className="absolute bottom-[30%] left-[15%] text-primary/60">
             <Cpu size={14} />
          </div>

          {/* Seller / Farmer */}
          <div className="absolute top-[40%] right-[15%] text-krishi-gold">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
               <Store size={22} />
            </motion.div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-krishi-gold/20 blur-sm rounded-full" />
          </div>

          {/* Rider */}
          <motion.div
            animate={{ 
              x: [-10, 20, -10],
              y: [-15, 10, -15]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[30%] text-blue-400"
          >
            <Bike size={20} />
            <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full -z-10" />
          </motion.div>

          {/* Buyer */}
          <div className="absolute bottom-[20%] right-[25%] text-white/70">
            <ShoppingBag size={20} />
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(76,175,80,1)]"
            />
          </div>

          {/* Connection Lines (Static logic, animated dash) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
             <motion.path 
               d="M 150 150 L 100 80" 
               stroke="currentColor" 
               className="text-primary"
               strokeWidth="1"
               fill="none"
               strokeDasharray="4 4"
               animate={{ strokeDashoffset: -20 }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
             />
             <motion.path 
               d="M 150 150 L 250 160" 
               stroke="currentColor" 
               className="text-krishi-gold"
               strokeWidth="1"
               fill="none"
               strokeDasharray="4 4"
               animate={{ strokeDashoffset: -20 }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             />
             <motion.path 
               d="M 150 150 L 220 250" 
               stroke="currentColor" 
               className="text-white"
               strokeWidth="1"
               fill="none"
               strokeDasharray="4 4"
               animate={{ strokeDashoffset: -20 }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
          </svg>
        </div>

        {/* Network Logistics Feed */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
           <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Navigation size={10} className="text-krishi-gold" />
                <span className="text-[9px] font-bold text-krishi-gold uppercase tracking-widest">Network Stream</span>
              </div>
              <span className="text-[8px] text-white/20 uppercase font-bold">Signal Strength: Optimal</span>
           </div>
           <div className="space-y-2">
              {logs.map((log, i) => (
                <motion.div 
                  key={log + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1 - (i * 0.3), x: 0 }}
                  className="flex items-center justify-between text-[11px] font-medium font-code"
                >
                   <span className="text-white/60">_ {log}</span>
                   <span className="text-[8px] text-white/20">{new Date().toLocaleTimeString()}</span>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Diagnostic Footer */}
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Security_Protocol_V2</span>
          </div>
          <div className="text-[9px] text-white/20 font-bold font-code">
             Encryption: SHA-256
          </div>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute -inset-10 bg-primary/5 blur-[100px] -z-10 rounded-full" />
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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 grain bg-background">
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

          <h1 className="text-5xl md:text-7xl font-display font-medium leading-[1.15] text-foreground max-w-2xl">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg md:text-xl text-foreground/70 max-w-xl font-body leading-relaxed"
          >
            {content.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-16 text-lg font-bold group w-full sm:w-auto shadow-xl shadow-primary/20">
                {content.ctaPrimary}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/lease-registration">
              <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/5 rounded-full px-10 h-16 text-lg font-bold w-full sm:w-auto">
                {content.ctaSecondary}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap gap-8 pt-8"
          >
            <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary">
              <Sprout size={18} className="animate-bounce" /> {content.stat1}
            </div>
            <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary">
              <CloudRain size={18} /> {content.stat2}
            </div>
            <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-primary">
              <Wind size={18} /> {content.stat3}
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 hidden lg:block">
          <PlatformPulseNetwork />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
