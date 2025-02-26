import clsx from "clsx";

const colors = {
  button:
    "bg-button active:bg-button/70 transition-transform duration-100 active:scale-95 shadow-md shadow-black",
};

const Button = (props) => {
  const { color = "button", className, ...otherProps } = props;

  return (
    <button
      className={clsx(
        "rounded p-2 text-white first-letter:uppercase",
        colors[color],
        className,
      )}
      {...otherProps}
    />
  );
};

export default Button;
