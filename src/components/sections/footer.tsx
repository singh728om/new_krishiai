
"use client";

import Link from "next/link";
import { useSettings } from "@/context/settings-context";

export const Footer = () => {
  const { lang } = useSettings();

  const t = {
    tagline: lang === 'en' ? 'Empowering Indian agriculture with the next generation of artificial intelligence. Made with ❤️ for Bharat.' : 'आर्टिफिशियल इंटेलिजेंस की अगली पीढ़ी के साथ भारतीय कृषि को सशक्त बनाना। भारत के लिए ❤️ के साथ बनाया गया।',
    copyright: lang === 'en' ? '© 2024 Krishi Intelligence Private Limited.' : '© 2024 कृषि इंटेलिजेंस प्राइवेट लिमिटेड।',
    product: lang === 'en' ? 'Product' : 'उत्पाद',
    company: lang === 'en' ? 'Company' : 'कंपनी',
    products: [
      { name: lang === 'en' ? "Harit Store" : "हरित स्टोर", href: "/products" },
      { name: lang === 'en' ? "Farmer Tools" : "किसान उपकरण", href: "/#features" },
      { name: lang === 'en' ? "Land Lease" : "जमीन पट्टा", href: "/lease-registration" },
      { name: lang === 'en' ? "Carbon Credits" : "कार्बन क्रेडिट", href: "/#features" },
    ],
    companies: [
      { name: lang === 'en' ? "About" : "बारे में", href: "#" },
      { name: lang === 'en' ? "Press" : "प्रेस", href: "#" },
      { name: lang === 'en' ? "Impact" : "प्रभाव", href: "#" },
      { name: lang === 'en' ? "Privacy" : "गोपनीयता", href: "#" },
      { name: lang === 'en' ? "Terms" : "शर्तें", href: "#" },
    ]
  };

  return (
    <footer className="bg-krishi-black pt-24 pb-12 border-t border-krishi-cream/10 relative z-20 w-full mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="text-2xl font-headline font-bold text-white">
              KrishiAI<span className="text-krishi-gold">.</span>
            </Link>
            <p className="text-white/80 font-body max-w-sm leading-relaxed">
              {t.tagline}
            </p>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-headline">
              {t.copyright}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] text-krishi-gold uppercase tracking-[0.3em] font-headline font-bold">
              {t.product}
            </h4>
            <ul className="space-y-3">
              {t.products.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-krishi-gold transition-colors font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] text-krishi-gold uppercase tracking-[0.3em] font-headline font-bold">
              {t.company}
            </h4>
            <ul className="space-y-3">
              {t.companies.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-krishi-gold transition-colors font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex flex-wrap justify-center gap-6 text-white/50 text-xs font-medium uppercase tracking-widest">
              <span>English</span>
              <span>हिन्दी</span>
              <span>मराठी</span>
              <span>ਪੰਜਾਬੀ</span>
           </div>
           <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-krishi-gold hover:border-krishi-gold/30 hover:bg-white/5 transition-all cursor-pointer">
                   <span className="text-xs font-headline">X</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </footer>
  );
};
