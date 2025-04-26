import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

export async function PUT(req) {
  try {
    const { items } = await req.json();

    for (const item of items) {
      if (typeof item.id === "number") {
        await prisma.carouselItem.update({
          where: { id: item.id },
          data: {
            title: item.title,
            description: item.description,
            image: item.image,
            link: item.link,
          },
        });
      } else {
        await prisma.carouselItem.create({
          data: {
            title: item.title,
            description: item.description,
            image: item.image,
            link: item.link,
          },
        });
      }
    }

    return NextResponse.json({ message: "Carousel updated!" }, { status: 200 });
  } catch (error) {
    console.error("Error updating carousel :", error);

    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, image, link } = body;

    if (!title || !description || !image || !link) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const newCarouselItem = await prisma.carouselItem.create({
      data: {
        title,
        description,
        image,
        link,
      },
    });

    return NextResponse.json({ newCarouselItem }, { status: 201 });
  } catch (error) {
    console.error("Error creating carousel :", error);

    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
