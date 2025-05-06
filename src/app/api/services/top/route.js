import { validateSchema } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import { handleApiError } from "@/apiUtils/errorHandler.js";
import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const valide = await validateSchema(
      { id: id ? parseInt(id) : undefined },
      { id: idValidator.optional() },
    );

    let services;

    if (valide.id) {
      services = await prisma.topService.findUnique({
        where: { id: valide.id },
      });
    } else {
      services = await prisma.topService.findMany({
        include: {
          service: true,
        },
        orderBy: {
          priority: "asc",
        },
      });
    }

    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    const t = await getTranslations();
    handleApiError(error, t);
  }
}
