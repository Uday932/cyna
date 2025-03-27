import Text from "@@/ui/Text.jsx";
import React, { useState } from "react";

const PricingSection = ({ service }) => {
  const [selectedPriceType, setSelectedPriceType] = useState("monthly");

  const prices = {
    monthly: service.monthlyPrice,
    annual: service.annualPrice,
    perUser: service.perUserPrice,
    perDevice: service.perDevicePrice,
  };

  const priceLabels = {
    monthly: " / mois",
    annual: " / an",
    perUser: " / utilisateur (mensuel)",
    perDevice: " / appareil (mensuel)",
  };

  return (
    <div className="flex flex-col gap-2">
      <Text className="">Choisissez une option :</Text>
      <select
        className="rounded-lg bg-secondary p-3 text-white"
        value={selectedPriceType}
        onChange={(e) => setSelectedPriceType(e.target.value)}
      >
        {Object.entries(prices).map(
          ([key, value]) =>
            value && (
              <option key={key} value={key}>
                {value}€{priceLabels[key]}
              </option>
            ),
        )}
      </select>
    </div>
  );
};

export default PricingSection;
