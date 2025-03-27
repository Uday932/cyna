import routes from "@/utils/routes.js";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";

const ServiceCard = (props) => {
  const { service } = props;

  return (
    <div
      key={service.id}
      className="flex flex-col gap-4 rounded-lg border border-gray-200/30 p-6 shadow-md transition-transform hover:scale-105 hover:shadow-lg"
    >
      <Text size="subtitle" className="text-center font-semibold">
        {service.name}
      </Text>
      <Text className="text-gray-700">{service.summary}</Text>
      <Text className="font-bold text-primary">
        {service.monthlyPrice
          ? `${service.monthlyPrice}€ / mois`
          : "Tarif non disponible"}
      </Text>
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
