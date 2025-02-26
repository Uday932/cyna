import prisma from "@/apiUtils/prisma-client.js";
import config from "@/utils/config.js";
import routes from "@/utils/routes.js";
import jsonwebtoken from "jsonwebtoken";
import { NextResponse } from "next/server.js";
import nodemailer from "nodemailer";

const handler = {
  POST: async (request) => {
    try {
      const body = await request.json();
      const { email } = body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { message: "Une erreur est survenue, veuillez réessayer." },
          { status: 400 },
        );
      }

      const resetToken = jsonwebtoken.sign(
        { userId: user.id },
        config.security.jwt.secret,
        { expiresIn: "1h" },
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { verificationToken: resetToken },
      });

      const resetUrl = `http://localhost:3000${routes.signs.forgotPassword.reset(
        resetToken,
      )}`;

      const mailOptions = {
        from: `"Cyna" <${process.env.AUTH_USER}>`,
        to: user.email,
        subject: "Réinitialisation de votre compte",
        text: `Bonjour ${user.firstName},\nNous avons reçu une demande de réinitialisation de votre mot de passe. Pour procéder, veuillez cliquer sur le lien suivant : ${resetUrl}\n\nCordialement,\nL'équipe Cyna`,
      };

      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        auth: {
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASS,
        },
      });

      await transporter.sendMail(mailOptions);

      return NextResponse.json(
        { message: "Demande de réinitialisation envoyé par mail." },
        { status: 200 },
      );
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        {
          error: "Erreur interne du serveur, veuillez réessayer.",
        },
        { status: 500 },
      );
    }
  },
};

export const { POST } = handler;
