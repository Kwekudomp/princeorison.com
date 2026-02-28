import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Prince Orison Fashion House",
    default: "Prince Orison Fashion House | Where Craftsmanship Meets Elegance",
  },
  description:
    "Creating refined, contemporary African fashion. Premium kaftans, agbadas, suits, and custom designs crafted in Accra, Ghana.",
  openGraph: {
    siteName: "Prince Orison Fashion House",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
