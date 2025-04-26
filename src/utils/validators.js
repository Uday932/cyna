import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import * as yup from "yup";

export const firstNameValidator = yup
  .string()
  .min(1, "Le prénom est trop court.")
  .max(30, "Le prénom est trop long.");

export const lastNameValidator = yup
  .string()
  .min(1, "Le nom doit contenir au moins 8 caractères")
  .max(30, "Le nom doit contenir au maximum 30 caractères");

export const emailValidator = yup.string().email("Adresse e-mail invalide");

export const passwordValidator = yup
  .string()
  .matches(/^(?=.*[^\p{L}0-9])(?=.*[0-9])(?=.*\p{Lu})(?=.*\p{Ll}).{8,}$/u, "-"); // Don't change the message for this because it's managed in FormField

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

export const stringValidator = (
  label,
  { min = 1, nullable = false, max = undefined } = {},
) => {
  let validator = yup.string();

  if (nullable) {
    validator.nullable();
  }

  validator.min(min, `${label} must contain at least ${min} characters`);

  if (max !== undefined) {
    validator = validator.max(
      max,
      `${label} must contain at most ${max} characters`,
    );
  }

  if (!nullable) {
    validator = validator.required(`${label} is required`);
  }

  return validator;
};
