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
  const [errorMessage, setErrorMessage] = useState(null);
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
        setErrorMessage(
          error.response?.data?.message ||
            "Une erreur est survenue lors de la validation de votre compte.",
        );
      }
    };

    validateToken();
  }, [token, router]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Text>
        {validation === null
          ? "Validation en cours..."
          : validation
            ? "Votre compte a été validé avec succès."
            : errorMessage}
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
