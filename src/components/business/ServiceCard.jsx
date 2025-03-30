import { availabilityStatus } from "@/utils/constants.js";
import routes from "@/utils/routes.js";
import { getServiceAvailability } from "@/utils/utils.js";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";

const ServiceCard = (props) => {
  const { service } = props;
  const { status, text } = getServiceAvailability(service);

  return (
    <div
      key={service.id}
      className={clsx(
        `flex flex-col gap-4 rounded-lg border border-gray-200/30 p-6 shadow-md transition-transform`,
        status === availabilityStatus.AVAILABLE
          ? "hover:scale-105 hover:shadow-lg"
          : "bg-slate-500",
      )}
    >
      <Text size="subtitle" className="text-center font-semibold">
        {service.name} - {status}
      </Text>
      <Text className="text-gray-700">{service.summary}</Text>
      <Text className="font-bold">
        {service.monthlyPrice
          ? `${service.monthlyPrice}€ / mois`
          : "Tarif non disponible"}
      </Text>

      {status !== availabilityStatus.AVAILABLE && (
        <div className="flex flex-col items-start">
          <Text className="rounded-lg bg-red-500 p-1 font-bold">{text}</Text>
        </div>
      )}

      <Link
        className="flex justify-center rounded bg-primary/50"
        href={routes.services.single(service.id)}
        title={`En savoir plus sur le service ${service.name}`}
      >
        En savoir plus
      </Link>
    </div>
  );
};

export default ServiceCard;
