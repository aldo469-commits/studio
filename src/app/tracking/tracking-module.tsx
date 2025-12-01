'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, Package, Calendar, Clock, Lightbulb, TriangleAlert } from 'lucide-react';

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

type TrackingState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  shipmentData?: ShipmentData;
  aiSuggestions?: string;
};

const trackingSchema = z.object({
  trackingNumber: z.string().min(5, "El número de seguimiento no es válido."),
});

type TrackingFormData = z.infer<typeof trackingSchema>;

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

export function TrackingModule() {
  const [state, setState] = useState<TrackingState>({ status: 'idle' });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TrackingFormData>({
    resolver: zodResolver(trackingSchema),
  });

  const onFormSubmit = async (data: TrackingFormData) => {
    setState({ status: 'loading' });
    const { trackingNumber } = data;
    const shipmentData = mockShipmentData[trackingNumber.toUpperCase()];

    // Simulate network delay
    await new Promise(res => setTimeout(res, 1000));

    if (!shipmentData) {
      setState({
        status: 'error',
        message: `No se encontró información para el número de seguimiento ${trackingNumber}.`,
      });
      return;
    }
    
    // AI Suggestions are disabled for static export
    const aiSuggestions = 'Las sugerencias de IA están desactivadas en la versión estática.';

    setState({
      status: 'success',
      shipmentData,
      aiSuggestions,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col sm:flex-row gap-4">
            <div className='w-full'>
              <Input
                {...register('trackingNumber')}
                placeholder="Ej: EJA123456789"
                className="flex-grow text-base h-12"
              />
              {errors.trackingNumber && <p className="mt-1 text-sm text-destructive">{errors.trackingNumber.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto">
                {isSubmitting ? 'Buscando...' : <><Search className="mr-2 h-4 w-4" /> Rastrear</>}
            </Button>
          </form>
        </CardContent>
      </Card>

      {state.status === 'loading' && <p>Buscando información del envío...</p>}

      {state.status === 'error' && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state.status === 'success' && state.shipmentData && (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Resultados del Seguimiento</CardTitle>
                <CardDescription>Número de seguimiento: <span className="font-mono font-semibold">{state.shipmentData.trackingNumber}</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <Card className="p-4">
                        <Package className="mx-auto mb-2 h-8 w-8 text-primary" />
                        <h4 className="font-semibold">Estado Actual</h4>
                        <p className={`text-lg font-bold ${state.shipmentData.currentStatus === 'Retrasado' ? 'text-destructive' : 'text-primary'}`}>
                          {state.shipmentData.currentStatus}
                        </p>
                    </Card>
                    <Card className="p-4">
                        <Calendar className="mx-auto mb-2 h-8 w-8 text-primary" />
                        <h4 className="font-semibold">Entrega Estimada</h4>
                        <p className="text-lg">{new Date(state.shipmentData.estimatedDeliveryDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </Card>
                    <Card className="p-4 bg-primary/5">
                        <Lightbulb className="mx-auto mb-2 h-8 w-8 text-amber-500" />
                        <h4 className="font-semibold">Sugerencia Proactiva</h4>
                        <p className="text-sm text-muted-foreground">{state.aiSuggestions}</p>
                    </Card>
                </div>
                
                <div>
                    <h3 className="font-headline text-xl font-semibold mb-4">Historial del Envío</h3>
                    <div className="relative border-l-2 border-primary/20 pl-6 space-y-8">
                        {state.shipmentData.history.slice().reverse().map((event, index) => (
                            <div key={index} className="relative">
                                <div className={`absolute -left-[33.5px] top-1.5 w-4 h-4 rounded-full ${index === 0 ? 'bg-primary ring-4 ring-background' : 'bg-primary/30'}`}></div>
                                <p className="font-semibold">{event.status}</p>
                                <p className="text-sm text-muted-foreground">{event.location}</p>
                                <p className="text-xs text-muted-foreground/80 mt-1 flex items-center"><Clock className="mr-1.5 h-3 w-3" />{formatDate(event.timestamp)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
