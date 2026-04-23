
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bike, ShoppingBasket, CheckCircle2, ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PartnerRegistrationPage() {
  const { lang } = useSettings();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const t = {
    title: lang === 'en' ? "Partner with KrishiAI" : "KrishiAI के साथ भागीदार बनें",
    subtitle: lang === 'en' ? "Join Bharat's fastest growing organic supply chain." : "भारत की सबसे तेजी से बढ़ती जैविक आपूर्ति श्रृंखला में शामिल हों।",
    rider: lang === 'en' ? "Delivery Partner" : "डिलीवरी पार्टनर",
    farmer: lang === 'en' ? "Merchant Farmer" : "व्यापारी किसान",
    form: {
      name: lang === 'en' ? "Full Name" : "पूरा नाम",
      phone: lang === 'en' ? "Phone Number" : "फ़ोन नंबर",
      village: lang === 'en' ? "Village / Locality" : "गाँव / इलाका",
      vehicle: lang === 'en' ? "Vehicle Type" : "वाहन का प्रकार",
      produce: lang === 'en' ? "Primary Produce" : "प्राथमिक उत्पाद",
      submit: lang === 'en' ? "Register Now" : "अभी पंजीकरण करें",
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Application Received",
      description: "Our local coordinator will visit you within 24 hours.",
    });
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-4xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl md:text-7xl font-display text-foreground">{t.title}</h1>
          <p className="text-xl text-foreground/60 font-body">{t.subtitle}</p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Tabs defaultValue="rider" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-full mb-12 bg-muted/50 p-1">
                  <TabsTrigger value="rider" className="rounded-full py-4 data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
                    <Bike size={18} /> {t.rider}
                  </TabsTrigger>
                  <TabsTrigger value="farmer" className="rounded-full py-4 data-[state=active]:bg-primary data-[state=active]:text-white gap-2">
                    <ShoppingBasket size={18} /> {t.farmer}
                  </TabsTrigger>
                </TabsList>

                <Card className="p-8 md:p-12 rounded-[3rem] border-border shadow-2xl bg-card">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>{t.form.name}</Label>
                        <Input placeholder="E.g. Rahul Singh" className="rounded-xl h-12" required />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.form.phone}</Label>
                        <Input placeholder="+91 00000 00000" className="rounded-xl h-12" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{t.form.village}</Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30" size={18} />
                        <Input placeholder="Enter your area (Within 15km of cluster)" className="pl-12 rounded-xl h-12" required />
                      </div>
                    </div>

                    <TabsContent value="rider" className="mt-0">
                      <div className="space-y-2">
                        <Label>{t.form.vehicle}</Label>
                        <Input placeholder="Cycle / Bike / Electric Scooter" className="rounded-xl h-12" />
                      </div>
                    </TabsContent>

                    <TabsContent value="farmer" className="mt-0">
                      <div className="space-y-2">
                        <Label>{t.form.produce}</Label>
                        <Input placeholder="E.g. Organic Tomatoes, Banarasi Mango" className="rounded-xl h-12" />
                      </div>
                    </TabsContent>

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
                       <ShieldCheck className="text-primary shrink-0" size={24} />
                       <p className="text-xs text-foreground/60 font-medium">
                         By registering, you agree to KrishiAI's quality standards and 15km hyperlocal delivery guidelines.
                       </p>
                    </div>

                    <Button type="submit" className="w-full h-16 rounded-full bg-primary text-white font-bold text-lg shadow-lg">
                      {t.form.submit} <ArrowRight className="ml-2" />
                    </Button>
                  </form>
                </Card>
              </Tabs>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-20 bg-card border border-border rounded-[3rem] shadow-2xl"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-display">Welcome to the Network!</h2>
                <p className="text-foreground/60 font-body max-w-sm mx-auto">
                  Your application is being verified. You will receive a notification to start your first delivery or listing shortly.
                </p>
              </div>
              <Button onClick={() => window.location.href = "/"} variant="outline" className="rounded-full px-8">
                Return to Home
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </main>
  );
}
