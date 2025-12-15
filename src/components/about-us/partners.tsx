import Image from "next/image";

interface Partner {
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

interface BankPartnersProps {
  title?: string;
  partners?: Partner[];
}

export function BankPartners({
  title = "Bank Partner",
  partners,
}: BankPartnersProps) {
  const defaultPartners: Partner[] = [
    {
      name: "BJB",
      logo: "https://static.wixstatic.com/media/4982e7_f7d4678f2f3d4f2e9a582652b0206b95~mv2.jpg/v1/fit/w_1186,h_244,q_90,enc_avif,quality_auto/4982e7_f7d4678f2f3d4f2e9a582652b0206b95~mv2.jpg",
      width: 160,
      height: 80,
    },
    {
      name: "BSI",
      logo: "https://static.wixstatic.com/media/4982e7_af203fe1eae8446298f19e9bc5272297~mv2.jpg/v1/fit/w_1186,h_244,q_90,enc_avif,quality_auto/4982e7_af203fe1eae8446298f19e9bc5272297~mv2.jpg",
      width: 160,
      height: 80,
    },
    {
      name: "Bank Muamalat",
      logo: "/about-us/bank/bank-muamalat.png",
      width: 160,
      height: 80,
    },
    {
      name: "BTN Syariah ",
      logo: "https://static.wixstatic.com/media/4982e7_6d93c1e8d22b4746bf571066c7f8e82d~mv2.jpg/v1/fit/w_1186,h_244,q_90,enc_avif,quality_auto/4982e7_6d93c1e8d22b4746bf571066c7f8e82d~mv2.jpg",
      width: 160,
      height: 80,
    },
  ];

  const partnerList = partners || defaultPartners;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">{title}</h2>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partnerList.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="relative w-full h-28 md:h-32 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={partner.width || 160}
                  height={partner.height || 80}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
