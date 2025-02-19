import clsx from "clsx";

const colors = {
  button: "bg-button shadow-md shadow-black", 
  transparent: "bg-transparent",
};

const Button = (props) => {
  const { color = "button", className, ...otherProps } = props;

  return (
    <button
      className={clsx("rounded p-2 text-white", colors[color], className)}
      {...otherProps}
    />
  );
};

export default Button;
