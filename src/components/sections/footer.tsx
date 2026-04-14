"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-krishi-black pt-24 pb-12 border-t border-krishi-cream/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="text-2xl font-headline font-semibold text-krishi-cream">
              KrishiAI<span className="text-krishi-gold">.</span>
            </Link>
            <p className="text-krishi-cream/40 font-body max-w-sm">
              Empowering Indian agriculture with the next generation of artificial intelligence. Made with ❤️ for Bharat.
            </p>
            <p className="text-xs text-krishi-cream/30 uppercase tracking-[0.2em] font-headline">
              © 2024 Krishi Intelligence Private Limited.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] text-krishi-gold uppercase tracking-[0.3em] font-headline font-bold">Product</h4>
            <ul className="space-y-3">
              {["Harit Store", "Farmer Tools", "Land Lease", "Carbon Credits"].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-krishi-cream/60 hover:text-krishi-gold transition-colors font-body">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] text-krishi-gold uppercase tracking-[0.3em] font-headline font-bold">Company</h4>
            <ul className="space-y-3">
              {["About", "Press", "Impact", "Privacy", "Terms"].map(link => (
                <li key={link}>
                  <Link href="#" className="text-sm text-krishi-cream/60 hover:text-krishi-gold transition-colors font-body">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-krishi-cream/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex gap-6 text-krishi-cream/30 text-xs">
              <span>English</span>
              <span>हिन्दी</span>
              <span>मराठी</span>
              <span>ਪੰਜਾਬੀ</span>
           </div>
           <div className="flex gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border border-krishi-cream/5 flex items-center justify-center text-krishi-cream/40 hover:text-krishi-gold hover:border-krishi-gold/30 transition-all cursor-pointer">
                   <span className="text-xs font-headline">X</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </footer>
  );
};
