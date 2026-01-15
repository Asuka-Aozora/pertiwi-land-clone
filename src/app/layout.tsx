import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Poppins } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import WhatsAppFloating from "@/components/common/WhatsAppFloating";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  title: "Teras Land",
  description: "Pengembang Properti Terpercaya di Bandung",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <GoogleTagManager gtmId="GTM-TRQD8MKD" />

      <body className={`${inter.className} ${poppins.variable}`}>
        <Navbar />
        {children}
        <div className="flex items-center justify-center p-10">
          <Footer />
        </div>
        <WhatsAppFloating phone={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!} />
      </body>
    </html>
  );
}
