
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
  Activity,
  Droplets,
  Database,
  Smartphone
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "Why KrishiAI?" : "KrishiAI क्यों?",
    subtitle: lang === 'en' ? "Empowering the Heart of Bharat" : "भारत के हृदय को सशक्त बनाना",
    tagline: lang === 'en' ? "We don't just build tools; we build clinical-grade digital lifelines for 100 million farmers." : "हम सिर्फ उपकरण नहीं बनाते; हम 100 मिलियन किसानों के लिए नैदानिक-ग्रेड डिजिटल लाइफलाइन बनाते हैं।",
    problemTitle: lang === 'en' ? "The Invisible Challenge" : "अदृश्य चुनौती",
    problemText: lang === 'en' ? "India loses over $30B annually to undiagnosed crop diseases and deteriorating soil health. Traditional methods are too slow for modern threats." : "भारत सालाना 30 बिलियन डॉलर से अधिक का नुकसान फसल रोगों और मिट्टी के खराब स्वास्थ्य के कारण उठाता है।",
    solutionTitle: lang === 'en' ? "The Intelligence Network" : "इंटेलिजेंस नेटवर्क",
    solutionText: lang === 'en' ? "We bridge the gap with an end-to-end ecosystem that Senses, Diagnoses, and Delivers. From IoT sensors in the soil to AI diagnostics in the palm of your hand." : "हम एक ऐसे इकोसिस्टम के साथ इस अंतर को पाटते हैं जो महसूस करता है, निदान करता है और वितरित करता है।",
    whyTitle: lang === 'en' ? "The Purpose" : "उद्देश्य",
    whyText: lang === 'en' ? "To restore the fundamental health of our soil while ensuring every farmer is digitally connected, sustainable, and profitable." : "हमारी मिट्टी के मौलिक स्वास्थ्य को बहाल करना और यह सुनिश्चित करना कि हर किसान डिजिटल रूप से जुड़ा हो।",
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

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent">
           <motion.div 
             animate={{ left: ["0%", "100%"] }}
             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 w-20 h-px bg-primary shadow-[0_0_15px_rgba(76,175,80,1)]"
           />
        </div>
      </section>

      {/* Storytelling Content */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* WHAT: The Problem (Soil Criticality Scanner) */}
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
              
              <div className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-2xl border border-border space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-foreground/40">Soil Degredation Level</span>
                    <Badge variant="destructive" className="text-[10px] font-bold">CRITICAL</Badge>
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

                <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase text-blue-500/60">Water Table Depletion</span>
                    <span className="text-xs font-code text-blue-500">-14.2m Avg.</span>
                  </div>
                  <div className="w-full h-2 bg-blue-500/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "65%" }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="h-full bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="relative aspect-square rounded-[3rem] bg-krishi-black overflow-hidden shadow-2xl border border-white/5">
               {/* Technical Scanner Background */}
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
               
               <div className="absolute inset-0 p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Spectral_Analysis_Live</p>
                        <p className="text-2xl font-display text-white italic">UP-Varanasi-C9</p>
                     </div>
                     <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/40 text-red-500">
                        <Activity size={20} className="animate-pulse" />
                     </div>
                  </div>

                  <div className="relative flex-1 flex items-center justify-center">
                     {/* Concentric Signal Rings */}
                     {[1, 2, 3].map((i) => (
                       <motion.div 
                         key={i}
                         animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                         transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
                         className="absolute w-40 h-40 border border-red-500/20 rounded-full"
                       />
                     ))}
                     
                     <div className="relative z-10 text-center space-y-4">
                        <div className="w-24 h-24 rounded-full border-4 border-red-500/40 flex items-center justify-center bg-red-500/10">
                           <Droplets size={40} className="text-red-500" />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-white/40 uppercase">Moisture Level</p>
                           <p className="text-4xl font-display text-red-500">12.4%</p>
                        </div>
                     </div>

                     {/* Scanning Line */}
                     <motion.div 
                        animate={{ top: ["0%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                     />
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 font-code">
                     <div>
                        <p className="text-[8px] text-white/30">NITROGEN</p>
                        <p className="text-xs text-white">LOW</p>
                     </div>
                     <div>
                        <p className="text-[8px] text-white/30">PH_LEVEL</p>
                        <p className="text-xs text-red-500">8.2_ACID</p>
                     </div>
                     <div>
                        <p className="text-[8px] text-white/30">CARBON</p>
                        <p className="text-xs text-white">0.42%</p>
                     </div>
                  </div>
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

          {/* WHY: The Impact (Hindi Mobile Card Simulation) */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
               {/* Simulated Mobile Card in Hindi */}
               <motion.div
                 initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                 whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                 viewport={{ once: true }}
                 className="w-full max-w-[340px] bg-krishi-cream rounded-[3rem] border-8 border-krishi-black shadow-2xl overflow-hidden relative"
               >
                  <div className="h-4 bg-krishi-black w-1/3 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-20" />
                  
                  <div className="p-6 pt-10 space-y-6 flex flex-col min-h-[500px]">
                     <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                           <Smartphone size={16} className="text-primary" />
                           <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Krishi_Live_Report</span>
                        </div>
                        <Badge className="bg-krishi-lime text-white text-[10px]">सक्रिय</Badge>
                     </div>

                     <div className="space-y-1">
                        <h4 className="text-2xl font-display italic text-foreground">मिट्टी स्वास्थ्य रिपोर्ट</h4>
                        <p className="text-[10px] text-foreground/40 font-code">प्लॉट आईडी: #UP-2024-VAR-09</p>
                     </div>

                     <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-white rounded-2xl border border-border shadow-sm">
                              <p className="text-[9px] font-bold text-foreground/40 uppercase mb-2">नमी (Moisture)</p>
                              <p className="text-2xl font-display text-primary">32%</p>
                           </div>
                           <div className="p-4 bg-white rounded-2xl border border-border shadow-sm">
                              <p className="text-[9px] font-bold text-foreground/40 uppercase mb-2">तैयारी</p>
                              <p className="text-sm font-bold text-krishi-gold">बुवाई के लिए</p>
                           </div>
                        </div>

                        <div className="space-y-4 p-5 bg-krishi-black rounded-[2rem] text-white">
                           <div className="flex items-center gap-3">
                              <Sprout size={18} className="text-krishi-gold" />
                              <span className="text-xs font-bold">नाइट्रोजन (N-P-K) स्तर</span>
                           </div>
                           <div className="space-y-3">
                              {[
                                { l: "नाइट्रोजन", v: 30, c: "bg-red-500", st: "कम" },
                                { l: "फास्फोरस", v: 75, c: "bg-krishi-lime", st: "पर्याप्त" },
                                { l: "पोटेशियम", v: 60, c: "bg-krishi-gold", st: "मध्यम" }
                              ].map((item, i) => (
                                <div key={i} className="space-y-1">
                                   <div className="flex justify-between text-[8px] font-bold uppercase opacity-60">
                                      <span>{item.l}</span>
                                      <span>{item.st}</span>
                                   </div>
                                   <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.v}%` }}
                                        className={`h-full ${item.c}`}
                                      />
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="p-5 bg-primary/10 rounded-2xl border border-primary/20 space-y-2">
                           <div className="flex items-center gap-2 text-primary">
                              <Zap size={14} />
                              <span className="text-[10px] font-bold uppercase">एआई सलाह (Advisory)</span>
                           </div>
                           <p className="text-sm text-foreground/80 font-medium italic">
                             "यूरिया का छिड़काव करें और सिंचाई के लिए 48 घंटे प्रतीक्षा करें।"
                           </p>
                        </div>
                     </div>

                     <Button className="w-full rounded-full bg-primary text-white font-bold h-12">
                        पूरी रिपोर्ट देखें
                     </Button>
                  </div>
               </motion.div>
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
                {[
                   { label: lang === 'en' ? "Farmers Served" : "किसान जुड़े", val: "10,000+" },
                   { label: lang === 'en' ? "Yield Increase" : "पैदावार वृद्धि", val: "40%" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-3xl font-display text-primary">{stat.val}</p>
                    <p className="text-[10px] font-headline font-bold uppercase tracking-[0.2em] text-foreground/40">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-krishi-gold/5 rounded-2xl border border-krishi-gold/10 flex items-start gap-4">
                 <Database size={24} className="text-krishi-gold shrink-0 mt-1" />
                 <div>
                    <h4 className="text-sm font-bold text-krishi-gold uppercase mb-1">Clinical-Grade Data</h4>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                       Every data point is verified by regional labs, ensuring that the digital advisory sent to the farmer's phone is 100% accurate.
                    </p>
                 </div>
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
