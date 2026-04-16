"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useSettings } from "@/context/settings-context";
import { 
  Cloud, 
  CloudRain, 
  CloudSun, 
  Sun, 
  Wind, 
  Droplets, 
  MapPin, 
  Search, 
  Thermometer, 
  Calendar as CalendarIcon,
  Loader2,
  CloudLightning,
  CloudSnow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ForecastDay {
  date: string;
  temp: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  wind: number;
  condition: string;
  description: string;
  icon: string;
}

export default function WeatherPage() {
  const { lang } = useSettings();
  const [city, setCity] = useState("Varanasi");
  const [searchInput, setSearchInput] = useState("");
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [currentWeather, setCurrentWeather] = useState<ForecastDay | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "bbd6d9e679a4ff28be7bb2e21988b866";

  const fetchWeatherData = async (targetCity: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch current weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity},IN&appid=${API_KEY}&units=metric`
      );
      const currentData = await currentRes.json();

      if (currentData.cod !== 200) {
        throw new Error(currentData.message);
      }

      setCurrentWeather({
        date: new Date().toLocaleDateString(),
        temp: currentData.main.temp,
        minTemp: currentData.main.temp_min,
        maxTemp: currentData.main.temp_max,
        humidity: currentData.main.humidity,
        wind: currentData.wind.speed,
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
      });

      // Fetch 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${targetCity},IN&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastRes.json();

      if (forecastData.cod !== "200") {
        throw new Error(forecastData.message);
      }

      // OpenWeatherMap gives 5-day forecast with 3-hour intervals. 
      // We filter for daily summaries (roughly 12:00 PM each day).
      const dailyForecast = forecastData.list
        .filter((item: any) => item.dt_txt.includes("12:00:00"))
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString(lang === 'en' ? 'en-US' : 'hi-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }),
          temp: item.main.temp,
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
          humidity: item.main.humidity,
          wind: item.wind.speed,
          condition: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        }));

      setForecast(dailyForecast);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [lang]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      fetchWeatherData(searchInput);
    }
  };

  const WeatherIcon = ({ condition, size = 24, className = "" }: { condition: string, size?: number, className?: string }) => {
    switch (condition) {
      case 'Clear': return <Sun size={size} className={`text-krishi-gold ${className}`} />;
      case 'Rain': return <CloudRain size={size} className={`text-primary ${className}`} />;
      case 'Clouds': return <CloudSun size={size} className={`text-foreground/40 ${className}`} />;
      case 'Thunderstorm': return <CloudLightning size={size} className={`text-primary ${className}`} />;
      case 'Snow': return <CloudSnow size={size} className={`text-blue-300 ${className}`} />;
      default: return <Cloud size={size} className={`text-foreground/20 ${className}`} />;
    }
  };

  const t = {
    title: lang === 'en' ? "Weather Intelligence" : "मौसम इंटेलिजेंस",
    subtitle: lang === 'en' ? "Hyper-local weekly forecast for your farming clusters." : "आपके खेती क्लस्टरों के लिए हाइपर-लोकल साप्ताहिक पूर्वानुमान।",
    searchPlaceholder: lang === 'en' ? "Search city or district (e.g. Varanasi)..." : "शहर या जिला खोजें (जैसे वाराणसी)...",
    current: lang === 'en' ? "Current Condition" : "वर्तमान स्थिति",
    weekly: lang === 'en' ? "Weekly Outlook" : "साप्ताहिक आउटलुक",
    humidity: lang === 'en' ? "Humidity" : "नमी",
    wind: lang === 'en' ? "Wind" : "हवा",
    feelsLike: lang === 'en' ? "Feels Like" : "महसूस होता है",
    high: lang === 'en' ? "High" : "अधिकतम",
    low: lang === 'en' ? "Low" : "न्यूनतम",
    unit: "°C"
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <section className="pt-32 pb-24 container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-display text-foreground">{t.title}</h1>
            <p className="text-xl text-foreground/60 font-body">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <Input 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-12 h-14 rounded-full bg-card border-border shadow-sm focus:ring-primary"
              />
            </div>
            <Button type="submit" size="icon" className="h-14 w-14 rounded-full bg-primary text-white shadow-lg">
              <Search size={20} />
            </Button>
          </form>
        </div>

        {isLoading ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <p className="text-foreground/40 font-headline font-bold uppercase tracking-widest">Fetching Live Data...</p>
          </div>
        ) : error ? (
          <div className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
              <Cloud size={32} />
            </div>
            <h2 className="text-2xl font-headline font-bold">Something went wrong</h2>
            <p className="text-foreground/60 max-w-md">{error}</p>
            <Button onClick={() => fetchWeatherData(city)} variant="outline" className="rounded-full">Try Again</Button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Current Weather Highlight */}
            {currentWeather && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-krishi-black text-white rounded-[3rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 p-12 opacity-5">
                   <Sun size={300} className="animate-spin-slow" />
                </div>
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary/20 text-primary border-primary/30 uppercase tracking-widest px-4 py-1">
                        <MapPin size={14} className="mr-2" />
                        {city}, India
                      </Badge>
                      <span className="text-white/40 text-sm font-code">{currentWeather.date}</span>
                    </div>
                    <div className="flex items-end gap-4">
                       <h2 className="text-8xl md:text-9xl font-display">{Math.round(currentWeather.temp)}{t.unit}</h2>
                       <div className="pb-4">
                          <p className="text-2xl font-headline font-bold text-krishi-gold capitalize">{currentWeather.description}</p>
                          <p className="text-white/40">{t.feelsLike} {Math.round(currentWeather.temp - 2)}°</p>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                       <div className="flex items-center gap-2 text-white/40 text-xs uppercase font-bold tracking-widest">
                         <Droplets size={16} /> {t.humidity}
                       </div>
                       <p className="text-3xl font-display">{currentWeather.humidity}%</p>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-2">
                       <div className="flex items-center gap-2 text-white/40 text-xs uppercase font-bold tracking-widest">
                         <Wind size={16} /> {t.wind} km/h
                       </div>
                       <p className="text-3xl font-display">{currentWeather.wind}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 7-Day / Weekly Grid */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl font-display">{t.weekly}</h3>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {forecast.map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="rounded-3xl border-border bg-card group hover:border-primary/40 transition-all hover:shadow-xl cursor-default">
                      <CardContent className="p-6 text-center space-y-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">{day.date}</p>
                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <WeatherIcon condition={day.condition} />
                        </div>
                        <div className="space-y-1">
                          <p className="text-2xl font-display font-bold">{Math.round(day.temp)}{t.unit}</p>
                          <p className="text-[10px] text-foreground/40 font-bold uppercase">{day.condition}</p>
                        </div>
                        <div className="pt-4 border-t border-border flex justify-between text-[10px] font-bold">
                           <span className="text-primary">{Math.round(day.maxTemp)}°</span>
                           <span className="text-foreground/40">{Math.round(day.minTemp)}°</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
                
                {/* Mock data for remaining days if API gives less than 7 */}
                {Array.from({ length: Math.max(0, 7 - forecast.length) }).map((_, i) => (
                  <div key={`mock-${i}`} className="opacity-40 grayscale pointer-events-none">
                     <Card className="rounded-3xl border-border bg-card">
                        <CardContent className="p-6 text-center space-y-4">
                          <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Next...</p>
                          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto">
                            <Cloud size={24} className="text-foreground/20" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-2xl font-display font-bold">--{t.unit}</p>
                            <p className="text-[10px] text-foreground/40 font-bold uppercase">Pending</p>
                          </div>
                        </CardContent>
                     </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Regional Clusters Map Preview Placeholder */}
            <div className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                <MapPin size={12} />
                Regional Cluster Intelligence
              </div>
              <h2 className="text-4xl font-display">Weather Guard Connectivity</h2>
              <p className="text-foreground/60 max-w-xl mx-auto">
                Our sensor network is currently active across Varanasi, Mirzapur, and Sonbhadra, providing clinical-grade micro-climate data every 15 minutes.
              </p>
              <div className="relative h-64 md:h-96 rounded-[2rem] overflow-hidden bg-muted/50 border border-border">
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="text-center space-y-2">
                     <CalendarIcon size={48} className="mx-auto text-foreground/10" />
                     <p className="text-xs font-bold uppercase tracking-widest text-foreground/20 italic">Cluster Node Map Loading...</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
