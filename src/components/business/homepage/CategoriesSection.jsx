"use client";
import apiRoutes from "@/apiUtils/apiRoutes";
import routes from "@/utils/routes";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "@@/ui/Image";
import Text from "@@/ui/Text";
import Link from "@@/ui/Link"; // Assurez-vous que ce composant est bien configuré
import { useTranslations } from "next-intl";

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
        <Text size="title" className="mb-12 text-center font-black uppercase">
          {t("home.ourCategories")}
        </Text>
        <div className="grid gap-8 md:grid-cols-3">
          {sortedCategories.map((category) => {
            const content = (
              <div className="relative rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
                <Text color="black" className="mb-2 font-bold">
                  {category.name}
                </Text>
                <Text color="gray" className="text-sm">
                  {category.description}
                </Text>
                {category.image && (
                  <Image
                    src={`${CATEGORIES_URL}${decodeURIComponent(category.image)}`}
                    alt={`Image ${category.name}`}
                    className="mb-4 h-48 w-full rounded-lg object-cover"
                    width={400}
                    height={300}
                  />
                )}
              </div>
            );

            // Rediriger vers la page de détail de la catégorie
            return (
              <Link
                key={category.id}
                href={routes.categories.single(category.id)}
                className="block"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
