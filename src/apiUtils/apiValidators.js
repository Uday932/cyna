import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import * as yup from "yup";

export const idValidator = yup.number().integer().positive();

export const integerValidator = yup.number().integer("Doit être un entier");

export const numberValidator = (min) => {
  let validator = yup.number();

  if (min !== undefined) {
    validator = validator.min(min, `La valeur doit être >= ${min}`);
  }

  return validator;
};

export const stringValidator = (
  label,
  { min = 1, nullable = false, max = undefined } = {},
) => {
  let validator = yup.string();

  if (nullable) {
    validator.nullable();
  }

  validator = validator.min(min, `${label} doit être >= ${min}`);

  if (max !== undefined) {
    validator = validator.max(max, `${label} doit être <= ${max} caractères`);
  }

  if (!nullable) {
    validator = validator.required(`${label} est requis`);
  }

  return validator;
};

export const availabilityValidator = yup
  .mixed()
  .oneOf(Object.values(AVAILABILITY_STATUS), "Statut non valide");

export const imagesValidator = yup
  .array()
  .of(yup.string().required("Chaque image doit avoir un nom"))
  .nullable()
  .default([]);

export const startDateTopService = yup
  .date()
  .typeError("Start date must be a valid date");

export const endDateTopService = yup
  .date()
  .nullable()
  .typeError("End date must be a valid date");
