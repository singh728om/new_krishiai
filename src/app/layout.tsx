import type {Metadata} from 'next';
import './globals.css';
import { SettingsProvider } from '@/context/settings-context';

export const metadata: Metadata = {
  title: 'KrishiAI | Farming at the speed of light.',
  description: 'AI-powered precision for Bharat. Increase yield by 40%, diagnose diseases in seconds, and unlock carbon credit revenue.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Syne:wght@400..800&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
