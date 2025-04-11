import { hashPassword } from "@/apiUtils/apiUtils.js";
import prisma from "@/apiUtils/prisma-client.js";
import appConfig from "@/utils/appConfig.js";
import routes from "@/utils/routes.js";
import "dotenv/appConfig";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server.js";
import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

const handler = {
  POST: async (request) => {
    try {
      const body = await request.json();
      const { firstName, lastName, email, password } = body;

      const userExist = await prisma.user.findUnique({
        where: { email },
      });

      if (userExist) {
        return NextResponse.json(
          { message: "Impossible de se connecter, veuillez réessayer." },
          { status: 400 },
        );
      }

      const salt = randomBytes(appConfig.security.password.saltLength).toString(
        "hex",
      );
      const hashedPasword = hashPassword(password, salt);

      const newUser = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          passwordHash: hashedPasword,
          passwordSalt: salt,
        },
      });

      const token = jsonwebtoken.sign(
        { userId: newUser.id },
        appConfig.security.jwt.secret,
        {
          expiresIn: appConfig.security.jwt.expiresIn,
        },
      );

      await prisma.user.update({
        where: { id: newUser.id },
        data: { verificationToken: token },
      });

      const validationUrl = `http://localhost:3000${routes.signs.validate(
        token,
      )}`;

      const mailOptions = {
        from: `"Cyna" <${process.env.AUTH_USER}>`,
        to: email,
        subject: "Validation de votre compte",
        text: `Bonjour ${firstName},\n\nVeuillez valider votre compte en cliquant sur le lien suivant : ${validationUrl}\n\nCordialement,\nL'équipe Cyna`,
      };

      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        auth: {
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS,
        },
      });

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return console.log(error);
        }
      });

      return NextResponse.json(
        {
          message:
            "Utilisateur crée avec succès. Veuillez vérifier votre email pour valider votre compte.",
          jwt: token,
        },
        { status: 200 },
      );
    } catch (error) {
      console.error(
        "Erreur:",
        error instanceof Error ? error : new Error(error),
      );

      return NextResponse.json(
        { error: "Erreur interne du serveur, veuillez réessayer." },
        { status: 500 },
      );
    }
  },
};

export const { POST } = handler;
