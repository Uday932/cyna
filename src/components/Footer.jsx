import routes from "@/utils/routes.js";
import Link from "@@/ui/Link";
import { useTranslations } from "next-intl";
import Image from "./ui/Image";

const Footer = () => {
  const t = useTranslations("footer");

  return (
    <footer className="bg-primary py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <ul className="mb-4 flex flex-col space-x-0 md:mb-0 md:flex-row md:space-x-6">
            <li>
              <Link href={routes.mentionLegalesCgu()}>
                {t("mentionAndCGU")}
              </Link>
            </li>

            <li>
              <Link href={routes.contact()}>Contact</Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/company/cyna-it/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/icons/linkedin.png"
                alt="LinkedIn"
                width={50}
                height={24}
                className="transition-opacity hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
