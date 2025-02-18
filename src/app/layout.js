import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Cyna | Accueil",
  description: "Page d'accueil pour tous vos services en cyber",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head></head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
