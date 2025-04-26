import { cn } from "@/lib/utils";
import NextImage from "next/image.js";

const colors = {
  none: "",
  white: "bg-white",
};

const Image = (props) => {
  const { className, color = "none", ...otherProps } = props;

  return (
    <NextImage className={cn(className, "", colors[color])} {...otherProps} />
  );
};

export default Image;
