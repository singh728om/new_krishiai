
"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Store, Bike, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "@/context/settings-context";

const ACTIONS = [
  {
    id: "order",
    titleEn: "Order Online",
    titleHi: "ऑनलाइन ऑर्डर करें",
    descEn: "Get fresh organic produce delivered from nearby farms within 15km.",
    descHi: "15 किमी के भीतर पास के खेतों से ताजी जैविक उपज प्राप्त करें।",
    icon: ShoppingBag,
    href: "/products",
    image: "https://picsum.photos/seed/agri-order/800/600",
    imageHint: "vegetable delivery",
    color: "from-krishi-lime to-primary"
  },
  {
    id: "sell",
    titleEn: "Sell on KrishiAI",
    titleHi: "KrishiAI पर बेचें",
    descEn: "List your farm produce and reach thousands of local buyers directly.",
    descHi: "अपने खेत की उपज को सूचीबद्ध करें और सीधे स्थानीय खरीदारों तक पहुंचें।",
    icon: Store,
    href: "/partner-registration?type=farmer",
    image: "https://picsum.photos/seed/agri-sell/800/600",
    imageHint: "farmer market",
    color: "from-krishi-gold to-krishi-amber"
  },
  {
    id: "partner",
    titleEn: "Join us as Partner",
    titleHi: "भागीदार के रूप में जुड़ें",
    descEn: "Become a delivery partner and earn by fulfilling local organic orders.",
    descHi: "डिलीवरी पार्टनर बनें और स्थानीय जैविक ऑर्डर पूरे करके कमाएं।",
    icon: Bike,
    href: "/partner-registration?type=rider",
    image: "https://picsum.photos/seed/agri-rider/800/600",
    imageHint: "delivery boy",
    color: "from-blue-500 to-sky-600"
  }
];

export const ActionCards = () => {
  const { lang } = useSettings();

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
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
                  whileHover={{ y: -12 }}
                  className="group relative h-[450px] rounded-[2.5rem] overflow-hidden border border-border shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Background Image with Overlay */}
                  <Image
                    src={action.image}
                    alt={action.titleEn}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    data-ai-hint={action.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-krishi-black via-krishi-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <action.icon size={28} />
                    </div>
                    
                    <h3 className="text-3xl font-display mb-3 group-hover:text-krishi-gold transition-colors">
                      {lang === 'en' ? action.titleEn : action.titleHi}
                    </h3>
                    
                    <p className="text-white/70 font-body text-sm leading-relaxed mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      {lang === 'en' ? action.descEn : action.descHi}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs font-headline font-bold uppercase tracking-widest text-krishi-gold">
                      {lang === 'en' ? "Get Started" : "शुरू करें"}
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${action.color} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity`} />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
