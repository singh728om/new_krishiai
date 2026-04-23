"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Globe, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { useSettings } from "@/context/settings-context";
import { useCart } from "@/context/cart-context";
import { useUser } from "@/firebase";
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
  const { totalItems } = useCart();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = {
    features: lang === 'en' ? 'Features' : 'विशेषताएं',
    services: lang === 'en' ? 'Services' : 'सेवाएं',
    about: lang === 'en' ? 'About' : 'बारे में',
    contact: lang === 'en' ? 'Contact' : 'संपर्क',
    store: lang === 'en' ? 'Harit Store' : 'हरित स्टोर',
    lease: lang === 'en' ? 'Land Lease' : 'जमीन पट्टा',
    login: lang === 'en' ? 'Login' : 'लॉगिन',
    profile: lang === 'en' ? 'Profile' : 'प्रोफ़ाइल',
    weather: lang === 'en' ? 'Weather' : 'मौसम',
  };

  const navLinks = [
    { name: t.services, href: "/services" },
    { name: t.weather, href: "/weather" },
    { name: t.store, href: "/products" },
    { name: t.about, href: "/about" },
    { name: t.contact, href: "/contact" },
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
        <div className="hidden lg:flex items-center gap-6">
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
          {/* Cart Icon */}
          <Link href="/checkout" className="relative p-2 text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

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

          {user ? (
            <Link href="/profile">
              <Button variant="ghost" className="flex items-center gap-2 text-foreground font-medium">
                <User className="h-4 w-4" />
                {t.profile}
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button className="bg-krishi-amber hover:bg-krishi-amber/90 text-white rounded-full px-6 font-semibold">
                {t.login}
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
            <Link href="/checkout" className="relative p-2 text-foreground">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
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
              {user ? (
                <Link href="/profile">
                  <Button variant="ghost" className="text-foreground justify-start text-lg">
                    {t.profile}
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="bg-krishi-amber hover:bg-krishi-amber/90 text-white rounded-full w-full py-6 text-lg">
                    {t.login}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
