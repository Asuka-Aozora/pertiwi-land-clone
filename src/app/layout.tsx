import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Poppins } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TRQD8MKD');
        `}</Script>
        {/* End Google Tag Manager */}
      </head>

      <body className={`${inter.className} ${poppins.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRQD8MKD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Navbar />
        {children}
        <div className="flex items-center justify-center p-10">
          <Footer />
        </div>
        <WhatsAppFloating
          phone={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!}
        />
      </body>
    </html>
  );
}
