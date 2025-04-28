import { cn } from "@/lib/utils.js";

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
    label,
    ...otherProps
  } = props;

  return (
    <div>
      {label && (
        <label className={cn("font-semibold capitalize", colors[color])}>
          {label}
        </label>
      )}

      <Tag
        className={cn(
          colors[color],
          sizes[size],
          Tag === "label" && "capitalize",
          className,
        )}
        {...otherProps}
      >
        {children}
      </Tag>
    </div>
  );
};

export default Text;
