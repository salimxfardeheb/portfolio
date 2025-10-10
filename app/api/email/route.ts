import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email, name, message } = await request.json();

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="background-color: #FF3C00; padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">📩 Nouveau message depuis ton portfolio</h2>
          </div>
          <div style="padding: 24px;">
            <p style="font-size: 16px; color: #333;">Salut <strong>Salim</strong> 👋,</p>
            <p style="font-size: 16px; color: #333;">Tu as reçu un nouveau message depuis ton site :</p>

            <div style="margin-top: 16px; background-color: #fafafa; border-left: 4px solid #FF3C00; padding: 16px;">
              <p><strong>👤 Nom :</strong> ${name}</p>
              <p><strong>✉️ Email :</strong> <a href="mailto:${email}" style="color: #FF3C00;">${email}</a></p>
              <p><strong>💬 Message :</strong></p>
              <p style="white-space: pre-line; color: #333;">${message}</p>
            </div>

            <p style="margin-top: 24px; font-size: 14px; color: #888;">
              — Message envoyé automatiquement depuis ton portfolio.
            </p>
          </div>
          <div style="background-color: #111; color: white; text-align: center; padding: 16px; font-size: 14px;">
            © ${new Date().getFullYear()} Salim Fardeheb | Portfolio
          </div>
        </div>
      </div>
    `;

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name} (${email})`,
      text: message,
      html: htmlContent
    };

    await new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err) => {
        if (err) reject(err);
        else resolve("Email sent");
      });
    });

    return NextResponse.json({ message: "Email envoyé avec succès ✅" });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Erreur d’envoi d’email" },
      { status: 500 }
    );
  }
}
