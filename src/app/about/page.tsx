
"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { 
  Sprout, 
  Target, 
  Users, 
  Heart, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Microscope, 
  AlertTriangle,
  Cpu,
  Bike,
  SearchCheck,
  TrendingUp,
  Activity
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "Why KrishiAI?" : "KrishiAI क्यों?",
    subtitle: lang === 'en' ? "Empowering the Heart of Bharat" : "भारत के हृदय को सशक्त बनाना",
    tagline: lang === 'en' ? "We don't just build tools; we build clinical-grade digital lifelines for 100 million farmers." : "हम सिर्फ उपकरण नहीं बनाते; हम 100 मिलियन किसानों के लिए नैदानिक-ग्रेड डिजिटल लाइफलाइन बनाते हैं।",
    problemTitle: lang === 'en' ? "The Invisible Challenge" : "अदृश्य चुनौती",
    problemText: lang === 'en' ? "India loses over $30B annually to undiagnosed crop diseases, fragmented market access, and deteriorating soil health. Traditional methods are too slow for modern threats." : "भारत सालाना 30 बिलियन डॉलर से अधिक का नुकसान फसल रोगों, खंडित बाजार पहुंच और मिट्टी के खराब स्वास्थ्य के कारण उठाता है।",
    solutionTitle: lang === 'en' ? "The Intelligence Network" : "इंटेलिजेंस नेटवर्क",
    solutionText: lang === 'en' ? "We bridge the gap with an end-to-end ecosystem that Senses, Diagnoses, and Delivers. From IoT sensors in the soil to AI diagnostics in the palm of your hand." : "हम एक ऐसे इकोसिस्टम के साथ इस अंतर को पाटते हैं जो महसूस करता है, निदान करता है और वितरित करता है।",
    whyTitle: lang === 'en' ? "The Purpose" : "उद्देश्य",
    whyText: lang === 'en' ? "To restore the fundamental health of our soil while ensuring every farmer is digitally connected, sustainable, and profitable." : "हमारी मिट्टी के मौलिक स्वास्थ्य को बहाल करना और यह सुनिश्चित करना कि हर किसान डिजिटल रूप से जुड़ा, टिकाऊ और लाभदायक हो।",
  };

  const pillars = [
    { 
      id: "sense",
      icon: Cpu, 
      label: lang === 'en' ? "SENSE" : "महसूस करें", 
      desc: lang === 'en' ? "Real-time IoT sensors monitor soil N-P-K and moisture every 15 minutes." : "वास्तविक समय के IoT सेंसर हर 15 मिनट में मिट्टी के N-P-K और नमी की निगरानी करते हैं।",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    { 
      id: "diagnose",
      icon: Microscope, 
      label: lang === 'en' ? "DIAGNOSE" : "निदान", 
      desc: lang === 'en' ? "Gemini Vision AI identifies 120+ diseases in under 3 seconds with 98% accuracy." : "जेमिनी विजन एआई 98% सटीकता के साथ 3 सेकंड से कम समय में 120+ रोगों की पहचान करता है।",
      color: "text-primary",
      bg: "bg-primary/10"
    },
    { 
      id: "deliver",
      icon: Bike, 
      label: lang === 'en' ? "DELIVER" : "वितरण", 
      desc: lang === 'en' ? "Hyper-local logistics fulfill nationwide organic orders directly from farming clusters." : "हाइपर-लोकल लॉजिस्टिक्स सीधे फार्मिंग क्लस्टर से राष्ट्रव्यापी जैविक ऑर्डर पूरे करते हैं।",
      color: "text-krishi-gold",
      bg: "bg-krishi-gold/10"
    }
  ];

  const stats = [
    { label: lang === 'en' ? "Farmers Served" : "किसान जुड़े", val: "10,000+" },
    { label: lang === 'en' ? "Active Clusters" : "सक्रिय क्लस्टर", val: "12" },
    { label: lang === 'en' ? "AI Accuracy" : "एआई सटीकता", val: "98.2%" },
    { label: lang === 'en' ? "Yield Increase" : "पैदावार वृद्धि", val: "40%" },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Narrative Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-krishi-black text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-headline font-bold uppercase tracking-widest"
            >
              <Zap size={14} className="animate-pulse" />
              {t.subtitle}
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-display leading-tight"
            >
              {t.title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 font-body leading-relaxed"
            >
              {t.tagline}
            </motion.p>
          </div>
        </div>

        {/* Animated Background Pulse */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent">
           <motion.div 
             animate={{ left: ["0%", "100%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 w-20 h-px bg-primary shadow-[0_0_15px_rgba(76,175,80,1)]"
           />
        </div>
      </section>

      {/* The "What / How / Why" Narrative Sections */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* WHAT: The Problem */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                <AlertTriangle size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display">{t.problemTitle}</h2>
              <p className="text-lg text-foreground/60 leading-relaxed font-body">
                {t.problemText}
              </p>
              <div className="p-6 bg-muted/30 rounded-2xl border border-border space-y-4">
                 <div className="flex justify-between items-center text-xs font-bold uppercase text-foreground/40">
                    <span>Crop Loss Index</span>
                    <span className="text-red-500">Critical</span>
                 </div>
                 <div className="w-full h-2 bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "78%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="h-full bg-red-500"
                    />
                 </div>
              </div>
            </motion.div>
            
            <div className="relative aspect-square rounded-[3rem] bg-krishi-black overflow-hidden shadow-2xl">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                     <motion.div 
                       animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                       transition={{ duration: 4, repeat: Infinity }}
                       className="w-64 h-64 border border-red-500/20 rounded-full"
                     />
                     <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-0 flex items-start justify-center"
                     >
                        <div className="w-1 h-1/2 bg-gradient-to-t from-transparent to-red-500" />
                     </motion.div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <SearchCheck size={48} className="text-red-500/40" />
                     </div>
                  </div>
               </div>
               <div className="absolute bottom-8 left-8 text-[10px] font-code text-red-500/60 uppercase tracking-widest">
                  Scanning_Regional_Threats...
               </div>
            </div>
          </div>

          {/* HOW: The Solution (Process) */}
          <div className="space-y-16">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display">{t.solutionTitle}</h2>
              <p className="text-foreground/60 font-body text-lg">{t.solutionText}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-10 bg-card rounded-[2.5rem] border border-border space-y-6 hover:border-primary/40 transition-all hover:shadow-xl group"
                >
                  <div className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <pillar.icon size={28} />
                  </div>
                  <h3 className="text-xl font-headline font-bold uppercase tracking-widest">{pillar.label}</h3>
                  <p className="text-foreground/60 font-body leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* WHY: The Purpose & Impact */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl">
               <Image 
                 src="https://picsum.photos/seed/agri-impact/1200/800" 
                 alt="Farmer in field" 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                 data-ai-hint="indian farmer field"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-12">
                  <div className="space-y-2">
                     <p className="text-primary font-headline font-bold uppercase tracking-widest text-xs">The Human Impact</p>
                     <h3 className="text-3xl font-display text-white italic">"Every acre we secure is a family's future guaranteed."</h3>
                  </div>
               </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-8"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Heart size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display">{t.whyTitle}</h2>
              <p className="text-lg text-foreground/60 leading-relaxed font-body">
                {t.whyText}
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-3xl font-display text-primary">{stat.val}</p>
                    <p className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-foreground/40">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Final Vision Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-krishi-black text-white p-12 md:p-24 rounded-[4rem] text-center border border-white/5 relative overflow-hidden shadow-2xl"
          >
             <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12">
                <Sprout size={400} />
             </div>
             
             <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-7xl font-display leading-tight italic">
                  Join the <span className="text-primary">Agriculture</span> Revolution.
                </h2>
                <p className="text-xl text-white/40 font-body">
                  We are building a future where every farm is a digital hub of prosperity. 
                  Ready to be part of the most advanced agri-network in Bharat?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/login">
                    <Button size="lg" className="rounded-full px-12 h-16 bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
                      Get Started Now
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="rounded-full px-12 h-16 font-bold text-lg border-white/20 text-white hover:bg-white/5">
                      Contact Our Experts
                    </Button>
                  </Link>
                </div>
             </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
