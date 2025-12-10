import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

/**
 * About Us Page
 * Company history, vision, mission, dan values
 */
export default function AboutPage() {
  const milestones = [
    {
      year: "2011",
      title: "Pertiwi Land Didirikan",
      description: "Memulai perjalanan sebagai pengembang properti di Bandung",
    },
    {
      year: "2015",
      title: "5 Proyek Sukses",
      description:
        "Menyelesaikan 5 proyek perumahan dengan kepuasan pelanggan tinggi",
    },
    {
      year: "2020",
      title: "10+ Proyek Terwujud",
      description: "Ekspansi ke berbagai lokasi strategis di Jawa Barat",
    },
    {
      year: "2024",
      title: "13+ Proyek & Terus Berkembang",
      description: "Menjadi pengembang terpercaya dengan reputasi solid",
    },
  ];

  const values = [
    {
      title: "Kualitas Terjamin",
      description: "Material premium dan konstruksi berkualitas tinggi",
    },
    {
      title: "Desain Modern",
      description: "Arsitektur kontemporer dengan tata ruang fungsional",
    },
    {
      title: "Lokasi Strategis",
      description: "Akses mudah ke fasilitas publik dan pusat kota",
    },
    {
      title: "Harga Kompetitif",
      description: "Nilai investasi terbaik dengan skema pembayaran fleksibel",
    },
    {
      title: "After Sales Service",
      description: "Layanan purna jual untuk kepuasan pelanggan",
    },
    {
      title: "Legalitas Lengkap",
      description: "Sertifikat dan dokumen legal terjamin",
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="About Pertiwi Land"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Tentang Kami
            </h1>
            <p className="text-xl text-gray-200">
              Membangun hunian impian dengan integritas, kualitas, dan dedikasi
              sejak 2011
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pertiwi Land
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Pertiwi Land adalah pengembang real estat yang berbasis di
                  Bandung, berdiri sejak 2011 dan telah sukses membangun lebih
                  dari 13 proyek di berbagai lokasi strategis di Jawa Barat.
                </p>
                <p>
                  Kami berkomitmen menghadirkan hunian dengan desain berkelas
                  dan hasil terbaik, mengutamakan kualitas material,
                  craftsmanship, serta tata ruang yang fungsional.
                </p>
                <p>
                  Setiap proyek dirancang untuk memberikan kenyamanan, estetika,
                  dan nilai investasi tinggi, didukung oleh fitur unggulan serta
                  lingkungan yang asri dan strategis, guna menciptakan kehidupan
                  yang lebih berkualitas bagi para penghuni.
                </p>
              </div>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Pertiwi Land Office"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4">Visi</h3>
              <p className="text-muted-foreground">
                Menjadi pengembang properti terdepan di Jawa Barat yang dikenal
                dengan hunian berkualitas, desain inovatif, dan pelayanan
                terpercaya.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4">Misi</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>
                    Menghadirkan hunian berkualitas dengan harga kompetitif
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>Memberikan pelayanan terbaik kepada pelanggan</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" />
                  <span>
                    Menciptakan lingkungan hunian yang asri dan nyaman
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Perjalanan Kami
          </h2>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-semibold mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nilai-Nilai Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-background p-6 rounded-lg border">
                <CheckCircle2 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siap Memiliki Hunian Impian?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hubungi tim kami untuk konsultasi gratis dan temukan properti yang
            sesuai dengan kebutuhan Anda
          </p>
          <Button size="lg" asChild>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi Kami Sekarang
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}

/**
 * SEO Metadata
 */
export const metadata = {
  title: "Tentang Kami - Pertiwi Land",
  description:
    "Pertiwi Land adalah pengembang properti terpercaya di Bandung sejak 2011. Lebih dari 13 proyek sukses dengan komitmen kualitas dan kepuasan pelanggan.",
};
