'use server';

/**
 * @fileOverview Provides shipment tracking suggestions in Spanish based on shipment data.
 *
 * - getShipmentTrackingSuggestions - A function that provides suggestions for shipment tracking.
 * - ShipmentTrackingSuggestionsInput - The input type for the getShipmentTrackingSuggestions function.
 * - ShipmentTrackingSuggestionsOutput - The return type for the getShipmentTrackingSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ShipmentTrackingSuggestionsInputSchema = z.object({
  trackingNumber: z.string().describe('The tracking number of the shipment.'),
  currentStatus: z.string().describe('The current status of the shipment.'),
  estimatedDeliveryDate: z.string().describe('The estimated delivery date of the shipment.'),
  shipmentHistory: z.string().describe('The shipment history information.'),
});
export type ShipmentTrackingSuggestionsInput = z.infer<typeof ShipmentTrackingSuggestionsInputSchema>;

const ShipmentTrackingSuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('Proactive suggestions about potential delays or alternative routes in Spanish.'),
});
export type ShipmentTrackingSuggestionsOutput = z.infer<typeof ShipmentTrackingSuggestionsOutputSchema>;

export async function getShipmentTrackingSuggestions(input: ShipmentTrackingSuggestionsInput): Promise<ShipmentTrackingSuggestionsOutput> {
  return shipmentTrackingSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'shipmentTrackingSuggestionsPrompt',
  input: {schema: ShipmentTrackingSuggestionsInputSchema},
  output: {schema: ShipmentTrackingSuggestionsOutputSchema},
  prompt: `Eres un asistente experto en logística y transporte. Analizarás la información de seguimiento del envío proporcionada y ofrecerás sugerencias proactivas en español sobre posibles retrasos o rutas alternativas, para que el usuario pueda anticipar problemas y planificar en consecuencia.

Número de seguimiento: {{{trackingNumber}}}
Estado actual: {{{currentStatus}}}
Fecha de entrega estimada: {{{estimatedDeliveryDate}}}
Historial del envío: {{{shipmentHistory}}}

Genera sugerencias útiles y prácticas en español.`,
});

const shipmentTrackingSuggestionsFlow = ai.defineFlow(
  {
    name: 'shipmentTrackingSuggestionsFlow',
    inputSchema: ShipmentTrackingSuggestionsInputSchema,
    outputSchema: ShipmentTrackingSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
