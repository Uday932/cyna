import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

const handler = {
  GET: async (request) => {
    try {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");

      const validatedData = await validateRouteData(
        { id: id ? parseInt(id) : undefined },
        { id: idValidator.optional() },
      );

      if (validatedData instanceof NextResponse) {
        return validatedData;
      }

      const services = id
        ? await prisma.service.findUnique({
            where: { id: parseInt(id) },
          })
        : await prisma.service.findMany();

      if (!services) {
        return NextResponse.json(
          { error: "Aucun service trouvé." },
          { status: 404 },
        );
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
