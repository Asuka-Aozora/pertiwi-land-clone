import { createClient } from "@/lib/supabase/server";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ContactFormSection } from "@/components/home/contact-form-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
// import type { Project } from "@/types/database.types";

import { dummyFeaturedProjects } from "@/lib/dummy-projects";




export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured projects
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .eq("status", "available")
    .order("display_order", { ascending: true })
    .limit(6);

  if (error) {
    console.error(error);
  }

    const finalProjects =
      error || !projects || projects.length === 0
        ? dummyFeaturedProjects.slice(0, 2) // fallback
        : (projects).slice(0, 2);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects projects={(finalProjects) || []} />
      <ContactFormSection />
    </main>
  );
}

/**
 * Metadata untuk SEO
 */
export const metadata = {
  title: "Teras Land - Pengembang Properti Terpercaya di Bandung",
  description:
    "Terasland adalah pengembang properti yang berkomitmen menghadirkan hunian modern dengan nilai investasi jangka panjang. Dengan mengutamakan kualitas, transparansi, dan inovasi, kami membangun proyek yang tidak hanya memberikan tempat tinggal, tetapi juga nilai bagi pemilik dan lingkungannya.",
};
