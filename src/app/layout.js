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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Arial:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[Avenir LT Std 95 Black], Arial, Helvetica, sans-serif">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
