"use client";
import apiRoutes from "@/apiUtils/apiRoutes";
import Image from "@@/ui/Image";
import Link from "@@/ui/Link";
import Text from "@@/ui/Text";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const CATEGORIES_URL = process.env.NEXT_PUBLIC_CLOUDINARY_CATEGORIES_URL || "";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const t = useTranslations();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(apiRoutes.categories.all());
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors du fetch des catégories :", error);
      }
    };

    getCategories();
  }, []);

  if (categories.length === 0) return null;

  // Trier les catégories par priorité décroissante
  const sortedCategories = categories.sort((a, b) => {
    const priorityA = a.priority ?? 0;
    const priorityB = b.priority ?? 0;

    return priorityB - priorityA;
  });

  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <Text size="title" className="mb-12 text-center font-black">
          {t("home.ourCategories")}
        </Text>
        <div className="grid gap-8 md:grid-cols-3">
          {sortedCategories.map((category) => (
            <Link key={category.id} href={category.link} className="block">
              <div className="relative rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
                {/* Titre de la catégorie */}
                <Text color="black" className="mb-2 font-bold">
                  {category.name}
                </Text>
                {/* Description de la catégorie */}
                <Text color="gray" className="text-sm">
                  {category.description}
                </Text>
                {/* Image de la catégorie */}
                <Image
                  src={`${CATEGORIES_URL}${decodeURIComponent(category.image)}`}
                  alt={`Image ${category.name}`}
                  className="mb-4 h-48 w-full rounded-lg object-cover" // Augmentez la hauteur (h-48)
                  width={400} // Ajustez selon vos besoins
                  height={300} // Ajustez selon vos besoins
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
