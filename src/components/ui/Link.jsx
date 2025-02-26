import clsx from "clsx";
import NextLink from "next/link";

const Link = (props) => {
  const { className, href, title, ...otherProps } = props;

  const realHref = typeof href === "function" ? href() : href;
  const isExternal = realHref.startsWith("http");

  return (
    <NextLink
      {...otherProps}
      href={realHref}
      className={clsx(
        "relative text-white transition-colors duration-300",
        "after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:-translate-x-1/2 after:bg-white after:transition-all after:duration-300 hover:after:w-full",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(title ? { "aria-label": title } : {})}
    />
  );
};

export default Link;
