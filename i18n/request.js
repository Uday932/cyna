import appConfig from "@/utils/appConfig.js";
import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers.js";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(
    appConfig.locales.cookieName,
  )?.value;

  const defaultLocale = appConfig.locales.defaultLocale;

  let locale = cookieLocale || defaultLocale;

  if (!cookieLocale) {
    const headersList = await headers();
    const acceptLang = headersList.get("accept-language");

    const browserLocale =
      acceptLang?.split(",")[0].slice(0, 2) || defaultLocale;

    locale = appConfig.locales.supportedLocales.includes(browserLocale)
      ? browserLocale
      : defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
