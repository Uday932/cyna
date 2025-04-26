"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import ServiceCard from "@@/business/ServiceCard.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(apiRoutes.services.all());
        if (Array.isArray(data)) {
          setServices(data);
        } else {
          setServices([]);
        }
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
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  return (
    <div className="w-full bg-secondary p-10">
      <Text size="title" className="mb-10 text-center">
        {t("services.title")}
      </Text>

      {loading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-lg bg-gray-300"
            ></div>
          ))}
        </div>
      ) : error ? (
        <Text className="text-center text-red-500">{error}</Text>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.length > 0 ? (
            services.map((service) => {
              return (
                <ServiceCard service={service} key={service.id}></ServiceCard>
              );
            })
          ) : (
            <Text className="text-center">{t("services.noServices")}</Text>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;
