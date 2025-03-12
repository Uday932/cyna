import clsx from "clsx";

const sizes = {
  title: "text-5xl uppercase",
  subtitle: "text-3xl capitalize",
  text: "text-lg",
};

const colors = {
  white: "text-white",
  gray: "text-gray-700",
  black: "text-black",
  success: "text-green-500",
};

const tag = {
  title: "h1",
  subtitle: "h2",
  text: "p",
};

const Text = (props) => {
  const {
    as,
    size = "text",
    color = "white",
    className,
    children,
    ...otherProps
  } = props;

  const Tag = as ?? tag[size] ?? "p";

  console.log(Object.keys(sizes));
  return (
    <Tag
      className={clsx(colors[color], sizes[size], className)}
      {...otherProps}
    >
      {children}
    </Tag>
  );
};

export default Text;
