import {
  sortAndFilterServices,
  validateRouteData,
} from "@/apiUtils/apiUtils.js";
import { idValidator, stringValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function GET(request) {
  const t = await getTranslations("api.services");

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const category = url.searchParams.get("category");

    const valide = await validateRouteData(
      { id: id ? parseInt(id) : undefined, category: category },
      {
        id: idValidator.optional(),
        category: stringValidator("category", {
          required: false,
        }).notRequired(),
      },
    );

    if (valide instanceof NextResponse) {
      return valide;
    }

    let services;

    if (valide.id) {
      services = await prisma.service.findUnique({
        where: { id: valide.id },
      });
    } else if (valide.category) {
      services = await prisma.service.findMany({
        where: { category: valide.category },
      });
    } else {
      services = await prisma.service.findMany();
    }

    if (!services || services.length === 0) {
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
