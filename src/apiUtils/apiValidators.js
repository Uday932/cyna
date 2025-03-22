import * as yup from "yup";

export const idValidator = yup.number().integer().positive();
