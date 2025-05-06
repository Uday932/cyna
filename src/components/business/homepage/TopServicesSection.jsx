"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import routes from "@/utils/routes.js";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const TopServiceSection = () => {
  const [topServices, setTopServices] = useState([]);
  const [error, setError] = useState(null);
  const t = useTranslations("home");

  useEffect(() => {
    const getTopServices = async () => {
      try {
        const { data } = await axios(apiRoutes.services.top.all());
        setTopServices(data);
      } catch (error) {
        if (error) {
          setError(
            error.response.data.error ||
              error.response.data.message ||
              t("topServicesError"),
          );
        } else {
          setError(t("topServicesError"));
        }
      }
    };

    getTopServices();
  }, []);

  return (
    <section>
      {error && (
        <Text className="flex justify-center" color="error">
          {error}
        </Text>
      )}

      {topServices.length > 0 && (
        <div className="container mx-auto px-4">
          <Text size="title" className="mb-12 text-center font-black">
            {t("topServices")}
          </Text>

          <div className="flex flex-wrap gap-4 justify-center">
            {topServices.map((topService, i) => (
              <Link
                href={routes.services.single(topService.serviceId)}
                noUnderline
                key={i}
                className="flex flex-col gap-2 rounded-lg bg-white p-6 shadow-lg max-w-[500px]"
              >
                <Text color="black" className="font-bold">
                  {topService.service.name}
                </Text>
                <Text color="gray">{topService.service.summary}</Text>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TopServiceSection;
