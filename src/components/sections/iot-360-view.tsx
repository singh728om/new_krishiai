
"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Wifi, 
  Radio, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Bike, 
  Store, 
  ShoppingBag, 
  User, 
  Sprout,
  MapPin,
  Clock,
  Navigation,
  Globe
} from "lucide-react";
import { useSettings } from "@/context/settings-context";

const ENTITIES = [
  { icon: Bike, color: "text-blue-400", top: "25%", left: "30%", delay: 0.2, label: "Rider" },
  { icon: Store, color: "text-krishi-gold", top: "40%", left: "70%", delay: 0.5, label: "Farmer/Seller" },
  { icon: ShoppingBag, color: "text-krishi-lime", top: "65%", left: "25%", delay: 0.8, label: "Local Buyer" },
  { icon: Bike, color: "text-blue-400", top: "15%", left: "60%", delay: 1.1, label: "Rider" },
  { icon: User, color: "text-white/40", top: "80%", left: "55%", delay: 1.4, label: "Consumer" },
  { icon: Store, color: "text-krishi-gold", top: "55%", left: "10%", delay: 1.7, label: "Agri-Merchant" },
];

export const Iot360View = () => {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "360° Hyper-local Ecosystem" : "360° हाइपर-लोकल इकोसिस्टम",
    subtitle: lang === 'en' ? "Connecting smart field monitoring with pincode-wise delivery. Farmers sell direct, riders ship within 15km, and buyers get verified organic produce." : "स्मार्ट फील्ड मॉनिटरिंग को पिनकोड-वार डिलीवरी के साथ जोड़ना। किसान सीधे बेचते हैं, राइडर 15 किमी के भीतर शिप करते हैं, और खरीदारों को सत्यापित जैविक उत्पाद मिलते हैं।",
    status: lang === 'en' ? "LOGISTICS_RADAR_ACTIVE" : "लॉजिस्टिक्स_रडार_सक्रिय",
  };

  const stats = [
    { 
      label: lang === 'en' ? "Delivery Radius" : "डिलीवरी रेडियस", 
      val: "15km Max", 
      icon: Navigation 
    },
    { 
      label: lang === 'en' ? "Farm to Fork" : "खेत से थाली तक", 
      val: "Direct Connect", 
      icon: Sprout 
    },
    { 
      label: lang === 'en' ? "Pincode Range" : "पिनकोड रेंज", 
      val: lang === 'en' ? "Varanasi / UP" : "वाराणसी / यूपी", 
      icon: MapPin 
    },
    { 
      label: lang === 'en' ? "Traceability" : "ट्रैसेबिलिटी", 
      val: "100% Organic", 
      icon: ShieldCheck 
    },
  ];

  return (
    <section className="py-24 bg-krishi-black text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest"
            >
              <Radio size={14} className="animate-pulse" />
              {t.status}
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display leading-tight">
              {t.title}
            </h2>
            <p className="text-xl text-white/60 font-body max-w-lg leading-relaxed">
              {t.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2 text-primary mb-1">
                    <stat.icon size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-display text-krishi-gold">{stat.val}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            {/* Radar Container */}
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
              
              {/* Radar Sweep Animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary/20 z-10"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent to-primary shadow-[0_0_20px_rgba(76,175,80,0.5)]" />
              </motion.div>
              
              {/* Concentric Circles */}
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.3]" />
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.6]" />
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.8]" />
              <div className="absolute inset-0 rounded-full border border-white/10" />

              {/* Network Entities (Riders, Sellers, Buyers) */}
              {ENTITIES.map((entity, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: entity.delay }}
                  className="absolute z-20 group"
                  style={{ top: entity.top, left: entity.left }}
                >
                  {/* Ping Effect */}
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: entity.delay }}
                    className={`absolute inset-0 rounded-full bg-current ${entity.color} opacity-20`}
                  />
                  
                  <div className={`relative p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 ${entity.color} shadow-lg transition-all group-hover:scale-125 group-hover:z-30`}>
                    <entity.icon size={16} />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-1.5 py-0.5 rounded whitespace-nowrap">
                      {entity.label}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Central Hub (KrishiAI Core) */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div 
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(76,175,80,0)", "0 0 40px rgba(76,175,80,0.3)", "0 0 0px rgba(76,175,80,0)"] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 bg-primary/10 rounded-full flex flex-col items-center justify-center border border-primary/20 backdrop-blur-md"
                >
                   <Sprout size={40} className="text-primary animate-pulse" />
                   <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-primary/60 mt-1">KRISHI_HUB</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
