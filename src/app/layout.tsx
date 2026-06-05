import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  title: "Compare Trusted Man & Van Companies Near You | Man & Van Club",
  description: "Get up to 5 quotes from vetted local movers. Compare prices, reviews and availability in minutes.",
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
        
        {/* Mobile Sticky CTA */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border z-50">
          <a href="/#quote-form" className="btn-orange w-full block">
            Get Free Quotes
          </a>
        </div>
      </body>
    </html>
  );
}
