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

const Text = (props) => {
  const {
    as: Tag = "p",
    size = "text",
    color = "white",
    className,
    children,
    ...otherProps
  } = props;

  return (
    <Tag
      className={clsx(
        colors[color],
        sizes[size],
        Tag === "label" && "capitalize",
        className,
      )}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default Text;
