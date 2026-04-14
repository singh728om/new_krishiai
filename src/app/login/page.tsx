
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/firebase";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, loginWithGoogle } = useUser();
  const { lang } = useSettings();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/profile";

  useEffect(() => {
    if (user) router.push(redirect);
  }, [user, router, redirect]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-12 bg-card rounded-[3rem] border border-border shadow-2xl text-center space-y-8"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-3xl">
            🌱
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-display">
              {lang === 'en' ? "Welcome to" : "स्वागत है"} <span className="text-primary">KrishiAI</span>
            </h1>
            <p className="text-foreground/60">
              {lang === 'en' ? "Join the smart farming revolution." : "स्मार्ट खेती क्रांति में शामिल हों।"}
            </p>
          </div>
          <Button 
            onClick={() => loginWithGoogle()}
            className="w-full bg-primary hover:bg-primary/90 text-white rounded-full py-8 text-lg font-bold flex gap-3 shadow-lg shadow-primary/20"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
            {lang === 'en' ? "Login with Google" : "गूगल के साथ लॉगिन करें"}
          </Button>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
