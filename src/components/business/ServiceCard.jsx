import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import routes from "@/utils/routes.js";
import { getServiceAvailability } from "@/utils/utils.js";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { useFormatter, useLocale, useTranslations } from "next-intl";

const ServiceCard = (props) => {
  const { service } = props;
  const t = useTranslations();
  const { status, text } = getServiceAvailability(service, t);
  const format = useFormatter();
  const locale = useLocale();
  const currency = locale === "fr" ? "EUR" : "GBP";

  return (
    <div
      key={service.id}
      className={clsx(
        `flex flex-col gap-4 rounded-lg border border-gray-200/30 p-6 shadow-md transition-transform`,
        status === AVAILABILITY_STATUS.AVAILABLE
          ? "hover:scale-105 hover:shadow-lg"
          : "bg-slate-500",
      )}
    >
      <Text size="subtitle" className="text-center font-semibold">
        {service.name}
      </Text>
      <Text className="text-gray-700">{service.summary}</Text>
      <Text className="font-bold">
        {service.monthlyPrice
          ? `${format.number(service.monthlyPrice, {
              style: "currency",
              currency,
            })} ${t("services.card.byMonth")}`
          : t("services.card.priceNotAvailable")}
      </Text>
      {status !== AVAILABILITY_STATUS.AVAILABLE && (
        <div className="flex flex-col items-start">
          <Text className="rounded-lg bg-red-500 p-1 font-bold">{text}</Text>
        </div>
      )}

      <Link
        className="flex justify-center rounded bg-primary/50"
        href={routes.services.single(service.id)}
        title={`${t("services.card.learnMoreLinkTitle")} ${service.name}`}
      >
        {t("services.card.learnMore")}
      </Link>
    </div>
  );
};

export default ServiceCard;
