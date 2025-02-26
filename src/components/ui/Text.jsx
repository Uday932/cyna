import clsx from "clsx";

const sizes = {
  title1: "text-5xl",
  title2: "text-3xl",
  text: "text-lg",
  button: "text-2xl",
};

const colors = {
  white: "text-white",
  gray: "text-gray-700",
  black: "text-black",
};

const tag = {
  title1: "h1",
  title2: "h2",
  text: "p",
};

const Text = (props) => {
  const {
    size = "text",
    color = "white",
    className,
    children,
    ...otherProps
  } = props;

  const Tag = tag[size] || tag.text;

  return (
    <Tag
      className={clsx(
        size === "title1" ? "uppercase" : size === "title2" ? "capitalize" : "",
        colors[color],
        sizes[size],
        className,
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default Text;
