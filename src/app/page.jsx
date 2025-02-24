import Link from "@/components/ui/Link.jsx";
import Text from "@/components/ui/Text.jsx";
import routes from "@/utils/routes.js";

export default function Home() {
  return (
    <div className="bg-secondary p-2">
      <Text>Page d'accueil</Text>
      <Link href={routes.signs.signIn()}>Inscription</Link>
    </div>
  );
}
