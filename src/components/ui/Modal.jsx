import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { useEffect } from "react";

const fits = {
  fit: "h-fit",
  middle: "h-1/2",
  almostAll: "max-h-[70%]",
};

const Modal = (props) => {
  const {
    title = "Modal Title",
    fit = "fit",
    isOpen,
    onClose,
    className,
    errorMessage,
    children,
  } = props;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Escape" &&
        document.activeElement.tagName !== "INPUT"
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-700/70"
      onClick={onClose}
    >
      <div
        className={clsx(
          "z-60 fixed inset-0 mx-auto my-auto w-1/2 rounded-lg lg:w-1/3 xl:w-1/4",

          fits[fit],
          className,
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <Text
          size="subtitle"
          className="rounded-t-lg bg-primary py-2 text-center shadow-lg"
        >
          {title}
        </Text>

        <div className="bg-secondary p-4">{children}</div>

        {errorMessage && (
          <Text color="black" className="py-2 text-center text-red-500">
            {errorMessage}
          </Text>
        )}
      </div>
    </div>
  );
};

export default Modal;
