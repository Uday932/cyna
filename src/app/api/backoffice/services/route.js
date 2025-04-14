import { uploadImages, validateRouteData } from "@/apiUtils/apiUtils.js";
import {
  availabilityValidator,
  integerValidator,
  numberValidator,
  stringValidator,
} from "@/apiUtils/apiValidators.js";
import prisma from "@/apiUtils/prisma-client.js";
import { NextResponse } from "next/server.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const schemaFields = {
  name: stringValidator("Nom"),
  summary: stringValidator("Résumé"),
  description: stringValidator("Description", { nullable: true }),
  technicalCharacteristics: stringValidator("Caractéristiques techniques", {
    nullable: true,
  }),
  companyBenefits: stringValidator("Avantages", { nullable: true }),
  category: stringValidator("Catégorie", { nullable: true }),
  monthlyPrice: numberValidator(0).nullable(),
  annualPrice: numberValidator(0).nullable(),
  perUserPrice: numberValidator(0).nullable(),
  perDevicePrice: numberValidator(0).nullable(),
  maxResources: integerValidator.nullable(),
  usedResources: integerValidator.nullable(),
  availability: availabilityValidator,
  priority: integerValidator.required("Priorité est requise"),
};

export async function POST(request) {
  const formData = await request.formData();

  const body = {
    name: formData.get("name"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    technicalCharacteristics: formData.get("technicalCharacteristics"),
    companyBenefits: formData.get("companyBenefits"),
    category: formData.get("category"),
    monthlyPrice: formData.get("monthlyPrice"),
    annualPrice: formData.get("annualPrice"),
    perUserPrice: formData.get("perUserPrice"),
    perDevicePrice: formData.get("perDevicePrice"),
    maxResources: formData.get("maxResources"),
    usedResources: formData.get("usedResources"),
    availability: formData.get("availability"),
    priority: formData.get("priority"),
  };

  const validatedBody = await validateRouteData(body, schemaFields);

  if (validatedBody instanceof NextResponse) {
    return validatedBody;
  }

  const uploadedImages = await uploadImages(formData, "services");

  try {
    await prisma.service.create({
      data: {
        ...validatedBody,
        images: uploadedImages,
      },
    });

    return NextResponse.json(
      { status: 201 },
      { message: "Service crée avec succès" },
    );
  } catch (error) {
    console.error("Erreur:", error instanceof Error ? error : new Error(error));

    return NextResponse.json(
      { error: "Erreur interne du serveur, veuillez réessayer." },
      { status: 500 },
    );
  }
}
