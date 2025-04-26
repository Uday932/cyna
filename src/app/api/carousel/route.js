import prisma from "@/apiUtils/prisma-client.js";
import { getTranslations } from "next-intl/server";
import { NextResponse } from "next/server.js";

export async function GET(request) {
  const t = await getTranslations("api.carousel");

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const item = await prisma.carouselItem.findUnique({
        where: { id: parseInt(id) },
      });

      return NextResponse.json(item, { status: 200 });
    }

    const items = await prisma.carouselItem.findMany();

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(t("error"), error);

    return NextResponse.json({ error: t("error") }, { status: 500 });
  }
}
