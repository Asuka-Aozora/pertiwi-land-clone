import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface AboutDescriptionProps {
  descStyle?: string;
  titleUp?: string;
  title?: string;
  descUp?: string;
  description?: string;
  secondDesc?: string;
  linkText?: string;
  linkHref?: string;
}

export function AboutDescription({
  descStyle,
  titleUp,
  title = "Pertiwi Land",
  descUp,
  description = "Pertiwi Land adalah perusahaan properti yang berfokus pada pengembangan kawasan real estate, mencakup hunian dan area komersial, dengan desain modern, kualitas unggul, lingkungan yang nyaman, dan nilai investasi jangka panjang. Kami menghadirkan properti dengan desain arsitektur modern yang mengutamakan estetika, fungsionalitas, dan kenyamanan. Setiap proyek dibangun dengan craftsmanship tinggi dan attention to detail, menggunakan material berkualitas serta tata ruang yang efisien. Selain itu, kami mengembangkan lingkungan yang asri, aman, dan strategis, dilengkapi berbagai fasilitas pendukung untuk menciptakan ruang hidup dan bisnis yang bernilai tinggi serta berkelanjutan.",
  secondDesc,
  linkText,
  linkHref,
}: AboutDescriptionProps) {
  return (
    <section className="py-16 md:py-18 bg-white">
      <div className="container mx-auto px-4">
        <div className={descStyle}>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-8">
            <p className="text-blue-600 font-semibold mb-2 text-3xl">
              {titleUp}
            </p>
            {title}
          </h1>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-10">
            <p className="text-gray-900 font-semibold mb-2 text-xl">{descUp}</p>
            <p className="text-gray-700 leading-relaxed text-justify">
              {description}
              <br />
              <br />
            </p>
            <p className="text-gray-700 leading-relaxed text-justify">
              {secondDesc}
            </p>
          </div>

          {/* CTA Link */}
          {linkHref && linkText && (
            <Link
              href={linkHref}
              className="inline-flex items-center gap-2 text-lg font-semibold text-gray-900 hover:text-[#0d4d2c] transition-colors duration-200 group border-b-2 border-gray-900 hover:border-[#0d4d2c] pb-1"
            >
              {linkText}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// Alternatif dengan Button Style
export function AboutDescriptionAlt({
  title = "Pertiwi Land",
  description = "Pertiwi Land adalah perusahaan properti yang berfokus pada pengembangan kawasan real estate, mencakup hunian dan area komersial, dengan desain modern, kualitas unggul, lingkungan yang nyaman, dan nilai investasi jangka panjang. Kami menghadirkan properti dengan desain arsitektur modern yang mengutamakan estetika, fungsionalitas, dan kenyamanan. Setiap proyek dibangun dengan craftsmanship tinggi dan attention to detail, menggunakan material berkualitas serta tata ruang yang efisien. Selain itu, kami mengembangkan lingkungan yang asri, aman, dan strategis, dilengkapi berbagai fasilitas pendukung untuk menciptakan ruang hidup dan bisnis yang bernilai tinggi serta berkelanjutan.",
  linkText,
  linkHref,
}: AboutDescriptionProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
            {title}
          </h1>

          {/* Description */}
          <div className="prose prose-lg max-w-none mb-10">
            <p className="text-gray-700 leading-relaxed text-justify">
              {description}
            </p>
          </div>

          {/* CTA Button */}
          {linkHref && linkText && (
            <Link
              href={linkHref}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0d4d2c] text-white font-semibold rounded-lg hover:bg-[#0a3d23] transition-all duration-200 shadow-lg hover:shadow-xl group"
            >
              {linkText}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
