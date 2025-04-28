import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import * as yup from "yup";

export const firstNameValidator = (t, required = true) => {
  let validator = yup
    .string()
    .min(1, t("validation.firstName.min"))
    .max(30, t("validation.firstName.max"));

  if (required) {
    validator = validator.required(
      t("form.required", { field: t("common.firstName") }),
    );
  }

  return validator;
};

export const lastNameValidator = (t, required = true) => {
  let validator = yup
    .string()
    .min(1, t("validation.lastName.min"))
    .max(30, t("validation.lastName.max"));

  if (required) {
    validator = validator.required(
      t("form.required", { field: t("common.lastName") }),
    );
  }

  return validator;
};

export const emailValidator = (t, required = true) => {
  let validator = yup.string().email(t("validation.email.invalid"));

  if (required) {
    validator = validator.required(
      t("form.required", { field: t("common.email") }),
    );
  }

  return validator;
};

export const passwordValidator = (t, required = true) => {
  let validator = yup
    .string()
    .matches(
      /^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u,
      "-",
    ); // Don't change the warning message, it is managed in FormField

  if (required) {
    validator = validator.required(
      t("form.required", { field: t("common.password") }),
    );
  }

  return validator;
};

export const postalCodeValidator = (t, required = true) => {
  let validator = yup
    .string()
    .matches(/^[0-9]{5}$/, t("validation.postalCode.invalid"));

  if (required) {
    validator = validator.required(
      t("form.required", { field: t("common.postalCode") }),
    );
  }

  return validator;
};

export const mobileValidator = (t, { required = true }) => {
  let validator = yup
    .string()
    .matches(
      /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/,
      t("validation.mobileNumber.invalid"),
    );

  if (required) {
    validator = validator.required(
      t("validation.generic.required", { label: t("common.mobileNumber") }),
    );
  }

  return validator;
};

export const isDefaultValidator = () => {
  return yup.boolean();
};

export const stringValidator = (
  t,
  label,
  { min = 1, max = undefined, required = true } = {},
) => {
  const defaultTranslations = {
    min: `${label} must contain at least ${min} characters.`,
    max: `${label} must contain at most ${max} characters.`,
    required: `${label} is required.`,
  };

  let validator = yup.string();

  if (!required) {
    validator.nullable();
  }

  validator = validator.min(
    min,
    t
      ? t("validation.generic.min", { field: label, min: min })
      : defaultTranslations.min,
  );

  if (max !== undefined) {
    validator = validator.max(
      max,
      t
        ? t("validation.generic.max", { field: label, max: max })
        : defaultTranslations.max,
    );
  }

  if (required) {
    validator = validator.required(
      t
        ? t("validation.generic.required", { field: label })
        : defaultTranslations.required,
    );
  }

  return validator;
};

// BACKOFFICE

export const integerValidator = (min = 1) => {
  return yup
    .number()
    .typeError("Must be a number")
    .min(min, `Must be >= ${min}`);
};

export const availabilityValidator = yup
  .mixed()
  .oneOf(Object.values(AVAILABILITY_STATUS), "Invalid status");
