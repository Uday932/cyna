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
} from "@@/ui/carousel";

export default function CarouselSection() {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    fetch(apiRoutes.backoffice.carousel())
      .then((res) => res.json())
      .then((data) => setCarouselItems(data))
      .catch((error) =>
        console.error("Erreur lors du fetch du carrousel :", error),
      );
  }, []);

  if (carouselItems.length === 0) return null;

  return (
    <section className="relative w-full bg-light px-4 py-16">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselItems.map((item) => (
            <CarouselItem key={item.id} className="flex w-full">
              {/* Texte à gauche */}
              <div className="flex-1 p-4 pl-20 text-left">
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

              {/* Image à droite */}
              <div className="flex-1">
                {item.image?.trim() !== "" && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                )}
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
