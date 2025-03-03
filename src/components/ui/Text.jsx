import clsx from "clsx";

const sizes = {
  title: "text-5xl",
  subtitle: "text-3xl",
  text: "text-lg",
  button: "text-2xl",
};

const colors = {
  white: "text-white",
  gray: "text-gray-700",
  black: "text-black",
};

const Text = (props) => {
  const {
    size = "text",
    color = "white",
    className,
    children,
    ...otherProps
  } = props;

  return (
    <p className={clsx(colors[color], sizes[size], className)} {...otherProps}>
      {children}
    </p>
  );
};

export default Text;
