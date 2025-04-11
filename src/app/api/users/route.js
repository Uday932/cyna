import { getTokenData } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server.js";

const handler = {
  GET: async (request) => {
    try {
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
        select: {
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          {
            error: "Mot de passe incorrect, veuillez réessayer.",
          },
          { status: 400 },
        );
      }

      return NextResponse.json(user, { status: 200 });
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
  PATCH: async (request) => {
    try {
      const body = await request.json();
      const { firstName, lastName, email } = body;

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
        decoded = jwt.verify(token, appConfig.security.jwt.secret);
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

      if (!user) {
        return NextResponse.json(
          {
            error: "Mot de passe incorrect, veuillez réessayer.",
          },
          { status: 400 },
        );
      }

      if (email) {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser && existingUser.id !== userId) {
          return NextResponse.json(
            {
              error:
                "Impossible de mettre à jour le profil, veuillez réessayer.",
            },
            { status: 400 },
          );
        }
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });

      return NextResponse.json(
        {
          message:
            "Les informations de votre compte ont été mises à jour avec succès.",
        },
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

export const { GET, PATCH } = handler;
