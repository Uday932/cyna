"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import routes from "@/utils/routes.js";
import Button from "@@/ui/Button.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ValidateAccount = () => {
  const params = useParams();
  const { token } = params || {};
  const [validation, setValidation] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      return;
    }

    const validateToken = async () => {
      try {
        await axios.get(apiRoutes.signs.validate(), {
          params: { token },
        });
        setValidation(true);
        setTimeout(() => {
          router.push(routes.home());
        }, 5000);
      } catch (error) {
        setValidation(false);
      }
    };

    validateToken();
  }, [token]);

  return (
    <div className="bg-secondary flex flex-col gap-2 justify-center items-center w-screen h-screen">
      <Text>
        {validation === null
          ? "Validation en cours..."
          : validation
          ? "Votre compte a été validé avec succès."
          : "Une erreur est survenue lors de la validation de votre compte."}
      </Text>
      {validation && (
        <Button onClick={() => router.push(routes.home())}>
          Aller à la page d'accueil
        </Button>
      )}
    </div>
  );
};

export default ValidateAccount;
