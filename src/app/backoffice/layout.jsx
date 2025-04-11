"use client";
import Image from "@/components/ui/Image.jsx";
import Link from "@/components/ui/Link.jsx";
import Text from "@/components/ui/Text.jsx";
import { backofficePageTitles } from "@/utils/constants.js";
import routes from "@/utils/routes.js";
import Sidebar from "@@/backoffice/Sidebar";
import { usePathname } from "next/navigation";

const BackOfficeLayout = ({ children }) => {
  const pathname = usePathname();

  const currentPage = Object.values(backofficePageTitles).find(
    (page) => page.pageLink === pathname,
  );

  const title = currentPage ? currentPage.title : "Backoffice";

  const showBackButton = pathname !== routes.backoffice.home();

  const isEditingService = /^\/backoffice\/services\/[^/]+\/edit$/.test(
    pathname,
  );

  const backButtonLink = isEditingService
    ? routes.backoffice.services.all()
    : routes.backoffice.home();

  return (
    <div className="flex w-screen">
      <Sidebar />
      <div className="flex-1 bg-white/50 p-6">
        <div className="mb-5 flex flex-row items-center">
          {showBackButton && (
            <Link
              href={backButtonLink}
              noUnderline
              title="Retour à la page précédente"
              className="rounded-full bg-button p-1"
            >
              <Image
                src="/icons/back-arrow.png"
                width={25}
                height={25}
                alt="Supprimer"
                aria-hidden="true"
              />
            </Link>
          )}

          <div className="flex w-full flex-col items-center">
            <Text size="title">{title}</Text>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BackOfficeLayout;
