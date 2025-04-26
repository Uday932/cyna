import appConfig from "@/utils/appConfig.js";
import { availabilityStatus } from "@/utils/constants.js";
import { decodeJwt, jwtVerify } from "jose";
import { getMessages } from "next-intl/server";

export const getServiceAvailability = (service, t) => {
  if (service.availability === availabilityStatus.MAINTENANCE) {
    return {
      text: t("common.serviceAvailability.temporarilyUnavailable"),
      status: availabilityStatus.MAINTENANCE,
      color: "bg-red-500",
    };
  }

  if (service.availability === availabilityStatus.UNAVAILABLE) {
    return {
      text: t("common.serviceAvailability.notAvailable"),
      status: availabilityStatus.UNAVAILABLE,
      color: "bg-red-500",
    };
  }

  if (service.maxResources - service.usedResources <= 0) {
    return {
      text: t("common.serviceAvailability.outOfStock"),
      status: availabilityStatus.UNAVAILABLE,
      color: "bg-red-500",
    };
  }

  return {
    text: t("common.serviceAvailability.available"),
    status: availabilityStatus.AVAILABLE,
    color: "bg-green-500",
  };
};

export const verifyJwtToken = async (token) => {
  const secret = new TextEncoder().encode(appConfig.security.jwt.secret);
  const { payload } = await jwtVerify(token, secret);

  return payload;
};

export const isJwtExpired = (token) => {
  try {
    const { exp } = decodeJwt(token);

    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const normalizeImageNames = (images) => {
  return images.map((image) => image.replace(/[^\w.-]/g, "_").toLowerCase());
};

export async function getTranslatedMetadata(slug) {
  const messages = await getMessages();

  switch (slug) {
    case "contact":
      return {
        title: messages.contact?.metaTitle || "Contact - Cyna",
        description: messages.contact?.metaDescription || "Contactez-nous.",
      };

    case "services":
      return {
        title: messages.products?.metaTitle || "Nos services",
        description:
          messages.products?.metaDescription || "Cybersécurité à fond.",
      };

    default:
      return {
        title: messages.home?.metaTitle || "Accueil - Cyna",
        description: messages.home?.metaDescription || "Bienvenue chez Cyna.",
      };
  }
}
