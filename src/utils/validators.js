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

export const textValdator = (label, min = 1, max) => {
  let validator = yup.string().min(min, `${label} doit être >= ${min}`);

  if (max !== undefined) {
    validator = validator.max(max, `${label} doit être <= ${max}`);
  }

  return validator;
};

export const integerValidator = (min = 1) => {
  return yup
    .number()
    .typeError("Doit être un nombre")
    .min(min, `doit être >= ${min}`);
};

export const availabilityValidator = yup
  .mixed()
  .oneOf(Object.values(AVAILABILITY_STATUS), "Statut non valide");
