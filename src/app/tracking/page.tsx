'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Search, Package, TriangleAlert, Loader2, MapPin, Calendar, Truck, Warehouse, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/context/language-context';

// Definimos el tipo de datos que esperamos de l'API
type ShipmentData = {
  id: string;
  tracking_code: string;
  origin: string;
  destination: string;
  eta: string;
  status: 'En almacén' | 'En tránsito' | 'Entregado' | 'En magatzem' | 'En trànsit' | 'Lliurat';
  location: string;
};

export default function TrackingPage() {
  const { t, language } = useLanguage();
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Configuración para la barra de progreso
  const statusConfig: Record<string, { value: number; color: string; icon: React.ReactNode; label: string }> = {
    'En almacén': { value: 10, color: 'bg-yellow-500', icon: <Warehouse className="h-5 w-5" />, label: t('trackingPage.statusLabels.warehouse') },
    'En magatzem': { value: 10, color: 'bg-yellow-500', icon: <Warehouse className="h-5 w-5" />, label: t('trackingPage.statusLabels.warehouse') },
    'En tránsito': { value: 50, color: 'bg-blue-500', icon: <Truck className="h-5 w-5" />, label: t('trackingPage.statusLabels.transit') },
    'En trànsit': { value: 50, color: 'bg-blue-500', icon: <Truck className="h-5 w-5" />, label: t('trackingPage.statusLabels.transit') },
    'Entregado': { value: 100, color: 'bg-green-500', icon: <CheckCircle className="h-5 w-5" />, label: t('trackingPage.statusLabels.delivered') },
    'Lliurat': { value: 100, color: 'bg-green-500', icon: <CheckCircle className="h-5 w-5" />, label: t('trackingPage.statusLabels.delivered') },
  };

  // Función para convertir la fecha de formato DD/MM/YYYY a un objeto Date
  const parseDate = (dateString: string) => {
    if (!dateString || typeof dateString !== 'string') return null;
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(part => parseInt(part, 10));
      return new Date(year, month - 1, day);
    }
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleSearch = async () => {
    if (!trackingCode) {
      setError(t('trackingPage.errorEmpty'));
      return;
    }
    setIsLoading(true);
    setError(null);
    setShipment(null);

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/qm90759o5g894/search?tracking_code=${trackingCode}`);
      if (!response.ok) {
        throw new Error(t('trackingPage.errorConnection'));
      }
      const data: ShipmentData[] = await response.json();
      
      await new Promise(res => setTimeout(res, 500));

      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError(`${t('trackingPage.errorNotFound')} '${trackingCode}'.`);
      }
    } catch (err: any) {
      setError(t('trackingPage.errorConnection'));
    } finally {
      setIsLoading(false);
    }
  };

  const currentStatusConfig = shipment ? statusConfig[shipment.status] : null;
  const etaDate = shipment ? parseDate(shipment.eta) : null;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">{t('trackingPage.title')}</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t('trackingPage.subtitle')}
        </p>
      </div>

      <Card className="mb-8 shadow-lg border-2 border-transparent focus-within:border-primary transition-colors">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder={t('trackingPage.placeholder')}
              className="flex-grow text-base h-12"
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading} className="h-12 text-base w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Search className="mr-2 h-5 w-5" />
              )}
              {t('trackingPage.search')}
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
                {t('trackingPage.resultTitle')}
            </CardTitle>
            <CardDescription>{t('trackingPage.trackingCode')}: <span className="font-mono font-semibold">{shipment.tracking_code}</span></CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                <div className="flex items-center gap-3">
                    <Truck className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">{t('trackingPage.origin')}</p>
                        <p className="font-semibold">{shipment.origin}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">{t('trackingPage.destination')}</p>
                        <p className="font-semibold">{shipment.destination}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">{t('trackingPage.eta')}</p>
                        <p className="font-semibold">
                          {etaDate ? etaDate.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary"/>
                    <div>
                        <p className="text-muted-foreground">{t('trackingPage.location')}</p>
                        <p className="font-semibold">{shipment.location}</p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-3 font-headline">{t('trackingPage.statusTitle')}</h3>
                <div className="flex items-center gap-4 mb-3">
                    {currentStatusConfig && (
                        <div className="flex items-center gap-2 font-semibold text-lg">
                           {currentStatusConfig.icon}
                           <span>{currentStatusConfig.label}</span>
                        </div>
                    )}
                </div>
                
                {currentStatusConfig && (
                    <Progress value={currentStatusConfig.value} className={`h-3 ${currentStatusConfig.color}`} />
                )}

                <div className="grid grid-cols-3 mt-2 text-xs text-muted-foreground">
                    <div className="text-left">{t('trackingPage.statusLabels.warehouse')}</div>
                    <div className="text-center">{t('trackingPage.statusLabels.transit')}</div>
                    <div className="text-right">{t('trackingPage.statusLabels.delivered')}</div>
                </div>
            </div>
            
          </CardContent>
        </Card>
      )}
    </div>
  );
}