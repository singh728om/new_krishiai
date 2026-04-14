"use client";

export const SocialProofBar = () => {
  const locations = [
    "Wardha", "Nagpur", "Amravati", "Vidarbha", "Marathwada", "Rajasthan", "Punjab", "Andhra Pradesh",
    "Wardha", "Nagpur", "Amravati", "Vidarbha", "Marathwada", "Rajasthan", "Punjab", "Andhra Pradesh"
  ];

  return (
    <div className="py-8 border-y border-border overflow-hidden whitespace-nowrap bg-muted/30">
      <div className="inline-flex animate-marquee-scroll items-center gap-8">
        <span className="text-foreground/30 uppercase tracking-[0.3em] font-headline text-[10px] px-8">
          Trusted by farmers in
        </span>
        {locations.map((loc, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="text-foreground/40 font-headline font-medium tracking-wider">
              {loc}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-krishi-lime/40">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};