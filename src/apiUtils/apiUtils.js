import config from "@/utils/config.js";
import { scryptSync } from "node:crypto";

export const hashPassword = (password, salt) => {
  const hash = scryptSync(
    password,
    salt,
    config.security.password.hashLength,
  ).toString("hex");

  return `${salt}$${hash}`;
};
