import { getTokenData, hashPassword } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import { NextResponse } from "next/server.js";
import { randomBytes } from "node:crypto";

const handler = {
  PATCH: async (request) => {
    try {
      const body = await request.json();
      const { oldPassword, newPassword } = body;

      const authHeader = request.headers.get("authorization");
      const decoded = getTokenData(authHeader);

      if (decoded instanceof NextResponse) {
        return decoded;
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

      const salt = randomBytes(appConfig.security.password.saltLength).toString(
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
