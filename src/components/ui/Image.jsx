"use client";
import { cn } from "@/lib/utils";
import NextImage from "next/image.js";
import React from "react";

const colors = {
  none: "",
  white: "bg-white",
};

const Image = (props) => {
  const {
    className,
    color = "none",
    src,
    alt,
    width,
    height,
    ...otherProps
  } = props;
  const [imageError, setImageError] = React.useState(false);

  const handleError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div
        style={{
          width: width || "100%",
          height: height || "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
        }}
        className={cn(className, colors[color])}
      >
        <span>{alt || "Image indisponible"}</span>
      </div>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className, colors[color])}
      onError={handleError}
      {...otherProps}
    />
  );
};

export default Image;
