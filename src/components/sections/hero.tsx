"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CloudRain, Sprout, Wind, Cloud, Radio, Activity, Navigation, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useSettings } from "@/context/settings-context";
import Link from "next/link";

const AgricultureScene = () => (
  <div className="absolute bottom-0 left-0 w-full h-48 opacity-15 pointer-events-none overflow-hidden z-0">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-primary">
      {/* Rolling Hills */}
      <path d="M0,120 L1200,120 L1200,80 C1100,60 1000,100 900,80 C800,60 700,90 600,70 C500,50 400,100 300,80 C200,60 100,90 0,70 Z" />
      
      {/* Farm House */}
      <rect x="50" y="40" width="30" height="30" className="fill-krishi-soil" />
      <path d="M45,40 L65,15 L85,40 Z" className="fill-krishi-amber" />
      
      {/* Crops Rows */}
      <g className="fill-krishi-lime">
        {Array.from({ length: 15 }).map((_, i) => (
          <circle key={i} cx={200 + i * 20} cy={95} r="3" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={210 + i * 20} cy={105} r="3" />
        ))}
      </g>

      {/* Cows */}
      <g className="fill-krishi-soil">
        <motion.path 
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          d="M850,70 h15 v8 h-15 Z M862,70 v-5 h3 v5 Z" 
        />
        <motion.path 
          animate={{ x: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          d="M920,75 h15 v8 h-15 Z M932,75 v-5 h3 v5 Z" 
        />
      </g>

      {/* Farmer */}
      <circle cx="450" cy="65" r="4" className="fill-krishi-soil" />
      <rect x="448" y="69" width="4" height="8" className="fill-krishi-soil" />

      {/* Tractor - Moving Animation */}
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
    <motion.div
      animate={{ opacity: [0, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute top-32 right-12 text-primary/20"
    >
      <CloudRain size={40} />
    </motion.div>
  </div>
);

const DataTerminal = () => {
  const [data, setData] = useState({
    pH: 6.8,
    health: 94,
    risk: "LOW",
    moisture: 42,
  });

  const [logs, setLogs] = useState<string[]>([
    "SAT_LINK: ACTIVE",
    "CLUSTER_09: OPTIMAL",
    "RIDER_42: ON_TASK",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        pH: +(prev.pH + (Math.random() - 0.5) * 0.1).toFixed(1),
        health: Math.min(100, Math.max(80, prev.health + (Math.random() > 0.5 ? 1 : -1))),
        risk: prev.health > 90 ? "LOW" : "MODERATE",
        moisture: Math.min(60, Math.max(30, prev.moisture + Math.floor((Math.random() - 0.5) * 4))),
      }));

      const newEvents = [
        "BASMATI_ORD: RECEIVED",
        "RIDER_SYNC: OK",
        "SPECTRAL_SCAN: COMPLETE",
        "PADDY_FIELD_04: IRRIGATE",
        "MARKET_PEAK: +12%",
      ];
      setLogs(prev => [newEvents[Math.floor(Math.random() * newEvents.length)], prev[0], prev[1]]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-primary/40 to-transparent"
    >
      <div className="bg-[#0A0F08] rounded-[2.4rem] p-8 border border-white/5 shadow-2xl font-code text-sm text-white/90 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/80 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-krishi-gold/80" />
            <div className="w-2 h-2 rounded-full bg-primary/80" />
          </div>
          <div className="flex items-center gap-2">
             <Radio size={12} className="text-primary animate-pulse" />
             <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Live Intelligence</span>
          </div>
        </div>

        {/* Diagnostic Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="space-y-1">
             <p className="text-[9px] text-white/30 uppercase font-bold">Soil Status</p>
             <div className="flex items-end justify-between border-b border-white/10 pb-1">
                <span className="text-primary font-bold">pH {data.pH}</span>
                <Activity size={12} className="text-white/20" />
             </div>
             <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1">
                <motion.div 
                  animate={{ width: `${(data.pH / 14) * 100}%` }}
                  className="bg-primary h-full" 
                />
             </div>
          </div>
          <div className="space-y-1">
             <p className="text-[9px] text-white/30 uppercase font-bold">Crop Health</p>
             <div className="flex items-end justify-between border-b border-white/10 pb-1">
                <span className="text-krishi-lime font-bold">{data.health}%</span>
                <Sprout size={12} className="text-white/20" />
             </div>
             <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1">
                <motion.div 
                  animate={{ width: `${data.health}%` }}
                  className="bg-krishi-lime h-full" 
                />
             </div>
          </div>
        </div>

        {/* Network Logistics Feed */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 mb-8">
           <div className="flex items-center gap-2 mb-3">
              <Navigation size={10} className="text-krishi-gold" />
              <span className="text-[9px] font-bold text-krishi-gold uppercase tracking-widest">Network Stream</span>
           </div>
           <div className="space-y-2">
              {logs.map((log, i) => (
                <motion.div 
                  key={log + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1 - (i * 0.3), x: 0 }}
                  className="flex items-center justify-between text-[11px] font-medium"
                >
                   <span className="text-white/60">_ {log}</span>
                   <span className="text-[8px] text-white/20">{new Date().toLocaleTimeString()}</span>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Action & Footer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-primary/10 rounded-xl border border-primary/20">
             <div className="flex items-center gap-3">
                <ShoppingBag size={14} className="text-primary" />
                <span className="text-xs font-bold">Harit Market Active</span>
             </div>
             <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">UP_EAST</span>
          </div>

          <div className="pt-4 border-t border-white/10 text-[9px] text-white/20 font-bold uppercase tracking-widest">
            <p className="animate-pulse">Analyzing spectral imagery: Sector_09</p>
            <div className="flex justify-between mt-1">
               <span>Coords: 25.3176° N, 82.9739° E</span>
               <span className="text-primary">Latency: 14ms</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Background Effects */}
      <div className="absolute -inset-10 bg-primary/10 blur-[80px] -z-10 rounded-full animate-pulse-slow" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-krishi-gold/10 blur-[60px] -z-10 rounded-full" />
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
          <DataTerminal />
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
