import Input from "@/components/ui/Input.jsx";
import appConfig from "@/utils/appConfig.js";
import clsx from "clsx";
import { ErrorMessage, Field } from "formik";

const FormField = (props) => {
  const {
    name,
    className,
    placeholder = "",
    type = "text",
    ...otherProps
  } = props;

  return (
    <div className="flex flex-col">
      <Field name={name}>
        {({ field, meta }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className={clsx(className, {
              "border-red-500": meta.touched && meta.error,
            })}
            {...otherProps}
          />
        )}
      </Field>
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
