# **App Name**: KrishiAI

## Core Features:

- Global Navigation: Sticky navigation bar featuring brand wordmark with gold accent, core product links, and 'Login'/'Start Free' call-to-action buttons, optimized for mobile with a slide-down menu.
- Hero Showcase with AI Visuals: Full-viewport hero section presenting the 'Farming at the speed of light.' tagline, calls to action, and a live-updating animated 'crop health' data terminal mock-up to simulate AI data readouts.
- Integrated Feature Grid: An interactive bento grid highlighting six key platform features such as 'Disease Diagnostics' (demonstrating Gemini Vision AI capabilities through a mock interface), 'Market Alpha' with sparkline charts, and 'Carbon Economy' with an animated gauge, utilizing SVG animations and CSS-drawn mockups.
- Interactive Diagnostics Tool Demo: A dedicated interactive demo showcasing the instant leaf-level pathology feature by allowing users to simulate photo uploads and receive an AI-generated diagnosis with confidence levels and remedial advice in English and Hindi, powered purely by front-end state.
- Land Lease Program: A section detailing the land leasing program with guaranteed income benefits, showcasing key features through a 2x2 grid of 'feature pills' and an active cluster card with progress.
- Harit Store Product Preview: A preview of the Harit Store with a horizontal-scrolling product carousel, featuring sample organic products with cluster badges, ratings, pricing, and buy now options.
- Impact Metrics and Testimonials: Dedicated sections for 'Impact by the numbers' with animated counters highlighting key achievements, and farmer testimonials presented in both English and Devanagari, complete with location and quote details.

## Style Guidelines:

- Dark-first design scheme, primarily utilizing '--krishi-black' (#0A0A08) and '--krishi-mist' (#1A1F16) for background sections, providing a warm, near-black foundation.
- Primary accent color: Krishi Gold (#D4A017) to denote prestige and highlight interactive elements, echoing turmeric.
- Secondary accent colors: Krishi Lime (#8CC63F) for indicators of growth and health, and Krishi Amber (#FF6B2C) for high-impact call-to-action buttons.
- Supporting colors include Krishi Soil (#2C1A0E) for earthy undertones and Krishi Cream (#F5F0E8) for light, readable text on dark backgrounds.
- Hero text: 'Playfair Display' (serif) for significant gravitas and elegance. Note: currently only Google Fonts are supported.
- Headings: 'Syne' (geometric sans-serif) for a modern, bold aesthetic in section titles. Note: currently only Google Fonts are supported.
- Body text: 'Instrument Sans' (sans-serif) chosen for its readability and neutral character in extensive content. Note: currently only Google Fonts are supported.
- Code and data readouts: 'JetBrains Mono' (monospace sans-serif) to simulate a technical, terminal-like display for AI information. Note: currently only Google Fonts are supported.
- Exclusive use of CSS-drawn UI elements, SVG illustrations, and colored placeholder blocks. All icons for features, such as the stylized leaf for diagnostics or the network graph for FPO Global, are custom SVGs.
- A subtle leaf glyph (SVG) used as a separator in the social proof bar and gold accent dots integrated into the KrishiAI wordmark.
- Mobile-first responsive design implemented across all sections, ensuring optimal viewing and interaction on various device sizes with minimum tap targets of 44px.
- A custom styled scrollbar featuring a thin gold thumb on a dark track to maintain brand aesthetics throughout the scrolling experience.
- Predominant use of large border radii (rounded-xl/rounded-2xl, no less than 8px) on all interactive and display elements for a soft, modern feel.
- All interactive elements will have a 'focus-visible' ring in '--krishi-gold' for enhanced accessibility.
- Comprehensive use of Framer Motion for all UI transitions, including consistent 'whileInView' entrance animations for sections (opacity fade and subtle y-axis translation).
- Dynamic element animations such as staggered word reveals for hero headlines, subtle fades and slides for component entrances, auto-scrolling marquee for social proof, and animated counters for statistics.
- Subtle visual enhancements include a 4% opacity SVG noise grain texture overlay on key dark sections, very slow-moving CSS gradient blobs in the pricing section, and a custom gold dot cursor that follows the mouse on desktop.