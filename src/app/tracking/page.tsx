
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, Package, TriangleAlert, Loader2, MapPin, Calendar, Truck, Warehouse, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

// Definim el tipus de dades que esperem de l'API
type ShipmentData = {
  id: string;
  tracking_code: string;
  Origen: string;
  Destí: string;
  ETA: string;
  Estat: 'En magatzem' | 'En trànsit' | 'Lliurat';
  'Ubicació actual': string;
};

// Configuració per a la barra de progrés
const statusConfig = {
  'En magatzem': { value: 10, color: 'bg-yellow-500', icon: <Warehouse className="h-5 w-5" /> },
  'En trànsit': { value: 50, color: 'bg-blue-500', icon: <Truck className="h-5 w-5" /> },
  'Lliurat': { value: 100, color: 'bg-green-500', icon: <CheckCircle className="h-5 w-5" /> },
};


export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingCode) {
      setError('Si us plau, introdueix un codi de seguiment.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/qm90759o5g894/search?tracking_code=${trackingCode}`);
      if (!response.ok) {
        throw new Error('No s\'ha pogut connectar amb el servidor de seguiment.');
      }
      const data: ShipmentData[] = await response.json();
      
      // Simulem un petit retard per a una millor experiència d'usuari
      await new Promise(res => setTimeout(res, 500));

      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError(`Codi no trobat: No s'ha trobat cap enviament amb el codi '${trackingCode}'.`);
      }
    } catch (err) {
      setError('Hi ha hagut un problema amb la connexió. Intenta-ho de nou més tard.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStatusConfig = shipment ? statusConfig[shipment.Estat] : null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Localitza el teu enviament</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Introdueix el codi de seguiment per veure l'estat del teu paquet en temps real.
        </p>
      </div>

      <Card className="mb-8 shadow-lg border-2 border-transparent focus-within:border-primary transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Ex: EJA123456789"
              className="flex-grow text-base h-12"
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading} className="h-12 text-base w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              Cercar
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {shipment && (
        <Card className="animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                <Package />
                Resultats de l'enviament
            </CardTitle>
            <CardDescription>Codi de seguiment: <span className="font-mono font-semibold">{shipment.tracking_code}</span></CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">Origen</p>
                        <p className="font-semibold">{shipment.Origen}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">Destí</p>
                        <p className="font-semibold">{shipment.Destí}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">Data prevista (ETA)</p>
                        <p className="font-semibold">{new Date(shipment.ETA).toLocaleDateString('ca-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">Ubicació Actual</p>
                        <p className="font-semibold">{shipment['Ubicació actual']}</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3 font-headline">Estat de l'enviament</h3>
                <div className="flex items-center gap-4 mb-3">
                    {currentStatusConfig && (
                        <div className="flex items-center gap-2 font-semibold text-lg">
                           {currentStatusConfig.icon}
                           <span>{shipment.Estat}</span>
                        </div>
                    )}
                </div>
                
                {currentStatusConfig && (
                    <Progress value={currentStatusConfig.value} className={`h-3 ${currentStatusConfig.color}`} />
                )}

                <div className="grid grid-cols-3 mt-2 text-xs text-muted-foreground">
                    <div className="text-left">En magatzem</div>
                    <div className="text-center">En trànsit</div>
                    <div className="text-right">Lliurat</div>
                </div>
            </div>
            
          </CardContent>
        </Card>
      )}
    </div>
  );
}
