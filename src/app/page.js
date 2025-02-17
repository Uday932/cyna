import Link from "@/components/ui/Link.jsx";
import Text from "@/components/ui/Text.jsx";
import routes from "@/utils/routes.js";

export default function Home() {
  return (
    <div className="bg-secondary">
      <Text>Page d'accueil</Text>
      <Link href={routes.signs.signUp()}>création de compte</Link>
    </div>
  );
}
