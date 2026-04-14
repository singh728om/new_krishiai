"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Counter = ({ value, suffix = "", delay = 0 }: { value: string | number, suffix?: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
      const duration = 2000;
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-6xl md:text-7xl font-display text-krishi-gold">
      {count}{suffix}
    </div>
  );
};

export const Stats = () => {
  const stats = [
    { value: 40, suffix: "%", label: "Yield increase" },
    { value: 3, suffix: " sec", label: "Disease diagnosis time" },
    { value: 10000, suffix: "+", label: "Farmers served" },
    { value: 4.8, suffix: "Cr", label: "Carbon credits earned (₹)" },
  ];

  return (
    <section className="py-24 bg-muted/20 border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-sm font-headline font-bold uppercase tracking-widest text-foreground/60">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};