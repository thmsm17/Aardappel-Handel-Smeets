import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Naam moet minimaal 2 karakters lang zijn"),
  email: z.string().email("Ongeldig e-mailadres"),
  phone: z.string().optional(),
  message: z.string().min(10, "Bericht moet minimaal 10 karakters lang zijn"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "802c5e8b-eca5-47c5-8c58-7efdc80386f3",
          subject: "Nieuw bericht via website Aardappel Handel Smeets",
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          message: data.message,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Er ging iets mis. Probeer het opnieuw.");
      }
      return json;
    },
  });
}
