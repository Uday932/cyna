import * as yup from "yup";

export const idValidator = yup.number().integer().positive();

export const categoryValidator = yup.string();
