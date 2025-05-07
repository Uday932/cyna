import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/categories - Récupérer toutes les catégories ou une catégorie spécifique par ID
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Récupérer l'ID depuis les paramètres de requête

    let categories;

    if (id) {
      // Si un ID est fourni, récupérer une seule catégorie
      categories = await prisma.category.findUnique({
        where: { id: Number(id) },
      });

      if (!categories) {
        return NextResponse.json(
          { error: "Catégorie introuvable." },
          { status: 404 },
        );
      }
    } else {
      // Sinon, récupérer toutes les catégories triées par priorité décroissante
      categories = await prisma.category.findMany({
        orderBy: { priority: "desc" },
      });
    }

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);

    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
