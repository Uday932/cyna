import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import NextLink from "next/link";
import Image from "./Image";

const Link = (props) => {
  const { className, href, title, noUnderline, isMail, ...otherProps } = props;
  const t = useTranslations("common");
  const realHref = typeof href === "function" ? href() : href;
  const isExternal = /^https?:\/\//.test(realHref);

  const style = cn(
    "relative text-white transition-colors duration-300",
    !noUnderline &&
      "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-white after:transition-all after:duration-300 hover:after:w-full ",
    className,
  );

  if (isMail) {
    return (
      <a
        {...otherProps}
        href={`mailto:${realHref}`}
        {...(title ? { "aria-label": title } : {})}
        className={cn(style, "inline-flex items-center")}
      >
        {props.children}
        <Image
          color="white"
          src="/icons/icons_mail.png"
          width={20}
          height={20}
          className="ml-2 rounded"
          alt={t("iconMailto")}
        />
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        {...otherProps}
        href={realHref}
        className={cn(style, "inline-flex items-center")}
        target="_blank"
        rel="noopener noreferrer"
        {...(title ? { "aria-label": title } : {})}
      >
        {props.children}
        <Image
          color="white"
          src="./icons/externalLink.svg"
          width={20}
          height={20}
          className="ml-2 rounded "
          alt={t("iconExternalLink")}
        />
      </a>
    );
  }

  return (
    <NextLink
      {...otherProps}
      href={realHref}
      className={style}
      {...(title ? { "aria-label": title } : {})}
    />
  );
};

export default Link;
