import appConfig from "@/utils/appConfig.js";
import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import Input from "@@/ui/Input.jsx";
import Text from "@@/ui/Text.jsx";
import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

const FormField = (props) => {
  const {
    name,
    className,
    placeholder = "",
    type = "text",
    as,
    label,
    ...otherProps
  } = props;

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
            {Object.entries(AVAILABILITY_STATUS).map(([key, value]) => (
              <option key={key} value={value}>
                {key === "AVAILABLE"
                  ? "Disponible"
                  : key === "UNAVAILABLE"
                    ? "Indisponible"
                    : "Maintenance"}
              </option>
            ))}
          </Field>{" "}
        </>
      ) : (
        <Field name={name}>
          {({ field, meta }) => (
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className={clsx(className, {
                "border-red-500": meta.touched && meta.error,
              })}
              as={as}
              label={label}
              {...otherProps}
            />
          )}
        </Field>
      )}
      <div className="min-h-[25px] text-clip text-sm text-red-500">
        <ErrorMessage name={name}>
          {(msg) => {
            if (msg == "-") {
              return (
                <div>
                  <p>Le mot de passe doit contenir :</p>
                  <ul className="list-disc pl-5">
                    <li>
                      {appConfig.security.password.minLenght} caractères minimum
                    </li>
                    <li>
                      {appConfig.security.password.minNbCapLetter} lettre
                      majuscule
                    </li>
                    <li>{appConfig.security.password.minNbDigit} chiffre</li>
                    <li>
                      {appConfig.security.password.minSpecialCar} caractère
                      spécial
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
