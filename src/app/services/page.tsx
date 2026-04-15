"use client";

import { motion } from "framer-motion";
import { 
  Microscope, 
  Cpu, 
  Droplets, 
  TrendingUp, 
  Leaf, 
  CloudSun,
  ShieldCheck,
  Search,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

const serviceHighlights = [
  {
    id: "disease",
    titleEn: "AI Disease Detection",
    titleHi: "एआई रोग का पता लगाना",
    descriptionEn: "Instant leaf-level pathology using Gemini Vision AI. Identifies over 120+ crop diseases with 98% accuracy in seconds.",
    descriptionHi: "जेमिनी विजन एआई का उपयोग करके त्वरित पत्ती-स्तर विकृति विज्ञान। सेकंडों में 98% सटीकता के साथ 120+ से अधिक फसल रोगों की पहचान करता है।",
    icon: Microscope,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    id: "iot",
    titleEn: "IOT Sensor Network",
    titleHi: "आईओटी सेंसर नेटवर्क",
    descriptionEn: "Deploy high-fidelity field sensors to monitor soil moisture, N-P-K levels, and micro-climate conditions in real-time.",
    descriptionHi: "वास्तविक समय में मिट्टी की नमी, एन-पी-के स्तर और सूक्ष्म जलवायु परिस्थितियों की निगरानी के लिए उच्च-सटीकता वाले फील्ड सेंसर तैनात करें।",
    icon: Cpu,
    color: "text-krishi-amber",
    bgColor: "bg-krishi-amber/10"
  },
  {
    id: "soil",
    titleEn: "Soil Testing & Analysis",
    titleHi: "मिट्टी परीक्षण और विश्लेषण",
    descriptionEn: "Comprehensive lab-grade soil health reports covering 14 essential parameters to optimize fertilizer usage and crop selection.",
    descriptionHi: "उर्वरक उपयोग और फसल चयन को अनुकूलित करने के लिए 14 आवश्यक मापदंडों को कवर करने वाली व्यापक लैब-ग्रेड मिट्टी स्वास्थ्य रिपोर्ट।",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    id: "market",
    titleEn: "Market Intelligence",
    titleHi: "बाजार खुफिया",
    descriptionEn: "Predictive analytics for commodity prices. Know when to sell your harvest for the maximum profit based on global trends.",
    descriptionHi: "वस्तुओं की कीमतों के लिए भविष्य कहनेवाला विश्लेषण। वैश्विक रुझानों के आधार पर अधिकतम लाभ के लिए अपनी फसल कब बेचनी है, यह जानें।",
    icon: TrendingUp,
    color: "text-krishi-gold",
    bgColor: "bg-krishi-gold/10"
  },
  {
    id: "carbon",
    titleEn: "Carbon Credit Monetization",
    titleHi: "कार्बन क्रेडिट मुद्रीकरण",
    descriptionEn: "Earn revenue by adopting sustainable farming practices. We help you measure and sell carbon credits to global corporations.",
    descriptionHi: "सतत कृषि पद्धतियों को अपनाकर राजस्व अर्जित करें। हम आपको वैश्विक निगमों को कार्बन क्रेडिट मापने और बेचने में मदद करते हैं।",
    icon: Leaf,
    color: "text-krishi-lime",
    bgColor: "bg-krishi-lime/10"
  },
  {
    id: "weather",
    titleEn: "Pincode Weather Guard",
    titleHi: "पिनकोड वेदर गार्ड",
    descriptionEn: "Hyper-local weather forecasting with hyper-precision. Get rain alerts specifically for your farm's exact location.",
    descriptionHi: "अति-सटीकता के साथ हाइपर-लोकल मौसम पूर्वानुमान। विशेष रूप से अपने खेत के सटीक स्थान के लिए बारिश की चेतावनी प्राप्त करें।",
    icon: CloudSun,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10"
  }
];

export default function ServicesPage() {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "Our Services" : "हमारी सेवाएँ",
    subtitle: lang === 'en' ? "Empowering farmers with clinical-grade technology and actionable insights." : "नैदानिक-ग्रेड तकनीक और कार्रवाई योग्य अंतर्दृष्टि के साथ किसानों को सशक्त बनाना।",
    cta: lang === 'en' ? "Explore Services" : "सेवाओं का अन्वेषण करें",
    startCta: lang === 'en' ? "Get Started Now" : "अभी शुरू करें",
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-32 bg-krishi-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-headline font-bold uppercase tracking-widest"
          >
            <ShieldCheck size={14} />
            Precision Agriculture
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-white/60 font-body max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceHighlights.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full rounded-[2rem] border-border hover:border-primary/40 transition-all hover:shadow-xl group bg-card">
                <CardHeader className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${service.bgColor} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon size={28} />
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold">{lang === 'en' ? service.titleEn : service.titleHi}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-6">
                  <p className="text-foreground/60 leading-relaxed font-body">
                    {lang === 'en' ? service.descriptionEn : service.descriptionHi}
                  </p>
                  <Button variant="link" className="p-0 text-primary font-bold group-hover:translate-x-1 transition-transform">
                    {lang === 'en' ? "Learn More" : "और जानें"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl font-display text-foreground">
            {lang === 'en' ? "Ready to modernize your farm?" : "क्या आप अपने खेत को आधुनिक बनाने के लिए तैयार हैं?"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="rounded-full px-10 h-14 bg-primary text-white font-bold">
                {t.startCta}
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-10 h-14 font-bold">
                {lang === 'en' ? "Talk to Expert" : "विशेषज्ञ से बात करें"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
