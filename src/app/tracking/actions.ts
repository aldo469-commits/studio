"use server";

import { z } from 'zod';
import { getShipmentTrackingSuggestions } from '@/ai/flows/shipment-tracking-suggestions';

type ShipmentEvent = {
  timestamp: string;
  status: string;
  location: string;
};

type ShipmentData = {
  trackingNumber: string;
  currentStatus: string;
  estimatedDeliveryDate: string;
  history: ShipmentEvent[];
};

export type TrackingState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  shipmentData?: ShipmentData;
  aiSuggestions?: string;
};

const trackingSchema = z.object({
  trackingNumber: z.string().min(5, "El número de seguimiento no es válido."),
});

const mockShipmentData: Record<string, ShipmentData> = {
    'EJA123456789': {
        trackingNumber: 'EJA123456789',
        currentStatus: 'En tránsito',
        estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        history: [
            { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Envío recogido', location: 'Madrid, España' },
            { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'Salida del centro de origen', location: 'Madrid, España' },
            { timestamp: new Date().toISOString(), status: 'En tránsito hacia el destino', location: 'Zaragoza, España' }
        ]
    },
    'EJA987654321': {
        trackingNumber: 'EJA987654321',
        currentStatus: 'Retrasado',
        estimatedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        history: [
            { timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), status: 'Envío recogido', location: 'Shanghái, China' },
            { timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), status: 'Procesado en el puerto de origen', location: 'Shanghái, China' },
            { timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), status: 'Retraso por condiciones meteorológicas', location: 'Océano Índico' }
        ]
    }
};

export async function trackShipment(
  prevState: TrackingState,
  data: FormData
): Promise<TrackingState> {
  const formData = Object.fromEntries(data);
  const parsed = trackingSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues.map((issue) => issue.message).join(', '),
    };
  }

  const { trackingNumber } = parsed.data;
  const shipmentData = mockShipmentData[trackingNumber.toUpperCase()];

  if (!shipmentData) {
    return {
      status: 'error',
      message: `No se encontró información para el número de seguimiento ${trackingNumber}.`,
    };
  }

  try {
    const aiResponse = await getShipmentTrackingSuggestions({
      trackingNumber: shipmentData.trackingNumber,
      currentStatus: shipmentData.currentStatus,
      estimatedDeliveryDate: shipmentData.estimatedDeliveryDate,
      shipmentHistory: shipmentData.history.map(h => `${h.timestamp}: ${h.status} en ${h.location}`).join('\n'),
    });

    return {
      status: 'success',
      shipmentData,
      aiSuggestions: aiResponse.suggestions,
    };
  } catch (error) {
    console.error("AI suggestion generation failed:", error);
    return {
      status: 'success', // Still success because we have tracking data
      shipmentData,
      aiSuggestions: 'No se pudieron generar sugerencias en este momento. Por favor, verifique el historial del envío para más detalles.',
    };
  }
}
