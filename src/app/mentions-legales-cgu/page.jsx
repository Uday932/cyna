"use client";
import LegalSection from "@@/business/LegalSection.jsx";
import Text from "@@/ui/Text.jsx";
import { useTranslations } from "next-intl";

const MentionLegaleEtCGU = () => {
  const t = useTranslations();
  const sections = t.raw("legal.sectionOrder");

  return (
    <div className="flex flex-col gap-y-8 p-10 lg:p-10">
      <Text size="title" className="text-center">
        {t("mentionAndCGU.title")}
      </Text>

      <div className="flex flex-col gap-y-6">
        {sections.map((sectionKey) => (
          <LegalSection key={sectionKey} sectionKey={sectionKey} />
        ))}
      </div>
    </div>
  );
};

export default MentionLegaleEtCGU;
