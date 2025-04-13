import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

export async function GET() {
  try {
    const textSection = await prisma.textSection.findFirst();

    return NextResponse.json(textSection, { status: 200 });
  } catch (error) {
    console.error("Erreur Serveur : text-section:", error);

    return NextResponse.json(
      { error: "Erreur lors de la récupération du texte dynamique" },
      { status: 500 },
    );
  }
}
