
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CloudSun, Sprout, Wind } from "lucide-react";
import { useEffect, useState } from "react";
import { useSettings } from "@/context/settings-context";
import Link from "next/link";

const VillageHorizon = () => (
  <div className="absolute bottom-0 left-0 w-full h-32 opacity-10 pointer-events-none overflow-hidden">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-primary">
      <path d="M0,120 L1200,120 L1200,80 C1100,60 1000,100 900,80 C800,60 700,90 600,70 C500,50 400,100 300,80 C200,60 100,90 0,70 Z" />
      <rect x="50" y="40" width="20" height="30" />
      <rect x="80" y="50" width="15" height="20" />
      <circle cx="150" cy="30" r="10" />
      <path d="M400,20 L420,60 L380,60 Z" />
      <path d="M450,30 L470,70 L430,70 Z" />
      <rect x="800" y="40" width="25" height="40" />
      <circle cx="950" cy="20" r="15" />
    </svg>
  </div>
);

const DataTerminal = () => {
  const [data, setData] = useState({
    pH: 6.8,
    health: 94,
    risk: "LOW",
    moisture: 42,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        pH: +(prev.pH + (Math.random() - 0.5) * 0.1).toFixed(1),
        health: Math.min(100, Math.max(80, prev.health + (Math.random() > 0.5 ? 1 : -1))),
        risk: prev.health > 90 ? "LOW" : "MODERATE",
        moisture: Math.min(60, Math.max(30, prev.moisture + Math.floor((Math.random() - 0.5) * 4))),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative p-1 rounded-2xl bg-gradient-to-br from-primary/30 to-transparent"
    >
      <div className="bg-card rounded-2xl p-6 border border-border shadow-2xl font-code text-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
          </div>
          <span className="text-[10px] text-foreground/40 uppercase tracking-widest">Krishi Core AI v2.4</span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center group">
            <span className="text-foreground/60">SOIL_PH</span>
            <span className="text-primary font-bold">{data.pH}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/60">CROP_HEALTH</span>
            <span className="text-primary">{data.health}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/60">MOISTURE</span>
            <span className="text-foreground">{data.moisture}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-foreground/60">PATH_RISK</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${data.risk === 'LOW' ? 'bg-primary/20 text-primary' : 'bg-krishi-amber/20 text-krishi-amber'}`}>
              {data.risk}
            </span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-border text-[10px] text-foreground/30">
          <p className="animate-pulse">_ ANALYZING REAL-TIME SPECTRAL IMAGERY...</p>
          <p className="mt-1">_ COORDINATES: 21.1458° N, 79.0882° E</p>
        </div>
      </div>
      <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full" />
    </motion.div>
  );
};

export const Hero = () => {
  const { lang } = useSettings();
  
  const content = {
    badge: lang === 'en' ? 'Smart AI Agriculture for Bharat' : 'भारत के लिए स्मार्ट एआई कृषि',
    headline: lang === 'en' ? 'Farming at the speed of light.' : 'प्रकाश की गति से खेती करें।',
    subline: lang === 'en' 
      ? 'AI-powered precision for Bharat. Increase yield by 40%, diagnose diseases in seconds, and unlock carbon credit revenue.' 
      : 'भारत के लिए एआई-संचालित सटीक खेती। पैदावार में 40% की वृद्धि करें, सेकंडों में रोगों का निदान करें।',
    ctaPrimary: lang === 'en' ? 'Start Growing Free' : 'मुफ्त में शुरू करें',
    ctaSecondary: lang === 'en' ? 'Lease My Land →' : 'मेरी जमीन पट्टे पर दें →',
    stat1: lang === 'en' ? '40% yield increase' : '40% पैदावार वृद्धि',
    stat2: lang === 'en' ? '3-sec diagnosis' : '3-सेकंड निदान',
    stat3: lang === 'en' ? 'Carbon credits' : 'कार्बन क्रेडिट्स',
  };

  const headlineWords = content.headline.split(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 grain bg-background">
      <VillageHorizon />
      
      <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-headline font-bold uppercase tracking-widest"
          >
            <Sprout size={14} />
            {content.badge}
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-display font-medium leading-[1.1] text-foreground">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="inline-block mr-[0.2em]"
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
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-14 text-lg font-semibold group">
              {content.ctaPrimary}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/lease-registration">
              <Button variant="outline" size="lg" className="border-primary/40 text-primary hover:bg-primary/10 rounded-full px-8 h-14 text-lg font-semibold w-full sm:w-auto">
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
              <CloudSun size={18} /> {content.stat2}
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
