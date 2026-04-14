"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/settings-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme, lang, setLang } = useSettings();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = {
    features: lang === 'en' ? 'Features' : 'विशेषताएं',
    store: lang === 'en' ? 'Harit Store' : 'हरित स्टोर',
    lease: lang === 'en' ? 'Land Lease' : 'जमीन पट्टा',
    about: lang === 'en' ? 'About' : 'हमारे बारे में',
    login: lang === 'en' ? 'Login' : 'लॉगिन',
    startFree: lang === 'en' ? 'Start Free' : 'मुफ्त शुरू करें',
  };

  const navLinks = [
    { name: t.features, href: "#features" },
    { name: t.store, href: "#store" },
    { name: t.lease, href: "#lease" },
    { name: t.about, href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-navbar py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1 group">
          <span className="text-2xl font-headline font-semibold tracking-tight text-foreground group-hover:text-krishi-gold transition-colors">
            KrishiAI
            <span className="text-krishi-gold">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-krishi-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Globe className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLang('en')}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLang('hi')}>हिन्दी (Hindi)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switcher */}
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button variant="ghost" className="text-foreground hover:text-krishi-gold font-medium">
            {t.login}
          </Button>
          <Button className="bg-krishi-amber hover:bg-krishi-amber/90 text-white rounded-full px-6 font-semibold">
            {t.startFree}
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <button
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-krishi-gold/10 p-6 flex flex-col gap-6 lg:hidden shadow-2xl"
          >
            <div className="flex justify-between items-center pb-4 border-b border-border">
               <span className="text-sm font-bold uppercase tracking-widest text-krishi-gold">Language</span>
               <div className="flex gap-4">
                  <button onClick={() => setLang('en')} className={`text-sm ${lang === 'en' ? 'text-krishi-gold font-bold' : 'text-foreground/60'}`}>English</button>
                  <button onClick={() => setLang('hi')} className={`text-sm ${lang === 'hi' ? 'text-krishi-gold font-bold' : 'text-foreground/60'}`}>हिन्दी</button>
               </div>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-headline font-medium text-foreground/90 hover:text-krishi-gold"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button variant="ghost" className="text-foreground justify-start text-lg">
                {t.login}
              </Button>
              <Button className="bg-krishi-amber hover:bg-krishi-amber/90 text-white rounded-full w-full py-6 text-lg">
                {t.startFree}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
