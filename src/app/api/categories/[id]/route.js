import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { validateSchema } from "@/apiUtils/apiUtils";
import { idValidator } from "@/apiUtils/apiValidators";
import { getTranslations } from "next-intl/server";
import { handleApiError } from "@/apiUtils/errorHandler";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const valide = await validateSchema(
      { id: parseInt(id) },
      { id: idValidator },
    );

    const category = await prisma.category.findUnique({
      where: { id: valide.id },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Catégorie introuvable." },
        { status: 404 },
      );
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    const t = await getTranslations();
    handleApiError(error, t);
  }
}
