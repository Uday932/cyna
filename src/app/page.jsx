"use client";

import Text from "@@/ui/Text";
import TextSection from "@@/business/homepage/TextSection";
import CarouselSection from "@@/business/homepage/CarouselSection";
export default function Home() {
  return (
    <div className="w-full">
      <CarouselSection />
      {/* Section Texte dynamique */}
      <TextSection />

      {/* Categories Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text
            size="title"
            className="mb-12 text-center font-black uppercase text-primary"
          >
            Nos Catégories
          </Text>
          <div className="grid gap-8 md:grid-cols-3">
            {["Catégorie 1", "Catégorie 2", "Catégorie 3"].map((cat, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                <Text color="black" className="mb-4 font-bold">
                  {cat}
                </Text>
                <Text color="gray">Description de la {cat.toLowerCase()}.</Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text
            size="title"
            className="mb-12 text-center font-black uppercase text-primary"
          >
            Les Top services du moment
          </Text>

          <div className="grid gap-8 md:grid-cols-3">
            {["Service 1", "Service 2", "Service 3"].map((srv, index) => (
              <div key={index} className="rounded-lg bg-white p-6 shadow-lg">
                <Text color="black" className="mb-4 font-bold">
                  {srv}
                </Text>
                <Text color="gray">Description du {srv}.</Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
