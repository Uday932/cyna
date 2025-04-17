import appConfig from "@/utils/appConfig.js";
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers.js";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(
    appConfig.locales.cookieName,
  )?.value;

  let locale = cookieLocale || "fr";

  if (!cookieLocale) {
    const acceptLang = headers().get("accept-language");
    const browserLocale = acceptLang?.split(",")[0].slice(0, 2) || "fr";
    const supportedLocales = ["fr", "en"];

    locale = supportedLocales.includes(browserLocale) ? browserLocale : "fr";
  }

  return {
    locale,
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
