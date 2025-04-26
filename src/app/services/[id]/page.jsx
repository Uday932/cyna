"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import routes from "@/utils/routes.js";
import ServiceCard from "@@/business/ServiceCard.jsx";
import ServiceDetailCard from "@@/business/ServiceDetailCard.jsx";
import Button from "@@/ui/Button.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Service = () => {
  const params = useParams();
  const [service, setService] = useState([]);
  const [serviceSimilar, setServiceSimilar] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const t = useTranslations();

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
          setError(
            error.response.data.error ||
              error.response.data.message ||
              t("form.apiErrors.genericError"),
          );
        } else if (error.request) {
          setError(t("form.apiErrors.offlineError"));
        } else {
          setError(t("form.apiErrors.internalError"));
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
          {t("services.details.returnBackToServices")}
        </Button>
      </div>
    );
  }

  return (
    <div className="m-10 w-full bg-white/15 shadow-lg">
      {service && <ServiceDetailCard service={service} />}

      <div className="m-4 flex flex-col border-t-2 border-white/10 pt-4">
        {serviceSimilar.length > 0 && (
          <>
            <Text
              size="subtitle"
              className="rounded bg-primary/50 text-center font-bold"
            >
              {t("services.details.similarServices")}
            </Text>

            <div className="flex pt-4">
              {serviceSimilar.map((similarService) => (
                <ServiceCard service={similarService} key={similarService.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Service;
