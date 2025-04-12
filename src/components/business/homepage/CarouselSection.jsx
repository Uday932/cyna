"use client";

import { useEffect, useState } from "react";
import apiRoutes from "@/apiUtils/apiRoutes";
import Text from "@@/ui/Text";
import Image from "@@/ui/Image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@@/ui/Carousel";
import axios from "axios";

const CAROUSEL_URL = process.env.NEXT_PUBLIC_CLOUDINARY_CAROUSEL_URL || "";

export default function CarouselSection() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const getCarouselItems = async () => {
      try {
        const response = await axios.get(apiRoutes.carousel.all());
        setCarouselItems(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch du carrousel :", error);
      }
    };

    getCarouselItems();
  }, []);

  if (carouselItems.length === 0) return null;

  const sortedCarousel = carouselItems.sort((a, b) => {
    const priorityA = a.priority ?? 0;
    const priorityB = b.priority ?? 0;

    return priorityB - priorityA;
  });

  return (
    <section className="relative w-full bg-light px-4 py-16">
      <Carousel className="w-full">
        <CarouselContent>
          {sortedCarousel.map((item) => (
            <CarouselItem key={item.id} className="flex w-full">
              <div className="flex w-full flex-col items-center justify-between gap-8 p-4 lg:flex-row">
                {/* Texte à gauche (ou en haut sur mobile) */}
                <div className="flex-1 p-4 pl-32 text-left">
                  <Text size="text" color="black" className="mb-4 font-bold">
                    {item.title}
                  </Text>
                  <Text size="text" color="gray" className="mb-4">
                    {item.description}
                  </Text>
                  <a href={item.link} className="text-blue-500 underline">
                    En savoir plus
                  </a>
                </div>

                {/* Image à droite (ou en bas sur mobile) */}
                <div className="relative h-64 w-full lg:w-1/2">
                  {item.image?.trim() !== "" && (
                    <Image
                      src={`${CAROUSEL_URL}${decodeURIComponent(item.image)}`}
                      alt={`Image ${item.image}`}
                      className="h-full w-full object-contain"
                      fill={false}
                      width={500}
                      height={300}
                    />
                  )}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Flèches */}
        <CarouselPrevious className="left-4 top-1/2 z-10 -translate-y-1/2 bg-black text-white hover:bg-gray-800" />
        <CarouselNext className="right-4 top-1/2 z-10 -translate-y-1/2 bg-black text-white hover:bg-gray-800" />
      </Carousel>
    </section>
  );
}
