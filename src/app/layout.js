import "./globals.css";

export const metadata = {
  title: "Cyna | Accueil",
  description: "Page d'accueil pour tous vos services en cyber",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
