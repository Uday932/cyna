import { hashPassword, validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import { NextResponse } from "next/server.js";
import { randomBytes } from "node:crypto";

const handler = {
  PATCH: async (request) => {
    try {
      const body = await request.json();
      const { oldPassword, newPassword } = body;

      const userId = request.headers.get("x-user-id");

      const validatedParams = await validateRouteData(
        { id: parseInt(userId) },
        {
          id: idValidator.required(),
        },
      );

      const user = await prisma.user.findUnique({
        where: {
          id: validatedParams.id,
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
        where: { id: validatedParams.id },
        data: {
          passwordHash: hashPassword(newPassword, salt),
          passwordSalt: salt,
        },
      });

      return NextResponse.json(
        { message: "Mot de passe mis à jour !" },
        { status: 200 },
      );
    } catch (error) {
      console.error(
        "Erreur mise à jour moit de passe :",
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
