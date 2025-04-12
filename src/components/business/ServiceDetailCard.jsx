"use client";
import AppContext from "@/app/context/AppContext.js";
import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import routes from "@/utils/routes.js";
import { getServiceAvailability } from "@/utils/utils.js";
import PricingSection from "@@/business/PricingSection.jsx";
import ServiceCarousel from "@@/business/ServiceCarousel.jsx";
import Button from "@@/ui/Button.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const formatTextToList = (title = "", text) => {
  if (!text) return null;

  const lines = text.split("\n").filter((line) => line.trim() !== "");

  return (
    <>
      <Text size="subtitle">{title}</Text>
      <ul className="list-disc pl-6">
        {lines.map((line, index) => (
          <Text as="li" key={index} className="">
            {line}
          </Text>
        ))}
      </ul>
    </>
  );
};

const ServiceDetailCard = (props) => {
  const { service } = props;
  const { addToCart } = useContext(AppContext);
  const router = useRouter();

  const handleAddService = () => {
    addToCart(service);
  };

  const { text, color } = getServiceAvailability(service);

  return (
    <div className="flex flex-col xl:flex-row">
      <div className="mx-4 flex flex-col gap-4 border-b-2 border-white/10 p-6 xl:border-b-0 xl:border-r-2">
        <Text
          size="title"
          className="rounded bg-primary/50 p-2 text-center font-bold"
        >
          {service.name}
        </Text>

        {service.images && (
          <ServiceCarousel images={service.images}></ServiceCarousel>
        )}

        <div className="flex flex-col items-start">
          <Text color="white" className={clsx(`rounded px-1`, color)}>
            {text}
          </Text>
          <Text>{service.price}</Text>
        </div>

        <Text>{service.summary}</Text>

        {formatTextToList("Description", service.description)}

        {formatTextToList("Vos avantages", service.companyBenefits)}

        {formatTextToList(
          "Caractéristiques Techniques",
          service.technicalCharacteristics,
        )}
      </div>
      <div className="mt-4 flex flex-col items-center gap-4 px-10 xl:mt-20">
        <PricingSection service={service} />

        <Button
          onClick={handleAddService}
          disabled={service.availability !== AVAILABILITY_STATUS.AVAILABLE}
          color={
            service.availability === AVAILABILITY_STATUS.AVAILABLE
              ? "button"
              : "disabled"
          }
        >
          {service.availability === AVAILABILITY_STATUS.AVAILABLE
            ? "S'ABONNER MAINTENANT"
            : "SERVICE INDISPONIBLE"}
        </Button>

        <Button onClick={() => router.push(routes.services.all())}>
          Retourner à la liste des services
        </Button>
      </div>
    </div>
  );
};

export default ServiceDetailCard;
