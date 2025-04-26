import Button from "@@/ui/Button.jsx";
import Image from "@@/ui/Image.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { useTranslations } from "next-intl";
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
  const t = useTranslations();

  return (
    <div>
      {label && (
        <Text as="label" className="relative flex flex-col font-semibold">
          {label}
        </Text>
      )}

      <div className="relative flex flex-row">
        {type === "textarea" ? (
          <textarea
            placeholder={placeholder}
            className={clsx(
              "min-h-[100px] w-full resize-y rounded-lg border bg-white p-2 transition-all duration-100 ease-out",
              className,
            )}
            {...otherProps}
          />
        ) : type === "checkbox" ? (
          <input
            placeholder={placeholder}
            type={inputType}
            className={clsx(
              "h-5 w-5 rounded-lg border p-2 checked:accent-button",
              "checked:bg-blue-600",
              className,
            )}
            {...otherProps}
          />
        ) : (
          <input
            placeholder={placeholder}
            type={inputType}
            className={clsx(
              "w-full rounded-lg border bg-white p-2 transition-all duration-300 ease-in-out placeholder:capitalize",
              className,
            )}
            {...otherProps}
          />
        )}

        {type === "password" && (
          <Button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            color="none"
            className="absolute inset-y-0 right-0 flex items-center"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            <Image
              src={
                isPasswordVisible
                  ? "/icons/eye-open.svg"
                  : "/icons/eye-close.svg"
              }
              alt={
                isPasswordVisible
                  ? t("common.hidePassword")
                  : t("common.showPassword")
              }
              className="h-7 w-7"
              width={7}
              height={7}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Input;
