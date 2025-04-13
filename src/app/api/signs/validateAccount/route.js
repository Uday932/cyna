import prisma from "@/apiUtils/prisma-client.js";
import { verifyJwtToken } from "@/utils/utils.js";
import { NextResponse } from "next/server";

const handler = {
  GET: async (request) => {
    try {
      const { searchParams } = new URL(request.url);
      const token = searchParams.get("token");

      const decoded = await verifyJwtToken(token);

      if (!token) {
        return NextResponse.json({ error: "Token manquant" }, { status: 400 });
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
          emailVerified: true,
          verificationToken: null,
        },
      });

      return NextResponse.json({ message: "Compte validé avec succès" });
    } catch (error) {
      return NextResponse.json(
        { error: error + " - Erreur interne du serveur, veuillez réessayer." },
        { status: 500 },
      );
    }
  },
};

export const { GET } = handler;
