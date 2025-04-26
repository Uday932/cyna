"use client";
import Link from "@@/ui/Link.jsx";
import Text from "@@/ui/Text.jsx";
import { useTranslations } from "next-intl";

const makeExternalLink = (linkText = "") => {
  const baseUrl = "https://www.cyna-it.fr";

  let href;

  if (linkText == "mentions") {
    href = `${baseUrl}/mentions-l%C3%A9gales`;
  } else if (linkText == "cyna") {
    href = baseUrl;
  } else if (linkText == "plaintes") {
    href = "https://www.cnil.fr/fr/plaintes";
    return <Link href={href}>https://www.cnil.fr/fr/plaintes</Link>;
  }

  return <Link href={href}>{baseUrl}</Link>;
};

const LegalSection = ({ sectionKey }) => {
  const t = useTranslations(`legal.sections.${sectionKey}`);

  const contentKeys = Object.keys(t.raw("content")).sort();

  const style = "space-y-2";

  return (
    <section>
      <Text className="underline">{t("title")}</Text>
      <div className={style}>
        {contentKeys.map((key) => {
          const content = t.rich(`content.${key}`, {
            u: (text) => (
              <Text as="span" className={"underline"}>
                {text}
              </Text>
            ),
            ul: (children) => (
              <ul className="my-2 list-disc pl-6">{children}</ul>
            ),
            li: (text) => <Text as="li">{text}</Text>,
            l: (link) => makeExternalLink(link),
            a: (email) => (
              <Link isMail href={email}>
                {email}
              </Link>
            ),
          });

          const isList = content?.type === "ul";

          return isList ? (
            <div key={key}>{content}</div>
          ) : (
            <Text key={key}>{content}</Text>
          );
        })}
      </div>
    </section>
  );
};

export default LegalSection;
