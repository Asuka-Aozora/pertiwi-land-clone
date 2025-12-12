import Link from "next/link";
import { Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://www.instagram.com/pertiwiland/",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "https://www.tiktok.com/@pertiwiland",
      icon: "tiktok",
      label: "TikTok",
    },
    {
      href: "https://www.facebook.com/pertiwiland",
      icon: Facebook,
      label: "Facebook",
    },
    {
      href: "https://www.youtube.com/@pertiwiland",
      icon: Youtube,
      label: "Youtube",
    },
  ];

  return (

    <footer className="bg-[#6E6E6E] text-white border rounded-xl">
      <div className="container mx-auto px-6 py-12">
        {/* Logo */}
        <div className="mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10  rounded-lg flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-10 w-10"
              />
            </div>
            <span className="text-2xl font-bold">Teras</span>
            <span className="text-2xl">Land</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left Column - Take a Look */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Take a Look</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Visit Our Office */}
              <div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium mb-3 hover:underline"
                >
                  VISIT OUR OFFICE
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Jl. Salam No.51, RT.01/RW.06, Cihapit, Kec. Bandung Wetan,
                  Kota Bandung, Jawa Barat 40114
                </p>
              </div>

              {/* About Us */}
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-medium mb-3 hover:underline"
                >
                  ABOUT US
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <p className="text-sm text-gray-300">
                  Get to know more about Pertiwi Land
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Check us out */}
          <div className="md:border-l md:border-white md:pl-12">
            <h3 className="text-xl font-semibold mb-6">Check us out</h3>

            <div className="mb-6">
              <p className="text-sm text-gray-300 mb-1">Have any questions?</p>
              <p className="text-sm text-gray-300 mb-1">
                Please don't hesitate to
              </p>
              <a
                href="tel:02220526442"
                className="text-sm font-medium hover:underline"
              >
                call at 02220526442
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  {social.icon === "tiktok" ? (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  ) : (
                    <social.icon className="w-5 h-5" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-b border-white py-6">
          <p className="text-sm text-white">
            © Copyright {currentYear} PT CIPTA INDAH PERTIWI
          </p>
        </div>
      </div>
    </footer>
  );
}
