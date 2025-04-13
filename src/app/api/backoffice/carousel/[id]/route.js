import prisma from "@/apiUtils/prisma-client";
import { NextResponse } from "next/server";

export async function DELETE(_, context) {
  const { id } = await context.params;

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

export async function POST(request, context) {
  const params = await context.params;
  const id = params?.id;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "ID invalide" }, { status: 400 });
  }

  const body = await request.json();
  const { title, description, image, link } = body;

  try {
    const updatedCarousel = await prisma.carouselItem.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        image,
        link,
      },
    });

    return NextResponse.json({ updatedCarousel }, { status: 200 });
  } catch (error) {
    console.error("Erreur Mise à jour carousel:", error);

    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du carousel" },
      { status: 500 },
    );
  }
}
