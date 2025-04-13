import Link from "next/link";
import routes from "@/utils/routes";

const Sidebar = () => {
  return (
    <div className="bg-blue-600 h-screen w-64 p-4 text-white">
      <h2 className="mb-4 text-lg font-bold">Back-Office</h2>
      <ul>
        <li>
          <Link href={routes.backoffice.homepage.home()}>Homepage</Link>
        </li>
        <li>
          <Link href={routes.backoffice.dashboard()}>Dashboard</Link>
        </li>
        <li>
          <Link href={routes.backoffice.users()}>Utilisateurs</Link>
        </li>
        <li>
          <Link href={routes.backoffice.services()}>Services</Link>
        </li>
        <li>
          <Link href={routes.backoffice.subscriptions()}>Abonnements</Link>
        </li>
        <li>
          <Link href={routes.backoffice.settings()}>Paramètres</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
