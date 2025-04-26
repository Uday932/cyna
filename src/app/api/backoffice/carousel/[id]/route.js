import prisma from "@/apiUtils/prisma-client";
import { NextResponse } from "next/server";

export async function DELETE(_, context) {
  const { id } = await context.params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const deleted = await prisma.carouselItem.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Slide successfully deleted", deleted },
      { status: 200 },
    );
  } catch (error) {
    console.error("DELETE carousel error:", error);

    return NextResponse.json(
      { error: "Error while deleting" },
      { status: 500 },
    );
  }
}

export async function POST(request, context) {
  const params = await context.params;
  const id = params?.id;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const body = await request.json();
  const { title, description, image, link } = body;

  try {
    const updatedCarousel = await prisma.carouselItem.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        image,
        link,
      },
    });

    return NextResponse.json({ updatedCarousel }, { status: 200 });
  } catch (error) {
    console.error("Carousel Update Error:", error);

    return NextResponse.json(
      { error: "Error updating carousel" },
      { status: 500 },
    );
  }
}
