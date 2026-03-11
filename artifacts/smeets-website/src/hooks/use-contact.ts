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
      // Simulate API call since no backend is defined
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Contact form submitted:", data);
      return { success: true };
    },
  });
}
