import Link from 'next/link'
import { Instagram, Facebook, Youtube, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  // Example social links
  const socialLinks = [
    { 
      href: 'https://www.instagram.com/pertiwiland/', 
      icon: Instagram, 
      label: 'Instagram' 
    },
    { 
      href: 'https://www.facebook.com/pertiwiland', 
      icon: Facebook, 
      label: 'Facebook' 
    },
    { 
      href: 'https://www.youtube.com/@pertiwiland', 
      icon: Youtube, 
      label: 'Youtube' 
    },
  ]

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Pertiwi Land</h3>
            <p className="text-sm text-muted-foreground">
              Pengembang real estat terpercaya di Bandung sejak 2011. 
              Menghadirkan hunian berkualitas dengan desain modern dan lokasi strategis.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/about" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Projects
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Hubungi Kami</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  Jl. Salam No.51, RT.01/RW.06, Cihapit, 
                  Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 shrink-0" />
                <a 
                  href="tel:02220526442"
                  className="hover:text-primary transition-colors"
                >
                  022-20526442
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} PT CIPTA INDAH PERTIWI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}