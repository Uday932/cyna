import { backofficePageTitles } from "@/utils/constants.js";
import routes from "@/utils/routes";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";

const Sidebar = () => {
  return (
    <div className="w-auto bg-secondary p-4">
      <Link href={routes.backoffice.home()}>
        <Text as="span" size="subtitle">
          Back-Office
        </Text>
      </Link>

      <ul className="mt-2 flex flex-col gap-2">
        {Object.entries(backofficePageTitles)
          .slice(1)
          .map(([_, { title, pageLink }]) => (
            <li key={pageLink}>
              <Link href={pageLink}>{title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
