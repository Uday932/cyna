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

export const config = {
  api: {
    bodyParser: false,
  },
};

const POST = async (request) => {
  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Configuration serveur incorrecte" },
        { status: 500 },
      );
    }

    const formData = await request.formData();
    const images = formData.getAll("images");

    const uploadedImages = [];
    const uploadPromises = [];

    for (const image of images) {
      if (!(image instanceof File)) {
        continue;
      }

      const buffer = await image.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const uploadPromise = new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "services",
              public_id: image.name.split(".")[0],
            },
            (error, result) => {
              if (error) {
                reject(error);

                return;
              }

              uploadedImages.push(image.name);
              resolve(result);
            },
          )
          .end(bytes);
      });
      uploadPromises.push(uploadPromise);
    }

    await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      message: "Images téléchargées avec succès",
      uploadedImages,
    });
  } catch (error) {
    console.error("Erreur:", error instanceof Error ? error : new Error(error));

    return NextResponse.json(
      { error: "Erreur interne du serveur, veuillez réessayer." },
      { status: 500 },
    );
  }
};

const DELETE = async (request, { params }) => {
  try {
    const { id } = await params;

    const validatedParams = await validateRouteData(
      { id: parseInt(id) },
      {
        id: idValidator.required(),
      },
    );

    const serviceId = validatedParams.id;

    const { imagesToDelete } = await request.json();

    if (!Array.isArray(imagesToDelete) || imagesToDelete.length === 0) {
      return NextResponse.json(
        { error: "Aucune image à supprimer" },
        { status: 400 },
      );
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId },
      select: { images: true },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Service non trouvé" },
        { status: 404 },
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
      where: { id: serviceId },
      data: { images: updatedImages },
    });

    return NextResponse.json({
      success: true,
      message: "Images supprimées avec succès",
      updatedService,
    });
  } catch (error) {
    console.error("Erreur lors de la suppression des images:", error);

    return NextResponse.json(
      { error: "Erreur lors de la suppression des images" },
      { status: 500 },
    );
  }
};

export { DELETE, POST };
