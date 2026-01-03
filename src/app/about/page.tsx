import { AboutDescription } from "@/components/about-us/desc-section";
import { BankPartners } from "@/components/about-us/partners";
import ProjectHighlight from "@/components/about-us/project-highlight";
import { ContactFormSection } from "@/components/home/contact-form-section";
import { HeroSection } from "@/components/home/hero-section";
import Image from "next/image";

const page = () => {
  return (
    <>
      <HeroSection img="/about-us/header.jpg" overlayOpacity="medium" />
      <AboutDescription
        descStyle="max-w-4xl md:max-w-6xl mx-auto"
        title="TerasLand"
        description="Terasland adalah perusahaan properti yang didirikan pada awal tahun 2024 dengan tujuan untuk menghadirkan hunian yang nyaman, modern, dan sesuai dengan kebutuhan masyarakat urban masa kini. Dengan fokus pada pengembangan kawasan yang strategis dan potensi investasi yang tinggi, Terasland berkomitmen untuk memberikan solusi hunian berkualitas bagi masyarakat Indonesia. Sebagai pemain baru di industri properti, Terasland membawa visi segar dan inovatif, dengan mengedepankan desain yang fungsional, lingkungan yang asri, serta harga yang kompetitif. Setiap proyek yang dikembangkan Terasland dirancang untuk memberikan kenyamanan dan nilai tambah bagi penghuni serta menciptakan lingkungan yang harmonis. "
        linkText="Lihat Project TerasLand"
        linkHref="/projects"
      />
      <ProjectHighlight />
      <AboutDescription
        titleUp="TerasLand"
        title="Memberikan Layanan"
        description="Terasland memberikan layanan perencanaan kawasan meliputi siteplan, desain cluster, dan tata ruang yang efisien, design & build dengan kualitas pembangunan terkontrol, manajemen proyek untuk memastikan progres tepat waktu dan sesuai rencana, serta solusi investasi properti dengan skema kepemilikan yang fleksibel bagi konsumen maupun investor.
        "
      />
      <div className="mb-12 mx-auto">
        <div className="relative w-full " style={{ height: "450px" }}>
          <Image
            src="/about-us/hero2.jpg"
            alt="Modern house exterior"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
      <BankPartners />
      <ContactFormSection />
    </>
  );
};

export default page;
