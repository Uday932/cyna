import config from "@/utils/config.js";
import jwt from "jsonwebtoken";
import { randomBytes, scryptSync } from "node:crypto";

export const hashPassword = (password) => {
  const salt = randomBytes(config.security.password.saltLength).toString("hex");

  const hash = scryptSync(
    password,
    salt,
    config.security.password.hashLength
  ).toString("hex");

  return `${salt}$${hash}`;
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.security.jwt.secret);
  } catch (error) {
    throw new Error("Token invalide ou expiré");
  }
};
