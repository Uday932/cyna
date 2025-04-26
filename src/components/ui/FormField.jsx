import appConfig from "@/utils/appConfig.js";
import Input from "@@/ui/Input.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { ErrorMessage, Field } from "formik";
import { useTranslations } from "next-intl";

const FormField = (props) => {
  const {
    name,
    className,
    placeholder = "",
    type = "text",
    as,
    label,
    children,
    ...otherProps
  } = props;

  const t = useTranslations("password");

  return (
    <div className="flex flex-col">
      {as === "select" ? (
        <>
          <Text as="label" htmlFor="availability">
            {label}
          </Text>
          <Field
            as="select"
            name="availability"
            className="rounded-lg border p-3"
          >
            {children}
          </Field>
        </>
      ) : (
        <Field name={name}>
          {({ field, meta }) => (
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={clsx(
                "placeholder:capitalize placeholder:italic",
                className,
                {
                  "border-red-500": meta.touched && meta.error,
                },
              )}
              as={as}
              label={label}
              {...otherProps}
            />
          )}
        </Field>
      )}
      <div className="min-h-[25px] text-clip text-sm text-red-500 first-letter:uppercase">
        <ErrorMessage name={name}>
          {(msg) => {
            if (msg == "-") {
              return (
                <div>
                  <p>{t("rules")}</p>
                  <ul className="list-disc pl-5">
                    <li>
                      {t("minLength", {
                        count: appConfig.security.password.minLenght,
                      })}
                    </li>
                    <li>
                      {t("minCapLetter", {
                        count: appConfig.security.password.minNbCapLetter,
                      })}
                    </li>
                    <li>
                      {t("minDigit", {
                        count: appConfig.security.password.minNbDigit,
                      })}
                    </li>
                    <li>
                      {t("minSpecialChar", {
                        count: appConfig.security.password.minSpecialCar,
                      })}
                    </li>
                  </ul>
                </div>
              );
            } else {
              return msg;
            }
          }}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default FormField;
