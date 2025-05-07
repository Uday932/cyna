"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "@@/ui/Image";
import Text from "@@/ui/Text";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// URL Cloudinary pour les images de catégories
const CATEGORIES_URL = process.env.NEXT_PUBLIC_CLOUDINARY_CATEGORIES_URL || "";

export default function CategoryDetailPage({ params }) {
  const [category, setCategory] = useState(null); // État pour stocker les données de la catégorie
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const t = useTranslations(); // Traductions
  const router = useRouter(); // Router pour rediriger en cas d'erreur

  // Utilisation de React.use pour extraire l'ID des paramètres
  const { id } = React.use(params);

  useEffect(() => {

    const fetchCategory = async () => {
      try {
        // Récupération des données de la catégorie via l'API
        const response = await axios.get(`/api/categories/${id}`);
        setCategory(response.data); // Stockez les données dans l'état
      } catch (error) {
        console.error("Erreur lors du chargement de la catégorie :", error);
        router.push("/404"); // Redirection vers la page 404 en cas d'erreur
      } finally {
        setLoading(false); // Arrêtez le chargement
      }
    };

    fetchCategory();
  }, [id]); // Utilisez `id` comme dépendance pour réexécuter l'effet si l'ID change

  if (loading) {
    return <div className="text-center">Chargement...</div>;
  }

  if (!category) {
    return <div className="text-center">Catégorie introuvable.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Section image */}
        <div>
          {category.image && (
            <Image
              src={`${CATEGORIES_URL}${decodeURIComponent(category.image)}`}
              alt={`Image ${category.name}`}
              className="h-full w-full rounded-lg object-cover"
              width={600}
              height={400}
            />
          )}
        </div>

        {/* Section texte */}
        <div>
          <Text size="title" className="mb-4 font-black">
            {category.name}
          </Text>
          <Text color="gray" className="mb-4 text-sm">
            {category.description}
          </Text>
          {category.link && (
            <a href={category.link} target="_blank" rel="noopener noreferrer">
              <button className="rounded bg-primary px-4 py-2 text-white transition hover:bg-opacity-90">
                Voir plus
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
