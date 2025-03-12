import { hashPassword } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import config from "@/utils/config.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server.js";
import { randomBytes } from "node:crypto";

const handler = {
  PATCH: async (request) => {
    try {
      const body = await request.json();
      const { oldPassword, newPassword } = body;

      const authHeader = request.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return NextResponse.json({ error: "Token manquant" }, { status: 400 });
      }

      let decoded;

      try {
        decoded = jwt.verify(token, config.security.jwt.secret);
      } catch (jwtError) {
        console.error("JWT verification error:", jwtError);

        return NextResponse.json({ error: "Token invalide" }, { status: 400 });
      }

      const userId = decoded.userId;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      const hashedPasword = hashPassword(oldPassword, user.passwordSalt);

      if (!user || user.passwordHash !== hashedPasword) {
        return NextResponse.json(
          {
            error: "Mot de passe incorrect, veuillez réessayer.",
          },
          { status: 400 },
        );
      }

      const salt = randomBytes(config.security.password.saltLength).toString(
        "hex",
      );

      await prisma.user.update({
        where: { id: userId },
        data: {
          passwordHash: hashPassword(newPassword, salt),
          passwordSalt: salt,
        },
      });

      return NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 },
      );
    } catch (error) {
      console.error(
        "Erreur updating password:",
        error instanceof Error ? error : new Error(error),
      );

      return NextResponse.json(
        { error: "Erreur interne du serveur, veuillez réessayer." },
        { status: 500 },
      );
    }
  },
};

export const { PATCH } = handler;
