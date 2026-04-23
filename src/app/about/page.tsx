"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { Sprout, Target, Users, Heart, ShieldCheck, Zap, Globe, Microscope } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "Decoding Agriculture." : "कृषि को डिकोड करना।",
    subtitle: lang === 'en' ? "About KrishiAI" : "कृषि एआई के बारे में",
    tagline: lang === 'en' ? "Pioneering the next generation of smart farming for Bharat." : "भारत के लिए स्मार्ट खेती की अगली पीढ़ी का नेतृत्व करना।",
    mission: lang === 'en' ? "Our Mission" : "हमारा मिशन",
    missionText: lang === 'en' ? "To empower 100 million farmers with clinical-grade artificial intelligence, increasing their yield while restoring the fundamental health of Bharat's soil." : "100 मिलियन किसानों को क्लिनिकल-ग्रेड आर्टिफिशियल इंटेलिजेंस के साथ सशक्त बनाना, उनकी पैदावार में वृद्धि करना और भारत की मिट्टी के मौलिक स्वास्थ्य को बहाल करना।",
    vision: lang === 'en' ? "Our Vision" : "हमारा विजन",
    visionText: lang === 'en' ? "A future where every farm is digitally connected, sustainable, and profitable, ensuring global food security starting from our local clusters." : "एक ऐसा भविष्य जहां हर खेत डिजिटल रूप से जुड़ा, टिकाऊ और लाभदायक हो, जो हमारे स्थानीय क्लस्टरों से शुरू होकर वैश्विक खाद्य सुरक्षा सुनिश्चित करे।",
  };

  const values = [
    { icon: Sprout, labelEn: "Sustainability", labelHi: "स्थिरता", descEn: "Regenerating soil health for the next seven generations.", descHi: "अगली सात पीढ़ियों के लिए मिट्टी के स्वास्थ्य को पुनर्जीवित करना।" },
    { icon: Microscope, labelEn: "Precision", labelHi: "सटीकता", descEn: "Clinical-grade data for every single acre of land.", descHi: "हर एक एकड़ जमीन के लिए क्लिनिकल-ग्रेड डेटा।" },
    { icon: Users, labelEn: "Community", labelHi: "समुदाय", descEn: "Building strong, informed networks of merchant farmers.", descHi: "सूचित व्यापारी किसानों के मजबूत नेटवर्क का निर्माण।" },
    { icon: Heart, labelEn: "Bharat First", labelHi: "भारत प्रथम", descEn: "Solutions tailored for the unique Indian landscape.", descHi: "भारतीय परिदृश्य के लिए विशेष रूप से तैयार समाधान।" },
  ];

  const stats = [
    { label: lang === 'en' ? "Farmers Served" : "किसान जुड़े", val: "10,000+" },
    { label: lang === 'en' ? "States Active" : "सक्रिय राज्य", val: "4" },
    { label: lang === 'en' ? "AI Accuracy" : "एआई सटीकता", val: "98.2%" },
    { label: lang === 'en' ? "Yield Increase" : "पैदावार वृद्धि", val: "40%" },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-krishi-black text-white">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-headline font-bold uppercase tracking-widest">
              <Globe size={14} />
              {t.subtitle}
            </div>
            <h1 className="text-5xl md:text-8xl font-display leading-tight">{t.title}</h1>
            <p className="text-xl md:text-2xl text-white/60 font-body max-w-2xl mx-auto leading-relaxed">
              {t.tagline}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-y border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <p className="text-3xl md:text-5xl font-display text-primary">{stat.val}</p>
                <p className="text-xs font-headline font-bold uppercase tracking-widest text-foreground/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-32">
          
          {/* Mission/Vision */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-card rounded-[3rem] border border-border space-y-6 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Target size={24} />
              </div>
              <h2 className="text-3xl font-headline font-bold">{t.mission}</h2>
              <p className="text-lg text-foreground/60 leading-relaxed font-body">
                {t.missionText}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 bg-krishi-black text-white rounded-[3rem] border border-white/5 space-y-6 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Zap size={120} />
              </div>
              <div className="w-12 h-12 bg-krishi-gold/20 rounded-2xl flex items-center justify-center text-krishi-gold">
                <Sprout size={24} />
              </div>
              <h2 className="text-3xl font-headline font-bold">{t.vision}</h2>
              <p className="text-lg text-white/60 leading-relaxed font-body">
                {t.visionText}
              </p>
            </motion.div>
          </div>

          {/* Feature Image */}
          <div className="relative h-[500px] rounded-[4rem] overflow-hidden shadow-2xl group">
            <Image 
              src="https://picsum.photos/seed/agri-about-hero/1200/800" 
              alt="Indian farmers field" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              data-ai-hint="indian farmers wheat field"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-12">
               <div className="max-w-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="text-krishi-lime" />
                    <span className="text-white font-headline font-bold uppercase tracking-widest text-xs">Trust Verified Network</span>
                  </div>
                  <h3 className="text-3xl font-display text-white italic">"We are not just a platform; we are a digital lifeline for the heart of Bharat."</h3>
               </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-display text-foreground">{lang === 'en' ? "Our Core Values" : "हमारे मुख्य मूल्य"}</h2>
              <p className="text-foreground/40 max-w-xl mx-auto font-body">Building the future of agriculture on four unshakeable pillars.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-card rounded-3xl border border-border text-center space-y-4 hover:border-primary/40 transition-all hover:shadow-lg group"
                >
                  <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-white transition-colors">
                    <v.icon size={28} />
                  </div>
                  <h3 className="font-headline font-bold text-lg">{lang === 'en' ? v.labelEn : v.labelHi}</h3>
                  <p className="text-sm text-foreground/50 font-body leading-relaxed">{lang === 'en' ? v.descEn : v.descHi}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-primary/5 rounded-[3rem] p-12 md:p-24 text-center border border-primary/10 space-y-8">
             <h2 className="text-4xl md:text-6xl font-display max-w-2xl mx-auto leading-tight">Ready to join the <span className="text-primary italic">revolution?</span></h2>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg" className="rounded-full px-12 h-16 bg-primary text-white font-bold text-lg shadow-xl shadow-primary/20">
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-12 h-16 font-bold text-lg">
                    Contact Us
                  </Button>
                </Link>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
