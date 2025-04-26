import Text from "@@/ui/Text.jsx";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

const PricingSection = ({ service }) => {
  const [selectedPriceType, setSelectedPriceType] = useState("monthly");
  const t = useTranslations("services.details.detailsCard");
  const format = useFormatter();
  const locale = useLocale();
  const currency = locale === "fr" ? "EUR" : "GBP";

  const prices = {
    monthly: service.monthlyPrice,
    annual: service.annualPrice,
    perUser: service.perUserPrice,
    perDevice: service.perDevicePrice,
  };

  const priceLabels = {
    monthly: t("perMonth"),
    annual: t("perYear"),
    perUser: t("perUser"),
    perDevice: t("perDevice"),
  };

  return (
    <div className="flex flex-col gap-2">
      <Text>{t("chooseAnOption")} :</Text>
      <select
        className="rounded-lg bg-secondary p-3 text-white"
        value={selectedPriceType}
        onChange={(e) => setSelectedPriceType(e.target.value)}
      >
        {Object.entries(prices).map(
          ([key, value]) =>
            value && (
              <option key={key} value={key}>
                {format.number(value, {
                  style: "currency",
                  currency,
                })}
                {` ${priceLabels[key]}`}
              </option>
            ),
        )}
      </select>
    </div>
  );
};

export default PricingSection;
