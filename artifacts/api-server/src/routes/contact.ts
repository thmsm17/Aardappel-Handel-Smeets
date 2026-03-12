import { Router } from "express";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "U heeft te veel berichten verstuurd. Probeer het over een uur opnieuw.",
  },
});

const router = Router();

function createTransporter() {
  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASS"];

  if (!user || !pass) {
    throw new Error("Gmail credentials (GMAIL_USER / GMAIL_APP_PASS) zijn niet geconfigureerd.");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

router.post("/contact", contactLimiter, async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Naam, e-mail en bericht zijn verplicht." });
  }

  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `"Website Smeets" <${process.env["GMAIL_USER"]}>`,
      to: "info@gebrsmeets.nl",
      replyTo: email,
      subject: `Nieuw contactbericht van ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7b1c1c; border-bottom: 2px solid #7b1c1c; padding-bottom: 8px;">
            Nieuw bericht via de website
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #444; width: 120px;">Naam:</td>
              <td style="padding: 8px 0; color: #222;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #444;">E-mail:</td>
              <td style="padding: 8px 0; color: #222;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #444;">Telefoon:</td>
              <td style="padding: 8px 0; color: #222;">${phone}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-left: 4px solid #7b1c1c; border-radius: 4px;">
            <p style="font-weight: bold; color: #444; margin: 0 0 8px 0;">Bericht:</p>
            <p style="color: #222; white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">
            Dit bericht is verzonden via het contactformulier op www.gebrsmeets.nl
          </p>
        </div>
      `,
    });

    console.log(`Contact form: email sent from ${email} (${name})`);
    return res.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Bericht kon niet worden verzonden. Probeer het later opnieuw." });
  }
});

export default router;
