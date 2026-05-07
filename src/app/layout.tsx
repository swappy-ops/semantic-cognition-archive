import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Semantic Cognition Archive",
  description: "An exploratory semantic interaction environment investigating rapid associative cognition, recursive systems-thinking, and nonlinear knowledge architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${playfair.variable}`}>
      <body className="antialiased font-sans bg-[#020202] text-[#ebebe3] relative">
        <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]" style={{ filter: "url(#noiseFilter)" }}>
          <svg className="hidden">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
          </svg>
        </div>
        {children}
      </body>
    </html>
  );
}
