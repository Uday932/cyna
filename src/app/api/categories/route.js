import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { priority: "desc" },
    });

    return Response.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);

    return Response.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
