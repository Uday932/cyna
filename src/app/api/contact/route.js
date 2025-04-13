import nodemailer from "nodemailer";
import { NextResponse } from "next/server.js";

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, message } = body;

    if (!name || !email || !message) {
      console.error(
        "Erreur de validation : Tous les champs ne sont pas remplis.",
      );

      return NextResponse.json(
        { error: "Tous les champs sont requis." },
        { status: 400 },
      );
    }

    const mailOptions = {
      from: `"Cyna" <${process.env.AUTH_USER}>`,
      to: process.env.AUTH_USER,
      subject: `Nouveau message de ${name} (${email})`,
      text: `Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message envoyé avec succès !" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);

    return NextResponse.json(
      { error: "Erreur interne du serveur. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
