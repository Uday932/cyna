"use client";
import CarouselSection from "@@/business/homepage/CarouselSection";
import CategoriesSection from "@@/business/homepage/CategoriesSection";
import TextSection from "@@/business/homepage/TextSection";
import Text from "@@/ui/Text";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="w-full">
      {/* Carrousel */}
      <CarouselSection />

      {/* Section texte dynamique */}
      <TextSection />

      {/* Section des catégories */}
      <CategoriesSection />

      {/* Section des services */}
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
                <Text color="gray">Description du {srv.toLowerCase()}.</Text>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
