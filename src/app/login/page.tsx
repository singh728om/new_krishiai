
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/firebase";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";

export default function LoginPage() {
  const { 
    user, 
    loginWithGoogle, 
    loginWithEmail, 
    signUpWithEmail, 
    resetPassword 
  } = useUser();
  const { lang } = useSettings();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  useEffect(() => {
    if (user) router.push(redirect);
  }, [user, router, redirect]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await loginWithEmail(email, password);
      toast({ title: lang === 'en' ? "Welcome back!" : "वापसी पर स्वागत है!" });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: lang === 'en' ? "Login failed" : "लॉगिन विफल",
        description: error.message 
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await signUpWithEmail(email, password, name);
      toast({ title: lang === 'en' ? "Account created!" : "खाता बनाया गया!" });
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: lang === 'en' ? "Signup failed" : "साइनअप विफल",
        description: error.message 
      });
    } finally {
      setIsPending(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) return;
    try {
      await resetPassword(resetEmail);
      toast({ 
        title: lang === 'en' ? "Email sent!" : "ईमेल भेजा गया!", 
        description: lang === 'en' ? "Check your inbox for instructions." : "निर्देशों के लिए अपना इनबॉक्स देखें।" 
      });
      setIsResetDialogOpen(false);
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: lang === 'en' ? "Error" : "त्रुटि",
        description: error.message 
      });
    }
  };

  const t = {
    welcome: lang === 'en' ? "Welcome to" : "स्वागत है",
    join: lang === 'en' ? "Join the smart farming revolution." : "स्मार्ट खेती क्रांति में शामिल हों।",
    google: lang === 'en' ? "Continue with Google" : "गूगल के साथ जारी रखें",
    login: lang === 'en' ? "Login" : "लॉगिन",
    create: lang === 'en' ? "Create Account" : "खाता बनाएं",
    email: lang === 'en' ? "Email" : "ईमेल",
    password: lang === 'en' ? "Password" : "पासवर्ड",
    name: lang === 'en' ? "Full Name" : "पूरा नाम",
    forgot: lang === 'en' ? "Forgot Password?" : "पासवर्ड भूल गए?",
    resetTitle: lang === 'en' ? "Reset Password" : "पासवर्ड बदलें",
    resetDesc: lang === 'en' ? "Enter your email to receive a reset link." : "रीसेट लिंक प्राप्त करने के लिए अपना ईमेल दर्ज करें।",
    send: lang === 'en' ? "Send Link" : "लिंक भेजें",
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="flex-1 flex items-center justify-center p-6 pt-32 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full p-8 md:p-12 bg-card rounded-[3rem] border border-border shadow-2xl space-y-8"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary text-2xl">
              🌱
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-display">
                {t.welcome} <span className="text-primary">KrishiAI</span>
              </h1>
              <p className="text-sm text-foreground/60">
                {t.join}
              </p>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full mb-8">
              <TabsTrigger value="login" className="rounded-full">{t.login}</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full">{t.create}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t.email}</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">{t.password}</Label>
                    <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                      <DialogTrigger asChild>
                        <button type="button" className="text-xs text-primary hover:underline">{t.forgot}</button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl">
                        <DialogHeader>
                          <DialogTitle>{t.resetTitle}</DialogTitle>
                          <DialogDescription>{t.resetDesc}</DialogDescription>
                        </DialogHeader>
                        <Input 
                          placeholder="email@example.com" 
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="rounded-xl"
                        />
                        <DialogFooter>
                          <Button onClick={handleResetPassword} className="rounded-full w-full">{t.send}</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="rounded-xl h-12"
                  />
                </div>
                <Button 
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 font-bold transition-all"
                >
                  {isPending ? "..." : t.login}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t.name}</Label>
                  <Input 
                    id="signup-name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t.email}</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="rounded-xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t.password}</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="rounded-xl h-12"
                  />
                </div>
                <Button 
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-12 font-bold transition-all"
                >
                  {isPending ? "..." : t.create}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-foreground/40 font-bold tracking-widest">Or</span>
            </div>
          </div>

          <Button 
            variant="outline"
            onClick={() => loginWithGoogle()}
            className="w-full rounded-full h-12 font-bold flex gap-3 border-border hover:bg-muted"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            {t.google}
          </Button>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}
