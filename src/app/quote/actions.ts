"use server";

import { z } from "zod";

export type QuoteFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

const quoteSchema = z.object({
  fullName: z.string().min(2, "El nombre completo es requerido."),
  companyName: z.string().optional(),
  email: z.string().email("Por favor, introduzca un correo electrónico válido."),
  phone: z.string().min(5, "El número de teléfono no es válido."),
  origin: z.string().min(2, "El origen es requerido."),
  destination: z.string().min(2, "El destino es requerido."),
  shipmentType: z.string().min(1, "Debe seleccionar un tipo de envío."),
  notes: z.string().optional(),
});

export async function submitQuoteForm(
  prevState: QuoteFormState,
  data: FormData
): Promise<QuoteFormState> {
  const formData = Object.fromEntries(data);
  const parsed = quoteSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key in formData) {
      fields[key] = formData[key].toString();
    }
    return {
      message: "Formulario inválido. Por favor, revise los campos y corrija los errores.",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }

  // Simulate processing quote and sending email
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  console.log("Nueva solicitud de cotización:", parsed.data);

  return {
    message: "¡Gracias por su solicitud! Hemos recibido su información y uno de nuestros especialistas se pondrá en contacto con usted en breve para proporcionarle su cotización.",
  };
}
