import clsx from "clsx";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        "ml-2 rounded-lg border border-gray-300 px-4 py-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-button",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
