import prisma from "@/apiUtils/prisma-client";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const { id } = params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  try {
    const deleted = await prisma.carouselItem.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Slide supprimée avec succès", deleted },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur DELETE carousel:", error);

    return NextResponse.json(
      { error: "Erreur lors de la suppression" },
      { status: 500 },
    );
  } 
}
