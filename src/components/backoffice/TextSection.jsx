"use client";
import { useEffect, useState } from "react";
import apiRoutes from "@/apiUtils/apiRoutes";
import Text from "@@/ui/Text";

export default function TextSection() {
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    fetch(apiRoutes.backoffice.textSection())
      .then((res) => res.json())
      .then((data) => setTextData(data))
      .catch((err) => console.error("Erreur chargement texte dynamique", err));
  }, []);

  if (!textData) return null;

  return (
    <section className="w-full bg-secondary px-4 py-16 text-center">
      <Text size="text" className="mb-8">
        {textData.content}
      </Text>
    </section>
  );
}
