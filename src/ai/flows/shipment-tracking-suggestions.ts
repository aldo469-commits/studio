/**
 * @fileOverview Provides shipment tracking suggestions in Spanish based on shipment data.
 *
 * - getShipmentTrackingSuggestions - A function that provides suggestions for shipment tracking.
 * - ShipmentTrackingSuggestionsInput - The input type for the getShipmentTrackingSuggestions function.
 * - ShipmentTrackingSuggestionsOutput - The return type for the getShipmentTrackingSuggestions function.
 */

// Imports de Zod y Genkit eliminados para la exportación estática.

export type ShipmentTrackingSuggestionsInput = {
  trackingNumber: string;
  currentStatus: string;
  estimatedDeliveryDate: string;
  shipmentHistory: string;
};

export type ShipmentTrackingSuggestionsOutput = {
  suggestions: string;
};

export async function getShipmentTrackingSuggestions(input: ShipmentTrackingSuggestionsInput): Promise<ShipmentTrackingSuggestionsOutput> {
  return {
    suggestions: 'Las sugerencias de IA están desactivadas en la versión estática.'
  };
}
