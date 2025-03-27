"use client";

import Button from "@@/ui/Button";
import Text from "@@/ui/Text";
import TextSection from "@/components/backoffice/TextSection";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image.js";
import { useState } from "react";

const carouselItems = [
  {
    id: 1,
    image: "test1.jpg",
    title: "service 1",
    description: "Description de la section 1.",
    link: "/link1",
  },
  {
    id: 2,
    image: "test2.jpg",
    title: "service 2",
    description: "Description de la section 2.",
    link: "/link2",
  },
  {
    id: 3,
    image: "test3.jpg",
    title: "service 3",
    description: "Description de la section 3.",
    link: "/link3",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));

  return (
    <div className="w-full">
      {/* Carousel Section */}
      <section className="relative w-full bg-light px-4 py-16">
        <div className="flex h-64 items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={carouselItems[current].id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex w-full"
            >
              {/* Text Section */}
              <div className="flex-1 p-4 pl-20 text-left">
                <Text size="text" color="black" className="mb-4 font-bold">
                  {carouselItems[current].title}
                </Text>
                <Text size="text" color="gray" className="mb-4">
                  {carouselItems[current].description}
                </Text>
                <a
                  href={carouselItems[current].link}
                  className="text-blue-500 underline"
                >
                  En savoir plus
                </a>
              </div>
              {/* Image Section */}
              <div className="flex-1">
                <img
                  src={carouselItems[current].image}
                  alt={carouselItems[current].title}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Navigation */}
        <Button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black p-3 shadow-lg hover:bg-gray-800"
        >
          <Image
            width={24}
            height={24}
            src="/icons/left-arrows.svg"
            alt="Précédent"
          />
        </Button>

        <Button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black p-3 shadow-lg hover:bg-gray-800"
        >
          <Image
            width={24}
            height={24}
            src="/icons/right-arrows.svg"
            alt="Suivant"
          />
        </Button>
      </section>
      {/* Fixed Text Section */}
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
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                Catégorie 1
              </Text>
              <Text color="gray">Description de la catégorie 1.</Text>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                Catégorie 2
              </Text>
              <Text color="gray">Description de la catégorie 2.</Text>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                Catégorie 3
              </Text>
              <Text color="gray">Description de la catégorie 3.</Text>
            </div>
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
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                service 1
              </Text>
              <Text color="gray">Description du service 1.</Text>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                service 2
              </Text>
              <Text color="gray">Description du service 2.</Text>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text color="black" className="mb-4 font-bold">
                service 3
              </Text>
              <Text color="gray">Description du service 3.</Text>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
