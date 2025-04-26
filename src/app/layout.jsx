import { AppContextProvider } from "@/app/context/AppContext.js";
import Footer from "@@/Footer";
import Navbar from "@@/Navbar";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

export async function generateMetadata() {
  const messages = await getMessages();

  return {
    title: messages.metadata?.title || "Cyna",
    description: messages.metadata?.description || "Page d'accueil",
  };
}

export default async function RootLayout({ children }) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <AppContextProvider>
      <html lang={locale}>
        <head></head>
        <body className="flex min-h-screen flex-col bg-primary">
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="flex flex-grow bg-secondary">{children}</main>
            <Footer />
          </NextIntlClientProvider>
        </body>
      </html>
    </AppContextProvider>
  );
}
