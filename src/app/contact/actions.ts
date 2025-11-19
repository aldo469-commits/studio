"use server";

import { z } from "zod";

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduzca un correo electrónico válido."),
  subject: z.string().min(1, "Por favor, seleccione un asunto."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key in formData) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Formulario inválido. Por favor, corrija los errores.",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
  
  // Simulate sending email
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("Nuevo mensaje de contacto:", parsed.data);

  return {
    message: "¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.",
  };
}
