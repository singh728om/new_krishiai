"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { lang } = useSettings();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: lang === 'en' ? "Message Sent!" : "संदेश भेजा गया!",
      description: lang === 'en' ? "We will get back to you shortly." : "हम जल्द ही आपसे संपर्क करेंगे।",
    });
  };

  const t = {
    title: lang === 'en' ? "Contact Us" : "संपर्क करें",
    subtitle: lang === 'en' ? "Have questions? We're here to help you grow." : "प्रश्न हैं? हम आपको बढ़ने में मदद करने के लिए यहां हैं।",
    address: lang === 'en' ? "Our Hubs" : "हमारे केंद्र",
    form: {
      name: lang === 'en' ? "Full Name" : "पूरा नाम",
      email: lang === 'en' ? "Email Address" : "ईमेल पता",
      subject: lang === 'en' ? "Subject" : "विषय",
      message: lang === 'en' ? "Your Message" : "आपका संदेश",
      send: lang === 'en' ? "Send Message" : "संदेश भेजें",
    }
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-7xl font-display text-foreground">{t.title}</h1>
            <p className="text-xl text-foreground/60 font-body">{t.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-headline font-bold text-primary">{t.address}</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Varanasi Regional HQ</h4>
                      <p className="text-foreground/60">Krishi Tower, Sector 4, Varanasi, Uttar Pradesh - 221001</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Support Line</h4>
                      <p className="text-foreground/60">+91 1800-KRISHI-AI (Toll Free)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email Us</h4>
                      <p className="text-foreground/60">support@krishiai.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-krishi-black text-white rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MessageSquare size={120} />
                </div>
                <h3 className="text-2xl font-display italic text-krishi-gold mb-4">Farmer Helpline</h3>
                <p className="text-white/60 mb-6">Available 24/7 in 12 regional languages for technical assistance.</p>
                <Button className="w-full bg-krishi-gold hover:bg-krishi-gold/90 text-krishi-black rounded-full font-bold">
                  Start Chat on WhatsApp
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card p-8 md:p-12 rounded-[3rem] border border-border shadow-xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.form.name}</Label>
                  <Input id="name" placeholder="John Doe" className="rounded-xl h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t.form.email}</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="rounded-xl h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t.form.subject}</Label>
                  <Input id="subject" placeholder="How can we help?" className="rounded-xl h-12" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t.form.message}</Label>
                  <Textarea id="message" placeholder="Type your message here..." className="rounded-xl min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full h-14 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-primary/20">
                  <Send className="mr-2 h-5 w-5" /> {t.form.send}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
