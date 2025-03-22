"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import AppContext from "@/app/context/AppContext.js";
import Button from "@/components/ui/Button.jsx";
import routes from "@/utils/routes.js";
import Text from "@@/ui/Text.jsx";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Service = () => {
  const params = useParams();
  const [service, setService] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart, cartItems } = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    const getService = async () => {
      setService(null);

      try {
        const { data } = await axios.get(apiRoutes.services.single(params.id));
        setService(data);
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

  const handleAddToCart = () => {
    addToCart(service);
  };

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
    <div className="w-full p-10">
      {service && (
        <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg p-4 shadow-lg">
          <Text size="subtitle" className="mb-4 bg-primary/50 text-center">
            {service.name}
          </Text>

          <ul>
            {service?.description?.split("\n").map((line, index) => (
              <li key={index} className="text-slate-200">
                {line}
              </li>
            ))}
          </ul>

          {service.price && (
            <Text className="text-lg font-bold">{service.price}€</Text>
          )}
          <Text className="mb-6">
            Ressources disponibles :{" "}
            <span className="font-semibold">{service.maxResources}</span>
          </Text>
          <div className="flex justify-center gap-4">
            <Button onClick={handleAddToCart}>Ajouter dans le panier</Button>
            <Button onClick={() => router.push(routes.services.all())}>
              Retourner à la liste
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
