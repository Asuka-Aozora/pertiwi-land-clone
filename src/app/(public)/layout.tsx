import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import WhatsAppFloating from "@/components/common/WhatsAppFloating";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Navbar />
        {children}
        <div className="flex items-center justify-center p-10">
          <Footer />
        </div>
        <WhatsAppFloating phone={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!} />
    </>
  );
}
