import config from "@/utils/config.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server.js";
import { scryptSync } from "node:crypto";
import * as yup from "yup";

export const hashPassword = (password, salt) => {
  const hash = scryptSync(
    password,
    salt,
    config.security.password.hashLength,
  ).toString("hex");

  return `${salt}$${hash}`;
};

export const getTokenData = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Token manquant" }, { status: 400 });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config.security.jwt.secret);
  } catch (jwtError) {
    console.error("JWT verification error:", jwtError);

    return NextResponse.json({ error: "Token invalide" }, { status: 400 });
  }

  return decodedToken;
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
