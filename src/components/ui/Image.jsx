import NextImage from "next/image.js";

const Image = (props) => {
  const { className, ...otherProps } = props;

  return <NextImage className={className} {...otherProps} />;
};

export default Image;
