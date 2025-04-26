"use client";
import apiRoutes from "@/apiUtils/apiRoutes";
import Text from "@@/ui/Text";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TextSection() {
  const [textData, setTextData] = useState(null);

  useEffect(() => {
    const getCarouselItems = async () => {
      try {
        const response = await axios.get(apiRoutes.textSection());
        setTextData(response.data);
      } catch (error) {
        setTextData(null);
      }
    };

    getCarouselItems();
  }, []);
  if (!textData) return null;

  return (
    <section className="w-full bg-secondary px-4 py-16 text-center">
      <div className="flex flex-col items-center">
        <Text
          size="subtitle"
          className="mb-8 rounded-lg p-2 shadow-lg border-2 border-gray-200/30"
        >
          {textData.content}
        </Text>
      </div>
    </section>
  );
}
