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
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, Lock, Info } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * LoginPage - Handles user authentication.
 * Currently configured in "Prototype Mode" where real Firebase Auth is restricted
 * and users are encouraged to use the Demo credentials.
 */
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
  const redirect = searchParams.get("redirect") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("buyer");
  const [resetEmail, setResetEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  // Configuration: Disable real auth for prototype
  const REAL_AUTH_DISABLED = true;

  useEffect(() => {
    if (user) router.push(redirect);
  }, [user, router, redirect]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo Login Logic (Always active)
    if (email.toLowerCase() === "demo" && password.toLowerCase() === "demo") {
      toast({ 
        title: lang === 'en' ? "Demo Access Granted" : "डेमो एक्सेस दिया गया",
        description: lang === 'en' ? "Redirecting to your farm dashboard..." : "आपके फार्म डैशबोर्ड पर रीडायरेक्ट किया जा रहा है..."
      });
      router.push("/dashboard");
      return;
    }

    if (REAL_AUTH_DISABLED) {
      toast({
        variant: "destructive",
        title: lang === 'en' ? "Auth Restricted" : "प्रमाणीकरण प्रतिबंधित",
        description: lang === 'en' 
          ? "Real cloud login is disabled for this prototype. Please use 'demo' / 'demo'." 
          : "इस प्रोटोटाइप के लिए असली क्लाउड लॉगिन अक्षम है। कृपया 'demo' / 'demo' का उपयोग करें।"
      });
      return;
    }

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

    if (REAL_AUTH_DISABLED) {
      toast({
        variant: "destructive",
        title: lang === 'en' ? "Registration Disabled" : "पंजीकरण अक्षम",
        description: lang === 'en' 
          ? "New account creation is restricted to internal pilot clusters. Use demo credentials to preview." 
          : "नया खाता निर्माण आंतरिक पायलट क्लस्टर्स तक सीमित है। पूर्वावलोकन के लिए डेमो क्रेडेंशियल्स का उपयोग करें।"
      });
      return;
    }

    setIsPending(true);
    try {
      await signUpWithEmail(email, password, name, role);
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
    if (REAL_AUTH_DISABLED) return;
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
    email: lang === 'en' ? "Email / Username" : "ईमेल / यूजरनेम",
    password: lang === 'en' ? "Password" : "पासवर्ड",
    name: lang === 'en' ? "Full Name" : "पूरा नाम",
    role: lang === 'en' ? "I am a..." : "मैं एक हूँ...",
    forgot: lang === 'en' ? "Forgot Password?" : "पासवर्ड भूल गए?",
    resetTitle: lang === 'en' ? "Reset Password" : "पासवर्ड बदलें",
    resetDesc: lang === 'en' ? "Enter your email to receive a reset link." : "रीसेट लिंक प्राप्त करने के लिए अपना ईमेल दर्ज करें।",
    send: lang === 'en' ? "Send Link" : "लिंक भेजें",
    demoHint: lang === 'en' ? "USE 'demo' AS USERNAME \u0026 PASSWORD" : "यूजरनेम और पासवर्ड के रूप में 'demo' का उपयोग करें",
    prototypeNote: lang === 'en' 
      ? "Real cloud registration is currently restricted to internal pilot clusters." 
      : "वास्तविक क्लाउड पंजीकरण वर्तमान में आंतरिक पायलट समूहों तक ही सीमित है।",
    roles: {
      buyer: lang === 'en' ? "Buyer (Store Customer)" : "खरीददार (स्टोर ग्राहक)",
      land_owner: lang === 'en' ? "Land Owner (Leasing Land)" : "ज़मीन मालिक (ज़मीन पट्टे पर देना)",
      farmer: lang === 'en' ? "Farmer (Using AI Services)" : "किसान (एआई सेवाओं का उपयोग)",
      staff: lang === 'en' ? "Employee (Field Monitoring)" : "कर्मचारी (क्षेत्र निगरानी)",
    }
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

          <Alert className="bg-primary/5 border-primary/20 rounded-2xl">
            <Info className="h-4 w-4 text-primary" />
            <AlertTitle className="text-xs font-bold uppercase tracking-widest text-primary">Prototype Mode</AlertTitle>
            <AlertDescription className="text-xs text-foreground/70">
              {t.demoHint}
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-full mb-8 bg-muted/50 p-1">
              <TabsTrigger value="login" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                {t.login}
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white">
                {t.create}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-foreground/40">{t.email}</Label>
                  <Input 
                    id="email" 
                    placeholder="demo" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    className="rounded-xl h-12 bg-muted/30"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-foreground/40">{t.password}</Label>
                    <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                      <DialogTrigger asChild>
                        <button 
                          type="button" 
                          disabled={REAL_AUTH_DISABLED}
                          className="text-[10px] text-primary hover:underline uppercase font-bold tracking-widest disabled:opacity-30"
                        >
                          {t.forgot}
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl border-border shadow-2xl">
                        <DialogHeader>
                          <DialogTitle>{t.resetTitle}</DialogTitle>
                          <DialogDescription>{t.resetDesc}</DialogDescription>
                        </DialogHeader>
                        <Input 
                          placeholder="email@example.com" 
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="rounded-xl h-12"
                        />
                        <DialogFooter>
                          <Button onClick={handleResetPassword} className="rounded-full w-full h-12 font-bold bg-primary text-white">
                            {t.send}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="demo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="rounded-xl h-12 bg-muted/30"
                  />
                </div>
                <Button 
                  disabled={isPending}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full h-14 font-bold transition-all shadow-lg shadow-primary/20"
                >
                  {isPending ? "..." : t.login}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="text-center py-12 px-4 space-y-4 bg-muted/20 rounded-3xl border border-dashed border-border">
                <Lock className="mx-auto h-8 w-8 text-foreground/20" />
                <p className="text-sm text-foreground/40 leading-relaxed italic">
                  {t.prototypeNote}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEmail("demo");
                    setPassword("demo");
                    const loginTab = document.querySelector('[value="login"]') as HTMLElement;
                    loginTab?.click();
                  }}
                  className="rounded-full text-xs font-bold"
                >
                  Go Back to Demo Login
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em] text-foreground/20">
              <span className="bg-card px-4">Social Access</span>
            </div>
          </div>

          <Button 
            variant="outline"
            disabled={REAL_AUTH_DISABLED}
            onClick={() => loginWithGoogle()}
            className="w-full rounded-full h-14 font-bold flex gap-3 border-border hover:bg-muted/50 transition-all disabled:opacity-30"
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
