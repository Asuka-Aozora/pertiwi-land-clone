
import { ContactFormSection } from "@/components/home/contact-form-section";
import { HeroSection } from "@/components/home/hero-section";
import OurProjectSection from "@/components/our-projects/our-project-section";


export default function OurProjectPage() {
  return (
    <>
        <HeroSection img="/projek-property/fasos.jpeg" overlayOpacity="medium" />
      <OurProjectSection />
          <ContactFormSection />
    </>
  );
}
