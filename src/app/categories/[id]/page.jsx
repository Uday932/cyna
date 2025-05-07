"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Text from "@@/ui/Text.jsx";
import ServiceCard from "@@/business/ServiceCard.jsx";

const CategoryPage = () => {
  const params = useParams();
  const [category, setCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryAndServices = async () => {
      try {
        setLoading(true);

        const categoryResponse = await axios.get(
          `/api/categories/${params.id}`,
        );
        setCategory(categoryResponse.data);

        const servicesResponse = await axios.get(
          `/api/services?categoryId=${params.id}`,
        );
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
        setError("Une erreur est survenue lors du chargement des données.");
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndServices();
  }, [params.id]);

  if (loading) {
    return (
      <div>
        <Text> Chargement...</Text>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Section catégorie */}
      <div className="mb-12">
        <Text size="title" className="mb-4 font-black">
          {category?.name}
        </Text>
        <Text className="mb-4">{category?.description}</Text>
      </div>

      {/* Section services */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))
        ) : (
          <Text className="text-center">Aucun service disponible.</Text>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
