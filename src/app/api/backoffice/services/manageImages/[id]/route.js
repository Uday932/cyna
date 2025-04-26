import { validateRouteData } from "@/apiUtils/apiUtils.js";
import { idValidator } from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const validatedParams = await validateRouteData(
      { id: parseInt(id) },
      {
        id: idValidator.required(),
      },
    );

    const service = await prisma.service.findUnique({
      where: { id: validatedParams.id },
      select: { images: true },
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const { imagesToDelete } = await request.json();

    if (!Array.isArray(imagesToDelete) || imagesToDelete.length === 0) {
      return NextResponse.json(
        { error: "No images to delete" },
        { status: 400 },
      );
    }

    const deletePromises = imagesToDelete.map((imageName) => {
      const publicId = `services/${imageName.split(".")[0]}`;

      return cloudinary.uploader.destroy(publicId);
    });

    await Promise.all(deletePromises);

    const updatedImages = service.images.filter(
      (img) => !imagesToDelete.includes(img),
    );

    const updatedService = await prisma.service.update({
      where: { id: validatedParams.id },
      data: { images: updatedImages },
    });

    return NextResponse.json({
      success: true,
      message: "Images successfully deleted",
      updatedService,
    });
  } catch (error) {
    console.error("Error deleting images:", error);

    return NextResponse.json(
      { error: "Error deleting images" },
      { status: 500 },
    );
  }
}
