"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";

const carouselItems = [
  {
    id: 1,
    image: "test1.jpg",  
    title: "Produit 1",
    description: "Description de la section 1.",
    link: "/link1",
  },
  {
    id: 2,
    image: "test2.jpg",
    title: "Produit 2",
    description: "Description de la section 2.",
    link: "/link2",
  },
  {
    id: 3,
    image: "test3.jpg",
    title: "Produit 3",
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
    <main className="min-h-screen bg-primary">
      {/* Carousel Section */}
      <section className="relative w-full bg-light px-4 py-16">
        <div className="h-64 overflow-hidden flex items-center">
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
              <div className="flex-1 p-4 text-left">
                <Text size="button" color="black" className="mb-4 font-bold">
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
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black p-3 text-white shadow-lg hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Button>
        <Button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black p-3 text-white shadow-lg hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Button>
      </section>
      {/* Fixed Text Section */}
      <section className="w-full bg-secondary px-4 py-16 text-center">
        <Text size="text" className="mb-8">
          Mise à jour régulière des messages importants ou des descriptions
          spécifiques.
        </Text>
      </section>

      {/* Categories Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text
            size="title2"
            className="mb-12 text-center font-black uppercase text-primary"
          >
            Nos Catégories
          </Text>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text size="button" color="black" className="mb-4 font-bold">
                Catégorie 1
              </Text>
              <Text size="text" color="gray">
                Description de la catégorie 1.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Top Products Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <Text
            size="title2"
            className="mb-12 text-center font-black uppercase text-primary"
          >
            Les Top Produits du moment
          </Text>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <Text size="button" color="black" className="mb-4 font-bold">
                Produit 1
              </Text>
              <Text size="text" color="gray">
                Description du produit 1.
              </Text>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
