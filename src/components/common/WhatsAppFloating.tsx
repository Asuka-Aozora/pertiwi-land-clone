"use client";

import Link from "next/link";
import Image from "next/image";

interface WhatsAppFloatingProps {
  phone: string; // format: 628xxxxxxxxxx
  message?: string;
}

export default function WhatsAppFloating({
  phone,
  message = "Halo, saya tertarik dengan project Teras Land",
}: WhatsAppFloatingProps) {
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <Link
      href={waLink}
      target="_blank"
      aria-label="Chat WhatsApp"
      className="
        fixed z-50
        bottom-5 right-5
        md:bottom-8 md:right-8

        flex items-center justify-center
        w-14 h-14
        rounded-full
        bg-green-500
        shadow-lg

        hover:scale-110 hover:shadow-xl
        transition-transform duration-300

        md:hidden
      "
    >
      <Image
        src="/icons/whatsapp.png"
        alt="WhatsApp"
        width={28}
        height={28}
              priority
              className="text-white "
      />
    </Link>
  );
}
