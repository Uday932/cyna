"use client";
import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const CLOUDINARY_BASE_URL = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || "";

const ServiceCarousel = (props) => {
  const { images } = props;
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setIndex((prev) => (prev - 1 + images.length) % images.length);

  const goToImage = (i) => setIndex(i);

  const handleImageLoad = () => setIsLoading(false);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <div className="relative h-[400px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full"
          >
            {isLoading && (
              <motion.div
                key="loader"
                className="absolute inset-0 h-full w-full animate-pulse bg-gray-400"
              />
            )}

            <Image
              key={index}
              src={`${CLOUDINARY_BASE_URL}${decodeURIComponent(images[index].name)}`}
              alt={`Service ${index + 1}`}
              className="absolute inset-0 h-full w-full object-contain lg:object-cover"
              fill
              onLoad={handleImageLoad}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button
          onClick={prevImage}
          className="rounded-full p-2 transition hover:bg-black/50"
        >
          <Image
            width={24}
            height={24}
            src="/icons/left-arrows.svg"
            alt="Précédent"
          />
        </Button>
        <Button
          onClick={nextImage}
          className="rounded-full p-2 transition hover:bg-black/50"
        >
          <Image
            width={24}
            height={24}
            src="/icons/right-arrows.svg"
            alt="Précédent"
          />
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <Button
            color="none"
            key={i}
            onClick={() => goToImage(i)}
            className={`h-1 w-1 rounded-full transition ${
              i === index ? "scale-110 bg-white" : "scale-90 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
