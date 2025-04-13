import appConfig from "@/utils/appConfig.js";
import { SignJWT } from "jose";
import { NextResponse } from "next/server.js";
import { scryptSync } from "node:crypto";
import * as yup from "yup";

export const hashPassword = (password, salt) => {
  const hash = scryptSync(
    password,
    salt,
    appConfig.security.password.hashLength,
  ).toString("hex");

  return `${salt}$${hash}`;
};

export const validateRouteData = async (data, schemaFields) => {
  try {
    const schema = yup.object().shape(schemaFields);

    const res = await schema.validate(data, { abortEarly: false });

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Les données fournies sont incorrectes.",
        details: error.errors,
      },
      { status: 400 },
    );
  }
};

export const signJwtToken = async (payload) => {
  const secret = new TextEncoder().encode(appConfig.security.jwt.secret);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(appConfig.security.jwt.expiresIn)
    .sign(secret);

  return jwt;
};
