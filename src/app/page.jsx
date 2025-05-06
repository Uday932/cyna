import CarouselSection from "@@/business/homepage/CarouselSection";
import CategoriesSection from "@@/business/homepage/CategoriesSection";
import TextSection from "@@/business/homepage/TextSection";
import TopServiceSection from "@@/business/homepage/TopServicesSection.jsx";

export default async function Home() {
  return (
    <div className="w-full mb-10">
      <CarouselSection />

      <TextSection />

      <CategoriesSection />

      <TopServiceSection />
    </div>
  );
}
