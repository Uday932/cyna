import { InvalidArgumentError } from "@/apiUtils/apiError.js";
import appConfig from "@/utils/appConfig.js";
import { AVAILABILITY_STATUS } from "@/utils/constants.js";
import { v2 as cloudinary } from "cloudinary";
import { SignJWT } from "jose";
import { NextResponse } from "next/server.js";
import { scryptSync } from "node:crypto";
import * as yup from "yup";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const hashPassword = (password, salt) => {
  const hash = scryptSync(
    password,
    salt,
    appConfig.security.password.hashLength,
  ).toString("hex");

  return `${salt}$${hash}`;
};

export const validateRouteData = async (data, schemaFields) => {
  try {
    const schema = yup.object().shape(schemaFields);

    const res = await schema.validate(data, { abortEarly: false });

    return res;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Les données fournies sont incorrectes.",
        details: error.errors,
      },
      { status: 400 },
    );
  }
};

export const validateSchema = async (data, schemaFields) => {
  const schema = yup.object().shape(schemaFields);

  try {
    const result = await schema.validate(data, { abortEarly: false });

    return result;
  } catch (error) {
    throw new InvalidArgumentError(["Invalid data provided", ...error.errors]);
  }
};

export const signJwtToken = async (payload) => {
  const secret = new TextEncoder().encode(appConfig.security.jwt.secret);

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(appConfig.security.jwt.expiresIn)
    .sign(secret);

  return jwt;
};

export const uploadImages = async (formData, folderName) => {
  const images = formData.getAll("images");

  if (images.length === 0) {
    return [];
  }

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
            folder: folderName,
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

  return uploadedImages;
};

export function sortAndFilterServices(services) {
  const available = services.filter(
    (s) =>
      s.availability === AVAILABILITY_STATUS.AVAILABLE &&
      s.usedResources <= s.maxResources,
  );

  const unavailable = services.filter(
    (s) => s.availability !== AVAILABILITY_STATUS.AVAILABLE,
  );

  available.sort((a, b) => {
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

  return [...available, ...unavailable];
}
