
"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Store, Bike, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/settings-context";

const ACTIONS = [
  {
    id: "order",
    titleEn: "Order Online",
    titleHi: "ऑनलाइन ऑर्डर करें",
    descEn: "Fresh organic produce within 15km.",
    descHi: "15 किमी के भीतर ताजी उपज।",
    icon: ShoppingBag,
    href: "/products",
    color: "bg-krishi-lime/10 text-krishi-lime",
    glow: "shadow-krishi-lime/20"
  },
  {
    id: "sell",
    titleEn: "Sell on KrishiAI",
    titleHi: "KrishiAI पर बेचें",
    descEn: "List your produce to local buyers.",
    descHi: "स्थानीय खरीदारों के लिए उत्पाद।",
    icon: Store,
    href: "/partner-registration?type=farmer",
    color: "bg-krishi-gold/10 text-krishi-gold",
    glow: "shadow-krishi-gold/20"
  },
  {
    id: "partner",
    titleEn: "Partner with Us",
    titleHi: "भागीदार बनें",
    descEn: "Earn by fulfilling local orders.",
    descHi: "ऑर्डर पूरे करके कमाएं।",
    icon: Bike,
    href: "/partner-registration?type=rider",
    color: "bg-blue-500/10 text-blue-500",
    glow: "shadow-blue-500/20"
  }
];

export const ActionCards = () => {
  const { lang } = useSettings();

  return (
    <section className="py-16 bg-background relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACTIONS.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={action.href}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group p-8 rounded-[2rem] bg-card border border-border hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden"
                >
                  <div className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <action.icon size={32} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {lang === 'en' ? action.titleEn : action.titleHi}
                    </h3>
                    <p className="text-foreground/50 font-body text-sm">
                      {lang === 'en' ? action.descEn : action.descHi}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-[10px] font-headline font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {lang === 'en' ? "Get Started" : "शुरू करें"}
                    <ArrowRight size={12} />
                  </div>

                  {/* Subtle Background Accent */}
                  <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${action.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity`} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
