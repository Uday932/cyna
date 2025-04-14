import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator, stringValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import { NextResponse } from "next/server.js";

const handler = {
  GET: async (request) => {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      const category = url.searchParams.get("category");

      const valide = await validateRouteData(
        { id: id ? parseInt(id) : undefined, category: category },
        {
          id: idValidator.optional(),
          category: stringValidator("category", {
            nullable: true,
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
        return NextResponse.json(
          { error: "Aucun service trouvé." },
          { status: 404 },
        );
      }

      if (Array.isArray(services)) {
        const serviceAvailable = services.filter(
          (s) =>
            s.availability === AVAILABILITY_STATUS.AVAILABLE &&
            s.usedResources <= s.maxResources,
        );

        const serviceUnavailable = services.filter(
          (s) => s.availability !== AVAILABILITY_STATUS.AVAILABLE,
        );

        serviceAvailable.sort((a, b) => {
          const aHasPriority = typeof a.priority === "number";
          const bHasPriority = typeof b.priority === "number";

          if (aHasPriority && bHasPriority) {
            return b.priority - a.priority;
          }

          if (aHasPriority) {
            return -1;
          }

          if (bHasPriority) {
            return 1;
          }

          return 0;
        });

        services = [...serviceAvailable, ...serviceUnavailable];
      }

      return NextResponse.json(services, { status: 200 });
    } catch (error) {
      console.error(
        "Erreur de récupération de service(s):",
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
