import { availabilityStatus } from "@/utils/constants.js";

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
