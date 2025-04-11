import appConfig from "@/utils/appConfig.js";
import { availabilityStatus } from "@/utils/constants.js";
import { decodeJwt, jwtVerify } from "jose";

export const getServiceAvailability = (service) => {
  if (service.availability === availabilityStatus.MAINTENANCE) {
    return {
      text: "Service momentanément indisponible",
      status: availabilityStatus.MAINTENANCE,
      color: "bg-red-500",
    };
  }

  if (service.availability === availabilityStatus.UNAVAILABLE) {
    return {
      text: "Service non disponible",
      status: availabilityStatus.UNAVAILABLE,
      color: "bg-red-500",
    };
  }

  if (service.maxResources - service.usedResources <= 0) {
    return {
      text: "Stock épuisé",
      status: availabilityStatus.UNAVAILABLE,
      color: "bg-red-500",
    };
  }

  return {
    text: "Disponible immédiatement",
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
