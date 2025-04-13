"use client";
import { backofficePageTitles } from "@/utils/constants.js";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";

const BackOffice = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Object.entries(backofficePageTitles)
        .slice(1)
        .map(([_, { title, pageLink }]) => (
          <Link
            key={pageLink}
            href={pageLink}
            noUnderline
            className="rounded-xl border-2 border-white/50 p-2 shadow transition-transform duration-100 ease-out hover:scale-105"
          >
            <Text as="span">{title}</Text>
          </Link>
        ))}
    </div>
  );
};

export default BackOffice;
