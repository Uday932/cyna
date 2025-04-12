import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

const handler = {
  GET: async (request) => {
    try {
      const userId = request.headers.get("x-user-id");

      const validateParams = await validateRouteData(
        {
          id: parseInt(userId),
        },
        { id: idValidator.required() },
      );

      const user = await prisma.user.findUnique({
        where: {
          id: validateParams.id,
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
        "Erreur mise à jour mot de passe :",
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

        if (existingUser && existingUser.id !== validatedParams.id) {
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
        where: { id: validatedParams.id },
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });

      return NextResponse.json(
        {
          message: "Vos informations ont bien été modifiées.",
        },
        { status: 200 },
      );
    } catch (error) {
      console.error(
        "Erreur mise à jour du profil:",
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
