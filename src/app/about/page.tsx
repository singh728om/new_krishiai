"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { Sprout, Target, Users, Heart } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "About KrishiAI" : "कृषि एआई के बारे में",
    tagline: lang === 'en' ? "Pioneering the next generation of smart farming for Bharat." : "भारत के लिए स्मार्ट खेती की अगली पीढ़ी का नेतृत्व करना।",
    mission: lang === 'en' ? "Our Mission" : "हमारा मिशन",
    missionText: lang === 'en' ? "To empower 100 million farmers with artificial intelligence, increasing their yield and income while restoring soil health across the subcontinent." : "आर्टिफिशियल इंटेलिजेंस के साथ 100 मिलियन किसानों को सशक्त बनाना, उनकी उपज और आय में वृद्धि करना और पूरे उपमहाद्वीप में मिट्टी के स्वास्थ्य को बहाल करना।",
    vision: lang === 'en' ? "Our Vision" : "हमारा विजन",
    visionText: lang === 'en' ? "A future where every farm is digitally connected, sustainable, and profitable, ensuring global food security starting from Bharat's heartland." : "एक ऐसा भविष्य जहां हर खेत डिजिटल रूप से जुड़ा, टिकाऊ और लाभदायक हो, जो भारत के हृदय स्थल से शुरू होकर वैश्विक खाद्य सुरक्षा सुनिश्चित करे।",
  };

  const values = [
    { icon: Sprout, labelEn: "Sustainability", labelHi: "स्थिरता", descEn: "Regenerating soil health for future generations.", descHi: "भावी पीढ़ियों के लिए मिट्टी के स्वास्थ्य को पुनर्जीवित करना।" },
    { icon: Target, labelEn: "Precision", labelHi: "सटीकता", descEn: "Clinical-grade data for every acre.", descHi: "हर एकड़ के लिए नैदानिक-ग्रेड डेटा।" },
    { icon: Users, labelEn: "Community", labelHi: "समुदाय", descEn: "Building strong networks of informed farmers.", descHi: "सूचित किसानों के मजबूत नेटवर्क का निर्माण।" },
    { icon: Heart, labelEn: "Bharat First", labelHi: "भारत प्रथम", descEn: "Solutions tailored for the Indian landscape.", descHi: "भारतीय परिदृश्य के लिए तैयार समाधान।" },
  ];

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-display text-foreground">{t.title}</h1>
            <p className="text-xl md:text-2xl text-primary font-headline font-bold italic">{t.tagline}</p>
          </motion.div>

          <div className="relative h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image 
              src="https://picsum.photos/seed/agri-about/1200/600" 
              alt="Farmers in field" 
              fill 
              className="object-cover"
              data-ai-hint="indian farmers field"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-16 text-left py-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Target className="text-primary" /> {t.mission}
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed font-body">
                {t.missionText}
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
                <Sprout className="text-primary" /> {t.vision}
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed font-body">
                {t.visionText}
              </p>
            </div>
          </div>
        </div>

        <div className="py-24">
          <h2 className="text-center text-4xl font-display mb-16">{lang === 'en' ? "Our Core Values" : "हमारे मुख्य मूल्य"}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-card rounded-3xl border border-border text-center space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto">
                  <v.icon size={24} />
                </div>
                <h3 className="font-headline font-bold text-lg">{lang === 'en' ? v.labelEn : v.labelHi}</h3>
                <p className="text-sm text-foreground/60 font-body">{lang === 'en' ? v.descEn : v.descHi}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
