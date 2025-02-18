import Link from "@@/ui/Link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <ul className="mb-4 flex flex-col space-x-0 md:mb-0 md:flex-row md:space-x-6">
            <li>
              <Link
                href="/mentions-legales"
                className="text-gray-700 hover:text-primary"
              >
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="text-gray-700 hover:text-primary">
                CGU
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-primary"
            >
              Twitter
            </a>
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
