import { AppContextProvider } from "@/app/context/AppContext.js";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: {
    default: "Cyna | Accueil",
  },
  description: "Page d'accueil pour tous vos services en cyber",
};

export default function RootLayout({ children }) {
  return (
    <AppContextProvider>
      <html lang="fr">
        <head></head>
        <body className="flex min-h-screen flex-col bg-primary">
          <Navbar />
          <main className="flex flex-grow bg-secondary">{children}</main>
          <Footer />
        </body>
      </html>
    </AppContextProvider>
  );
}
