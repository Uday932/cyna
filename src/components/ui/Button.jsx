import clsx from "clsx";

const colors = {
  button:
    "bg-button active:bg-button/70 transition-transform duration-100 active:scale-95 shadow-md shadow-black",
  danger:
    "bg-red-500 active:bg-red-500/70 transition-transform duration-100 active:scale-95 shadow-md shadow-black",
  success:
    "bg-green-500 active:bg-success/70 transition-transform duration-100 active:scale-95 shadow-md shadow-black",
  none: "",
  disabled: "bg-gray-400 text-gray-200 cursor-not-allowed shadow-none",
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
