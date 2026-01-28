import { ContactFormSection } from "@/components/home/contact-form-section";
import { HeroSection } from "@/components/home/hero-section";
import OurProjectSection from "@/components/our-projects/our-project-section";

import { createClient } from "@/lib/supabase/server";

export default async function OurProjectPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <>
      <HeroSection img="/projek-property/fasos.jpeg" overlayOpacity="medium" />
      <OurProjectSection projects={projects || []} />
      <ContactFormSection />
    </>
  );
}
