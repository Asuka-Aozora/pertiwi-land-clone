
import { ContactFormSection } from "@/components/home/contact-form-section";
import { HeroSection } from "@/components/home/hero-section";
import OurProjectSection from "@/components/test-our-project";


export default function OurProjectPage() {
  return (
    <>
        <HeroSection img="/about-us/header.jpg" overlayOpacity="medium" />
  
      <OurProjectSection />
          <ContactFormSection />
    
    </>
  );
}
