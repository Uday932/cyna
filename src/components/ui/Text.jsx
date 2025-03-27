import clsx from "clsx";

const sizes = {
  title: "text-4xl uppercase",
  subtitle: "text-3xl capitalize",
  text: "text-lg",
  items: "text-xs",
};

const colors = {
  white: "text-white",
  gray: "text-gray-700",
  black: "text-black",
  success: "text-green-500",
  error: "text-red-500",
};

const fonts = {
  title: "font-bold",
  subtitle: "font-semibold",
  text: "font-normal",
};



const styles = {
  shadow: "shadow-sm",
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

const tag = {
  title: "h1",
  subtitle: "h2",
  text: "p",
  items: "p",
};

const Text = (props) => {
  const {
    as,
    size = "text",
    color = "white",
    style,
    className,
    children,
    ...otherProps
  } = props;

  const Tag = as ?? tag[size] ?? "p";

  return (
    <Tag
      className={clsx(
        colors[color],
        sizes[size],
        fonts[size],
        styles[style],
        className,
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default Text;
