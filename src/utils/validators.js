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

export const stringValidator = (
  label,
  { min = 1, nullable = false, max = undefined } = {},
) => {
  let validator = yup.string();

  if (nullable) {
    validator.nullable();
  }

  validator.min(min, `${label} doit contenir au moins ${min} caractère`);

  if (max !== undefined) {
    validator = validator.max(
      max,
      `${label} doit contenir au max ${max} caractères`,
    );
  }

  if (!nullable) {
    validator = validator.required(`${label} est requis`);
  }

  return validator;
};
