import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans"
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["600", "700"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "Find Trusted Local Movers Near You | Man & Van Club",
  description: "Get exclusively matched with vetted local movers. Verified move requests and secure introductions.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${poppins.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        
        {/* Mobile Sticky CTA */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-border z-[200]">
          <a href="/#quote-form" className="btn-orange w-full block py-4 text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl">
            Get Matched Now
          </a>
        </div>
      </body>
    </html>
  );
}
