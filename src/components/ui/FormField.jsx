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
          <>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={clsx("rounded border border-gray-300 p-2", className, {
                "border-red-500": meta.touched && meta.error,
              })}
              {...otherProps}
            />
          </>
        )}
      </Field>
      <div className="min-h-[25px] text-clip text-sm text-red-500">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default FormField;
