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
  ShieldCheck
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

const PlatformRadarMap = () => {
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
             <Radio size={12} className="text-primary animate-pulse" />
             <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Network Intelligence</span>
          </div>
        </div>

        {/* Radar Map Visual */}
        <div className="relative flex-1 bg-white/[0.02] rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden mb-6">
          {/* Radar Circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] border border-white/5 rounded-full" />
            <div className="w-[200px] h-[200px] border border-white/5 rounded-full" />
            <div className="w-[100px] h-[100px] border border-white/10 rounded-full" />
            
            {/* Axis Lines */}
            <div className="absolute h-full w-px bg-white/5" />
            <div className="absolute w-full h-px bg-white/5" />
          </div>

          {/* Sweep Animation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute w-[300px] h-[300px] rounded-full border-t-2 border-primary/40 z-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent to-primary/20" />
          </motion.div>

          {/* Network Entities */}
          {/* IoT Sensors (Green Pulsing) */}
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-[20%] left-[30%] text-primary"
          >
            <Cpu size={16} />
            <div className="absolute -inset-2 bg-primary/20 blur-md rounded-full -z-10" />
          </motion.div>
          
          <motion.div 
            animate={{ opacity: [0.3, 1, 0.3] }} 
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-[25%] left-[20%] text-primary"
          >
            <Cpu size={14} />
          </motion.div>

          {/* Sellers / Farms (Gold) */}
          <div className="absolute top-[45%] right-[25%] text-krishi-gold">
            <Store size={20} />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-2 border border-krishi-gold/30 rounded-lg -z-10" 
            />
          </div>

          {/* Buyers (White) */}
          <div className="absolute bottom-[15%] right-[35%] text-white/80">
            <ShoppingBag size={18} />
          </div>

          {/* Riders (Moving Blue) */}
          <motion.div
            animate={{ 
              x: [-20, 40, -20],
              y: [-10, 20, -10]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-[10%] right-[10%] text-blue-400"
          >
            <Bike size={20} />
            <div className="absolute -inset-2 bg-blue-500/10 blur-xl rounded-full -z-10" />
          </motion.div>

          <motion.div
            animate={{ 
              x: [30, -50, 30],
              y: [20, -10, 20]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[40%] left-[15%] text-blue-400/60"
          >
            <Bike size={16} />
          </motion.div>

          {/* Central Hub */}
          <div className="z-20 bg-[#0A0F08] p-3 rounded-full border border-primary/30 shadow-[0_0_20px_rgba(76,175,80,0.2)]">
            <Sprout size={24} className="text-primary" />
          </div>
        </div>

        {/* Network Logistics Feed */}
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
           <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Navigation size={10} className="text-krishi-gold" />
                <span className="text-[9px] font-bold text-krishi-gold uppercase tracking-widest">Network Stream</span>
              </div>
              <span className="text-[8px] text-white/20 uppercase font-bold">15km Hyper-local Active</span>
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
            <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Trust_Verified</span>
          </div>
          <div className="text-[9px] text-white/20 font-bold font-code">
             Coords: 25.31° N, 82.97° E
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
          <PlatformRadarMap />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
