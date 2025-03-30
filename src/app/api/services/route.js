import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { categoryValidator, idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

const handler = {
  GET: async (request) => {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      const category = url.searchParams.get("category");

      const validatedData = await validateRouteData(
        { id: id ? parseInt(id) : undefined, category: category },
        {
          id: idValidator.optional(),
          category: categoryValidator.nullable().optional(),
        },
      );

      if (validatedData instanceof NextResponse) {
        return validatedData;
      }

      let services;

      if (id) {
        services = await prisma.service.findUnique({
          where: { id: parseInt(id) },
        });
      } else if (category) {
        services = await prisma.service.findMany({
          where: { category: category },
        });
      } else {
        services = await prisma.service.findMany();
      }

      if (!services || services.length === 0) {
        return NextResponse.json(
          { error: "Aucun service trouvé." },
          { status: 404 },
        );
      }

      if (Array.isArray(services)) {
        services.sort((a, b) => {
          const isAExhausted = a.usedResources >= a.maxResources;
          const isBExhausted = b.usedResources >= b.maxResources;

          if (isAExhausted && !isBExhausted) {
            return 1;
          }

          if (!isAExhausted && isBExhausted) {
            return -1;
          }

          return b.priority - a.priority;
        });
      }

      return NextResponse.json(services, { status: 200 });
    } catch (error) {
      console.error(
        "Erreur updating password:",
        error instanceof Error ? error : new Error(error),
      );

      return NextResponse.json(
        { error: "Erreur interne du serveur, veuillez réessayer." },
        { status: 500 },
      );
    }
  },
};

export const { GET } = handler;
