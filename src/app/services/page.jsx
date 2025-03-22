"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import routes from "@/utils/routes.js";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try {
        const { data } = await axios.get(apiRoutes.services.all());
        setServices(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des services:", error);
      }
    };

    getServices();
  }, []);

  return (
    <div className="w-full bg-secondary p-10">
      <Text size="title" className="mb-10 text-center">
        Nos Services
      </Text>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg"
          >
            <Text size="subtitle" className="text-center font-semibold">
              {service.name}
            </Text>
            <Text className="text-gray-700">{service.summary}</Text>
            <Text className="font-bold text-primary">{service.price}€</Text>

            <Link
              className="flex justify-center rounded bg-primary/50"
              href={routes.services.single(service.id)}
              title={`En savoir plus sur le service ${service.name}`}
            >
              En savoir plus
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
