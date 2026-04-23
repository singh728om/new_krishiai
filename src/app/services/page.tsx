"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Microscope, 
  Cpu, 
  Droplets, 
  TrendingUp, 
  Leaf, 
  CloudSun,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Sprout,
  Store,
  Bike,
  Radio
} from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Link from "next/link";

const serviceHighlights = [
  {
    id: "disease",
    titleEn: "AI Disease Detection",
    titleHi: "एआई रोग का पता लगाना",
    descriptionEn: "Instant leaf-level pathology using Gemini Vision AI. Identifies over 120+ crop diseases with 98% accuracy.",
    descriptionHi: "जेमिनी विजन एआई का उपयोग करके त्वरित पत्ती-स्तर विकृति विज्ञान। सेकंडों में 98% सटीकता के साथ 120+ से अधिक फसल रोगों की पहचान करता है।",
    detailedEn: "Our AI pathology engine uses Gemini 2.5 Flash to process high-resolution images of crop leaves. It detects early-stage fungal, bacterial, and viral infections before they become visible to the naked eye, allowing for targeted treatment and reducing pesticide usage by up to 30%.",
    detailedHi: "हमारा एआई पैथोलॉजी इंजन फसल के पत्तों की उच्च-रिज़ॉल्यूशन छवियों को संसाधित करने के लिए जेमिनी 2.5 फ्लैश का उपयोग करता है। यह शुरुआती चरण के फंगल, बैक्टीरियल और वायरल संक्रमणों का पता लगाता है, जिससे लक्षित उपचार संभव होता है और कीटनाशकों के उपयोग में 30% तक की कमी आती है।",
    icon: Microscope,
    color: "text-primary",
    bgColor: "bg-primary/10",
    stats: ["98% Accuracy", "3s Analysis", "120+ Crops"]
  },
  {
    id: "iot",
    titleEn: "IOT Sensor Network",
    titleHi: "आईओटी सेंसर नेटवर्क",
    descriptionEn: "Deploy high-fidelity field sensors to monitor soil moisture, N-P-K levels, and micro-climate conditions in real-time.",
    descriptionHi: "वास्तविक समय में मिट्टी की नमी, एन-पी-के स्तर और सूक्ष्म जलवायु परिस्थितियों की निगरानी के लिए उच्च-सटीकता वाले फील्ड सेंसर तैनात करें।",
    detailedEn: "Deploy solar-powered sensor nodes across your farm. These devices measure soil moisture at multiple depths, ground temperature, and nitrogen/phosphorus/potassium levels. Data is transmitted via LoRaWAN to our central hub, providing you with a live heatmap of your farm's health.",
    detailedHi: "अपने खेत में सौर ऊर्जा से चलने वाले सेंसर नोड्स तैनात करें। ये उपकरण विभिन्न गहराई पर मिट्टी की नमी, जमीन का तापमान और नाइट्रोजन/फास्फोरस/पोटेशियम के स्तर को मापते हैं। डेटा को हमारे केंद्रीय केंद्र पर प्रेषित किया जाता है, जो आपको आपके खेत के स्वास्थ्य का लाइव हीटमैप प्रदान करता है।",
    icon: Cpu,
    color: "text-krishi-amber",
    bgColor: "bg-krishi-amber/10",
    stats: ["Solar Powered", "LoRaWAN Support", "N-P-K Sensors"]
  },
  {
    id: "soil",
    titleEn: "Soil Testing & Analysis",
    titleHi: "मिट्टी परीक्षण और विश्लेषण",
    descriptionEn: "Comprehensive lab-grade soil health reports covering 14 essential parameters to optimize fertilizer usage.",
    descriptionHi: "उर्वरक उपयोग को अनुकूलित करने के लिए 14 आवश्यक मापदंडों को कवर करने वाली व्यापक लैब-ग्रेड मिट्टी स्वास्थ्य रिपोर्ट।",
    detailedEn: "A comprehensive health check for your land. We analyze 14 essential parameters including organic carbon, pH, electrical conductivity, and micro-nutrients. Reports include customized fertilizer recommendations and crop suitability scores based on historical data.",
    detailedHi: "आपकी भूमि के लिए एक व्यापक स्वास्थ्य जांच। हम जैविक कार्बन, पीएच, विद्युत चालकता और सूक्ष्म पोषक तत्वों सहित 14 आवश्यक मापदंडों का विश्लेषण करते हैं। रिपोर्ट में अनुकूलित उर्वरक सिफारिशें और ऐतिहासिक डेटा के आधार पर फसल उपयुक्तता स्कोर शामिल हैं।",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    stats: ["14 Parameters", "Custom Plans", "Lab Certified"]
  },
  {
    id: "market",
    titleEn: "Market Intelligence",
    titleHi: "बाजार खुफिया",
    descriptionEn: "Predictive analytics for commodity prices. Know when to sell your harvest for maximum profit.",
    descriptionHi: "वस्तुओं की कीमतों के लिए भविष्य कहनेवाला विश्लेषण। जानें कि अधिकतम लाभ के लिए अपनी फसल कब बेचनी है।",
    detailedEn: "Leverage big data to stay ahead. We monitor global commodity exchanges and local mandi prices to predict price fluctuations. Our engine provides a 'Profit Index' for different crops, helping you decide which crop cycle will be the most lucrative for the next season.",
    detailedHi: "आगे रहने के लिए बड़े डेटा का लाभ उठाएं। हम कीमतों में उतार-चढ़ाव की भविष्यवाणी करने के लिए वैश्विक कमोडिटी एक्सचेंजों और स्थानीय मंडी कीमतों की निगरानी करते हैं। हमारा इंजन विभिन्न फसलों के लिए 'प्रॉफिट इंडेक्स' प्रदान करता है, जिससे आपको यह तय करने में मदद मिलती है कि अगली फसल कौन सी लाभदायक होगी।",
    icon: TrendingUp,
    color: "text-krishi-gold",
    bgColor: "bg-krishi-gold/10",
    stats: ["Price Prediction", "Global Trends", "Profit Index"]
  },
  {
    id: "carbon",
    titleEn: "Carbon Monetization",
    titleHi: "कार्बन मुद्रीकरण",
    descriptionEn: "Earn revenue by adopting sustainable farming. We help you measure and sell carbon credits globally.",
    descriptionHi: "सतत कृषि अपनाकर राजस्व अर्जित करें। हम आपको विश्व स्तर पर कार्बन क्रेडिट मापने और बेचने में मदद करेंगे।",
    detailedEn: "Monetize your sustainability. By using KrishiAI's suggested regenerative practices—like minimal till and cover cropping—you sequester carbon in your soil. We handle the verification and listing of these credits on global markets, providing you with a new, passive revenue stream.",
    detailedHi: "अपनी स्थिरता का मुद्रीकरण करें। कृषि एआई की सुझाई गई पुनर्योजी प्रथाओं का उपयोग करके आप अपनी मिट्टी में कार्बन को जमा करते हैं। हम वैश्विक बाजारों में इन क्रेडिटों के सत्यापन और लिस्टिंग को संभालते हैं, जिससे आपको एक नया निष्क्रिय राजस्व मिलता है।",
    icon: Leaf,
    color: "text-krishi-lime",
    bgColor: "bg-krishi-lime/10",
    stats: ["Passive Income", "Regenerative AI", "Global Markets"]
  },
  {
    id: "weather",
    titleEn: "Pincode Weather Guard",
    titleHi: "पिनकोड वेदर गार्ड",
    descriptionEn: "Hyper-local weather forecasting with hyper-precision. Get rain alerts specifically for your farm.",
    descriptionHi: "अति-सटीकता के साथ हाइपर-लोकल मौसम पूर्वानुमान। विशेष रूप से अपने खेत के लिए बारिश की चेतावनी प्राप्त करें।",
    detailedEn: "Standard weather apps are too broad. KrishiAI provides farm-level weather guard. Our localized forecasting predicts rainfall at 1km² precision. Integrated alerts suggest the best windows for spraying, harvesting, and irrigation to avoid wastage.",
    detailedHi: "मानक मौसम ऐप्स बहुत व्यापक हैं। कृषि एआई खेत-स्तर का मौसम सुरक्षा प्रदान करता है। हमारा स्थानीय पूर्वानुमान 1 वर्ग किलोमीटर की सटीकता पर वर्षा की भविष्यवाणी करता है। एकीकृत अलर्ट बर्बादी से बचने के लिए छिड़काव, कटाई और सिंचाई के लिए सर्वोत्तम समय सुझाते हैं।",
    icon: CloudSun,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    stats: ["1km Precision", "Spray Alerts", "Pincode Targeting"]
  }
];

const subNavItems = [
  { labelEn: "Order Online", labelHi: "ऑनलाइन ऑर्डर", icon: ShoppingBag, href: "/products" },
  { labelEn: "Lease Your Land", labelHi: "जमीन पट्टा", icon: Sprout, href: "/lease-registration" },
  { labelEn: "Sell on KrishiAI", labelHi: "KrishiAI पर बेचें", icon: Store, href: "/partner-registration?type=farmer" },
  { labelEn: "Partner with Us", labelHi: "भागीदार बनें", icon: Bike, href: "/partner-registration?type=rider" },
  { labelEn: "360 Field Monitor", labelHi: "360° मॉनिटर", icon: Radio, href: "/#iot" },
];

export default function ServicesPage() {
  const { lang } = useSettings();
  const [selectedService, setSelectedService] = useState<typeof serviceHighlights[0] | null>(null);

  const t = {
    title: lang === 'en' ? "Our Services" : "हमारी सेवाएँ",
    subtitle: lang === 'en' ? "Empowering farmers with clinical-grade technology and actionable insights." : "नैदानिक-ग्रेड तकनीक और कार्रवाई योग्य अंतर्दृष्टि के साथ किसानों को सशक्त बनाना।",
    startCta: lang === 'en' ? "Get Started Now" : "अभी शुरू करें",
    learnMore: lang === 'en' ? "Learn More" : "और जानें",
    close: lang === 'en' ? "Close Details" : "विवरण बंद करें",
    keyHighlights: lang === 'en' ? "Key Capabilities" : "प्रमुख क्षमताएं",
    detailedAnalysis: lang === 'en' ? "Technical Overview" : "तकनीकी अवलोकन",
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Services Sub-Navbar */}
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
           <div className="flex items-center justify-center min-w-max gap-8">
              {subNavItems.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.href}
                  className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-foreground/60 hover:text-primary transition-colors whitespace-nowrap"
                >
                  <item.icon size={14} className="text-krishi-gold" />
                  {lang === 'en' ? item.labelEn : item.labelHi}
                </Link>
              ))}
           </div>
        </div>
      </div>

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
              <Card className="h-full rounded-[2.5rem] border-border hover:border-primary/40 transition-all hover:shadow-xl group bg-card overflow-hidden">
                <CardHeader className="p-10">
                  <div className={`w-14 h-14 rounded-2xl ${service.bgColor} ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon size={28} />
                  </div>
                  <CardTitle className="text-2xl font-headline font-bold">{lang === 'en' ? service.titleEn : service.titleHi}</CardTitle>
                </CardHeader>
                <CardContent className="px-10 pb-10 space-y-6">
                  <p className="text-foreground/60 leading-relaxed font-body">
                    {lang === 'en' ? service.descriptionEn : service.descriptionHi}
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 text-primary font-bold group-hover:translate-x-1 transition-transform"
                    onClick={() => setSelectedService(service)}
                  >
                    {t.learnMore} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Service View Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl rounded-[3rem] p-0 overflow-hidden border-none bg-card shadow-2xl [&>button]:hidden">
          <div className={`h-40 ${selectedService?.bgColor} relative`}>
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
             <div className="absolute bottom-6 left-10 flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center ${selectedService?.color} shadow-lg`}>
                   {selectedService && <selectedService.icon size={32} />}
                </div>
                <div className="space-y-1">
                   <h2 className="text-3xl font-display italic text-foreground">
                      {lang === 'en' ? selectedService?.titleEn : selectedService?.titleHi}
                   </h2>
                </div>
             </div>
          </div>

          <div className="p-10 space-y-10">
             <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">{t.detailedAnalysis}</h4>
                <p className="text-lg leading-relaxed text-foreground/80 font-body">
                   {lang === 'en' ? selectedService?.detailedEn : selectedService?.detailedHi}
                </p>
             </div>

             <div className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/40">{t.keyHighlights}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {selectedService?.stats.map((stat, i) => (
                     <div key={i} className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl border border-border">
                        <CheckCircle2 size={18} className="text-primary" />
                        <span className="font-bold text-sm">{stat}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="pt-6 border-t border-border flex gap-4">
                <Link href="/login" className="flex-1">
                  <Button className="w-full h-14 rounded-full bg-primary text-white font-bold text-lg">
                    {t.startCta}
                  </Button>
                </Link>
                <Button variant="outline" className="h-14 rounded-full px-8 font-bold" onClick={() => setSelectedService(null)}>
                   {t.close}
                </Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>

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
