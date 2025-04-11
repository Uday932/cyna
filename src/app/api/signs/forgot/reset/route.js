import { hashPassword } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server.js";

const handler = {
  POST: async (request) => {
    try {
      const body = await request.json();
      const { password, resetToken } = body;

      const decoded = jsonwebtoken.verify(
        resetToken,
        appConfig.security.jwt.secret,
      );

      if (!decoded) {
        return NextResponse.json({ error: "Token manquant" }, { status: 400 });
      }

      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        return NextResponse.json({ error: "Token expiré" }, { status: 401 });
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        return NextResponse.json({ error: "Token invalide" }, { status: 404 });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordHash: hashPassword(password),
          emailVerified: true,
          verificationToken: null,
        },
      });

      return NextResponse.json(
        { message: "Votre mot de passe à été réinitialisé avec succès" },
        { status: 200 },
      );
    } catch (error) {
      console.error("Erreur Serveur - Reinitialisation mot de passe:", error);

      return NextResponse.json(
        {
          error: "Erreur interne du serveur, veuillez réessayer.",
        },
        { status: 500 },
      );
    }
  },
};

export const { POST } = handler;
