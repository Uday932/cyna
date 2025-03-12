import Button from "@@/ui/Button.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { useState } from "react";

const Input = (props) => {
  const {
    className,
    placeholder = "",
    label,
    type = "text",
    ...otherProps
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  return (
    <div>
      {label && (
        <Text
          as="label"
          className="relative flex flex-col font-semibold first-letter:uppercase"
        >
          {label}
        </Text>
      )}

      <div className="relative flex flex-row">
        <input
          placeholder={placeholder}
          type={inputType}
          className={clsx(
            "w-full rounded-lg border bg-white p-2 transition-all duration-300 ease-in-out",
            className,
          )}
          {...otherProps}
        />

        {type === "password" && (
          <Button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            color="none"
            className="absolute inset-y-0 right-0 flex items-center"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            <img
              src={
                isPasswordVisible
                  ? "/icons/eye-open.svg"
                  : "/icons/eye-close.svg"
              }
              alt={isPasswordVisible ? "Hide password" : "Show password"}
              className="h-7 w-7"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Input;
