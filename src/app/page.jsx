"use client";

import CarouselSection from "@@/business/homepage/CarouselSection";
import TextSection from "@@/business/homepage/TextSection";
import Text from "@@/ui/Text";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="w-full">
      <CarouselSection />
      <TextSection />

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text size="title" className="mb-12 text-center font-black">
            {t("ourCategories")}
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

      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text size="title" className="mb-12 text-center font-black">
            {t("topServices")}
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
