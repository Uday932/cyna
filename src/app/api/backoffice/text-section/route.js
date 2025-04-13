import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const updatedText = await prisma.textSection.update({
      where: { id: 1 },
      data: { content: body.textePrincipal },
    });

    return NextResponse.json(updatedText, { status: 200 });
  } catch (error) {
    console.error("Erreur Serveur : mise à jour text-section:", error);

    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du texte dynamique" },
      { status: 500 },
    );
  }
}
