'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'hi';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('krishi-theme') as Theme;
    const savedLang = localStorage.getItem('krishi-lang') as Language;
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLang(savedLang);
    setMounted(true);
  }, []);

  // Update theme class on document element
  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('krishi-theme', theme);
  }, [theme, mounted]);

  // Persist language
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('krishi-lang', lang);
  }, [lang, mounted]);

  return (
    <SettingsContext.Provider value={{ theme, setTheme, lang, setLang }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
