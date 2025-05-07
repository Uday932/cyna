import prisma from "@/apiUtils/prisma-client";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.category.delete({ where: { id: Number(id) } });

    return NextResponse.json({ message: "Catégorie supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);

    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const { name, description, image, link, priority } = await request.json();
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name, description, image, link, priority },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error);

    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { priority: "desc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);

    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}