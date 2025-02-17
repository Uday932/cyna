import clsx from "clsx";

const sizes = {
  title1: "text-5xl",
  title2: "text-3xl",
  text: "text-lg",
  button: "text-2xl",
};

const Text = (props) => {
  const { size = "text", className, children, ...otherProps } = props;

  return (
    <p className={clsx("text-white", sizes[size], className)} {...otherProps}>
      {children}
    </p>
  );
};

export default Text;
