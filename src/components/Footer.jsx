import routes from "@/utils/routes.js";
import Link from "@@/ui/Link";

const Footer = () => {
  return (
    <footer className="bg-primary py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <ul className="mb-4 flex flex-col space-x-0 md:mb-0 md:flex-row md:space-x-6">
            <li>
              <Link href={routes.mentionLegalesCgu()}>
                Mentions légales et CGU
              </Link>
            </li>

            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[primary]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
