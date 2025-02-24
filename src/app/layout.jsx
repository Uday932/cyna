import { AppContextProvider } from "@/app/context/AppContext.js";
import "./globals.css";

export const metadata = {
  title: "Cyna | Accueil",
  description: "Page d'accueil pour tous vos services en cyber",
};

export default function RootLayout({ children }) {
  return (
    <AppContextProvider>
      <html lang="fr">
        <body>{children}</body>
      </html>
    </AppContextProvider>
  );
}
