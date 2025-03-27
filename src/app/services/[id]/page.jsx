"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import routes from "@/utils/routes.js";
import ServiceCard from "@@/business/ServiceCard.jsx";
import ServiceDetailCard from "@@/business/ServiceDetailCard.jsx";
import Button from "@@/ui/Button.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Service = () => {
  const params = useParams();
  const [service, setService] = useState([]);
  const [serviceSimilar, setServiceSimilar] = useState([]);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const getService = async () => {
      setService(null);
      setServiceSimilar([]);

      try {
        const { data: serviceData } = await axios.get(
          apiRoutes.services.single(params.id),
        );
        setService(serviceData);

        const category = serviceData.category;

        const { data: similarServices } = await axios.get(
          apiRoutes.services.similar(category),
        );

        const filteredSimilarServices = similarServices.filter(
          (similarService) => similarService.id !== serviceData.id,
        );

        setServiceSimilar(filteredSimilarServices);

        setError(null);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.error || "Une erreur est survenue.");
        } else {
          setError("Impossible de récupérer le service.");
        }
      }
    };

    getService();
  }, [params.id]);

  if (error) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <Text color="error">{error}</Text>
        <Button onClick={() => router.push(routes.services.all())}>
          Retourner à la liste des services
        </Button>
      </div>
    );
  }

  return (
    <div className="m-10 w-full bg-white/15 shadow-lg">
      {service && <ServiceDetailCard service={service} />}

      <div className="m-4 flex flex-col border-t-2 border-white/10 pt-4">
        <Text
          size="subtitle"
          className="rounded bg-primary/50 text-center font-bold"
        >
          Services similaires
        </Text>

        <div className="flex pt-4">
          {serviceSimilar.map((similarService) => (
            <ServiceCard service={similarService} key={similarService.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;
