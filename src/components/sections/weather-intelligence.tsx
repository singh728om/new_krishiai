"use client";

import { motion } from "framer-motion";
import { CloudRain, Wind, Thermometer, Droplets, Sun, MapPin, Sprout } from "lucide-react";
import { useSettings } from "@/context/settings-context";
import { useState, useEffect } from "react";

export const WeatherIntelligence = () => {
  const { lang } = useSettings();
  const [temp, setTemp] = useState(28);

  useEffect(() => {
    const timer = setInterval(() => {
      setTemp(prev => prev + (Math.random() > 0.5 ? 0.1 : -0.1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const t = {
    title: lang === 'en' ? 'Weather Guard.' : 'वेदर गार्ड।',
    subtitle: lang === 'en' ? 'Hyper-local forecasting at pincode precision. AI that predicts the rain before you see the clouds.' : 'पिनकोड स्तर पर हाइपर-लोकल पूर्वानुमान। एआई जो बादलों को देखने से पहले बारिश की भविष्यवाणी करता है।',
    currentLabel: lang === 'en' ? 'CURRENT_STATUS' : 'वर्तमान स्थिति',
    location: lang === 'en' ? 'Wardha District, MH' : 'वर्धा जिला, महाराष्ट्र',
    humidity: lang === 'en' ? 'Humidity' : 'नमी',
    wind: lang === 'en' ? 'Wind Speed' : 'हवा की गति',
    precipitation: lang === 'en' ? 'Rain Chance' : 'बारिश की संभावना',
    advisory: lang === 'en' ? 'AI Farm Advisory' : 'एआई कृषि सलाह',
    advisoryText: lang === 'en' ? 'Optimal conditions for sowing. Expected light rain in 48 hours. Postpone irrigation.' : 'बुवाई के लिए अनुकूल स्थिति। 48 घंटों में हल्की बारिश की संभावना। सिंचाई स्थगित करें।',
  };

  return (
    <section className="py-24 bg-muted/30 border-y border-border overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-[2.5rem] border border-border p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Sun size={200} className="animate-spin-slow" />
              </div>

              <div className="flex justify-between items-start mb-12">
                <div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                    <MapPin size={14} />
                    {t.location}
                  </div>
                  <h3 className="text-6xl font-display text-foreground">{temp.toFixed(1)}°C</h3>
                </div>
                <div className="bg-primary/10 p-4 rounded-2xl">
                  <CloudRain className="text-primary w-12 h-12" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground/40 text-[10px] uppercase font-bold">
                    <Droplets size={12} /> {t.humidity}
                  </div>
                  <div className="text-xl font-headline font-bold">64%</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground/40 text-[10px] uppercase font-bold">
                    <Wind size={12} /> {t.wind}
                  </div>
                  <div className="text-xl font-headline font-bold">12 km/h</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground/40 text-[10px] uppercase font-bold">
                    <CloudRain size={12} /> {t.precipitation}
                  </div>
                  <div className="text-xl font-headline font-bold text-primary">15%</div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-3 tracking-widest">
                  <Sprout size={14} />
                  {t.advisory}
                </div>
                <p className="text-sm font-body text-foreground/80 leading-relaxed italic">
                  "{t.advisoryText}"
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-display text-foreground leading-[1.1]">{t.title}</h2>
              <p className="text-xl text-foreground/60 font-body max-w-lg">{t.subtitle}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
               {['98% Accuracy', 'Pincode Level', 'Real-time Alerts'].map((badge) => (
                 <span key={badge} className="px-4 py-2 bg-background border border-border rounded-full text-xs font-bold uppercase tracking-widest text-foreground/40">
                   {badge}
                 </span>
               ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};