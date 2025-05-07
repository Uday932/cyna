import {
  sortAndFilterServices,
  validateRouteData,
} from "@/apiUtils/apiUtils.js";
import { idValidator, integerValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function GET(request) {
  const t = await getTranslations("api.services");

    try {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      const categoryId = url.searchParams.get("categoryId"); // Nouveau paramètre

      const valide = await validateRouteData(
        {
          id: id ? parseInt(id) : undefined,
          categoryId: categoryId ? parseInt(categoryId) : undefined,
        },
        {
          id: idValidator.optional(),
          categoryId: integerValidator.optional(), // Validation pour categoryId
        },
      );

    if (valide instanceof NextResponse) {
      return valide;
    }

    let services;

      if (valide.id) {
        services = await prisma.service.findUnique({
          where: { id: valide.id },
          include: { category: true }, // Inclure les détails de la catégorie
        });
      } else if (valide.categoryId) {
        services = await prisma.service.findMany({
          where: { categoryId: valide.categoryId },
          include: { category: true }, // Inclure les détails de la catégorie
        });
      } else {
        services = await prisma.service.findMany({
          include: { category: true }, // Inclure les détails de la catégorie
        });
      }

      if (!services || (Array.isArray(services) && services.length === 0)) {
        return NextResponse.json({ error: t("notFound") }, { status: 404 });
      }

    if (Array.isArray(services)) {
      services = sortAndFilterServices(services);
    }

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error(
      t("internalError"),
      error instanceof Error ? error : new Error(error),
    );

    return NextResponse.json({ error: t("internalError") }, { status: 500 });
  }
}
