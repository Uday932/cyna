"use client";
import apiRoutes from "@/apiUtils/apiRoutes.js";
import routes from "@/utils/routes.js";
import Button from "@@/ui/Button.jsx";
import Text from "@@/ui/Text";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ValidateAccount = () => {
  const params = useParams();
  const { token } = params || {};
  const [validation, setValidation] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const t = useTranslations();

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

        if (error.response) {
          setErrorMessage(
            error.response.data.error ||
              error.response.data.message ||
              t("form.apiErrors.genericError"),
          );
        } else if (error.request) {
          setErrorMessage(t("form.apiErrors.offlineError"));
        } else {
          setErrorMessage(t("form.apiErrors.internalError"));
        }
      }
    };

    validateToken();
  }, [token, router]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <Text>
        {validation === null
          ? t("signs.validate.inProgress")
          : validation
            ? t("signs.validate.success")
            : errorMessage}
      </Text>
      {validation && (
        <Button onClick={() => router.push(routes.home())}>
          {t("signs.validate.returnHomePage")}
        </Button>
      )}
    </div>
  );
};

export default ValidateAccount;
