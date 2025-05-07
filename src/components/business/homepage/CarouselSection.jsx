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
    <section className="relative w-full bg-secondary px-4 py-16">
      <Carousel className="w-full">
        <CarouselContent>
          {sortedCarousel.map((item) => (
            <CarouselItem
              key={item.id}
              className="relative h-[400px] lg:h-[500px]"
            >
              {/* Image principale */}
              <div className="absolute inset-0 z-0">
                {item.image?.trim() !== "" && (
                  <Image
                    src={`${CAROUSEL_URL}${decodeURIComponent(item.image)}`}
                    alt={`Image ${item.title}`}
                    className="h-full w-full object-cover"
                    fill={true}
                  />
                )}
              </div>

              {/* Conteneur pour le texte superposé */}
              <div className="absolute inset-0 z-10 flex flex-col justify-center items-start p-8 lg:p-16 bg-black bg-opacity-50">
                <Text
                  size="title"
                  color="white"
                  className="mb-4 font-bold text-xl lg:text-3xl"
                >
                  {item.title}
                </Text>
                <Text
                  size="text"
                  color="white"
                  className="mb-4 text-sm lg:text-base"
                >
                  {item.description}
                </Text>
                <a
                  href={item.link}
                  className="text-white underline hover:text-gray-300"
                >
                  En savoir plus
                </a>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Flèches de navigation */}
        <CarouselPrevious className="left-4 top-1/2 z-20 -translate-y-1/2 bg-black text-white hover:bg-gray-800" />
        <CarouselNext className="right-4 top-1/2 z-20 -translate-y-1/2 bg-black text-white hover:bg-gray-800" />
      </Carousel>
    </section>
  );
}
