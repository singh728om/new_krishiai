
"use client";

import { motion } from "framer-motion";
import { Cpu, Wifi, Radio, Zap, ShieldCheck, Activity } from "lucide-react";
import { useSettings } from "@/context/settings-context";

export const Iot360View = () => {
  const { lang } = useSettings();

  const t = {
    title: lang === 'en' ? "360° IoT Field Monitoring" : "360° आईओटी फील्ड मॉनिटरिंग",
    subtitle: lang === 'en' ? "Real-time spectral analysis and soil synchronization across all clusters." : "सभी क्लस्टरों में रीयल-टाइम स्पेक्ट्रल विश्लेषण और मिट्टी का सिंक्रनाइज़ेशन।",
    status: lang === 'en' ? "LIVE_RADAR_ACTIVE" : "लाइव_रडार_सक्रिय",
  };

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
            <p className="text-xl text-white/60 font-body max-w-lg">
              {t.subtitle}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Latency", val: "14ms", icon: Zap },
                { label: "Uptime", val: "99.9%", icon: ShieldCheck },
                { label: "Sync Rate", val: "2.4GB/s", icon: Activity },
                { label: "Coverage", val: "15km Radius", icon: Wifi },
              ].map((stat, i) => (
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
            {/* Radar Animation */}
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary/20"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-transparent to-primary shadow-[0_0_20px_rgba(76,175,80,0.5)]" />
              </motion.div>
              
              {/* Concentric Circles */}
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.3]" />
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.6]" />
              <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.8]" />

              {/* Data Points */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="absolute w-2 h-2 bg-krishi-gold rounded-full shadow-[0_0_10px_#D4A017]"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                  }}
                />
              ))}

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 backdrop-blur-sm">
                   <Cpu size={40} className="text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
