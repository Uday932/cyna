import { hashPassword } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import config from "@/utils/config.js";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server.js";

const handler = {
  POST: async (request) => {
    try {
      const body = await request.json();
      const { email, password } = body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      const hashedPasword = hashPassword(password, user.passwordSalt);

      if (!user || user.passwordHash !== hashedPasword) {
        return NextResponse.json(
          {
            error: "Mot de passe incorrect " + user.email + " " + hashedPasword,
          },
          { status: 400 },
        );
      }

      const jwt = jsonwebtoken.sign(
        { userId: user.id },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn },
      );

      return NextResponse.json(
        { message: "Connexion réussie", jwt },
        { status: 200 },
      );
    } catch (error) {
      console.error("Erreur Serveur : connexion:", error);

      return NextResponse.json(
        { error: "Erreur interne du serveur, veuillez réessayer." },
        { status: 500 },
      );
    }
  },
};

export const { POST } = handler;
