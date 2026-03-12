import { Router } from "express";
import { Resend } from "resend";

const router = Router();

// Resend integration via Replit Connectors
async function getResendClient() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? "depl " + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken || !hostname) {
    throw new Error("Replit connector token not found");
  }

  const data = await fetch(
    "https://" + hostname + "/api/v2/connection?include_secrets=true&connector_names=resend",
    {
      headers: {
        Accept: "application/json",
        "X-Replit-Token": xReplitToken,
      },
    }
  ).then((res) => res.json()).then((d) => d.items?.[0]);

  if (!data?.settings?.api_key) {
    throw new Error("Resend not connected");
  }

  return {
    client: new Resend(data.settings.api_key),
    fromEmail: (data.settings.from_email as string) || "onboarding@resend.dev",
  };
}

router.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Naam, e-mail en bericht zijn verplicht." });
  }

  try {
    const { client, fromEmail } = await getResendClient();

    await client.emails.send({
      from: `Aardappel Handel Smeets <${fromEmail}>`,
      to: ["info@gebrsmeets.nl"],
      reply_to: email,
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

    return res.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Bericht kon niet worden verzonden. Probeer het later opnieuw." });
  }
});

export default router;
