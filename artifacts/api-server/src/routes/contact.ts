import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Naam, e-mail en bericht zijn verplicht." });
  }

  const transporter = nodemailer.createTransport({
    host: process.env["SMTP_HOST"] || "smtp.hostnet.nl",
    port: Number(process.env["SMTP_PORT"] || 587),
    secure: false,
    auth: {
      user: process.env["SMTP_USER"] || "",
      pass: process.env["SMTP_PASS"] || "",
    },
  });

  const mailOptions = {
    from: `"Website Smeets" <${process.env["SMTP_USER"] || "noreply@gebrsmeets.nl"}>`,
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
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Bericht kon niet worden verzonden. Probeer het later opnieuw." });
  }
});

export default router;
