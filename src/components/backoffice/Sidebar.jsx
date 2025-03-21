import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="bg-blue-600 h-screen w-64 p-4 text-white">
      <h2 className="mb-4 text-lg font-bold">Back-Office</h2>
      <ul>
        <li>
          <Link href="/backoffice">Dashboard</Link>
        </li>
        <li>
          <Link href="/backoffice/users">Utilisateurs</Link>
        </li>
        <li>
          <Link href="/backoffice/products">Produits</Link>
        </li>
        <li>
          <Link href="/backoffice/subscriptions">Abonnements</Link>
        </li>
        <li>
          <Link href="/backoffice/settings">Paramètres</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
