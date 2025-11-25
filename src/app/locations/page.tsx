import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { officeLocations } from '@/lib/data';
import { MapPin, Phone, Building } from 'lucide-react';

export default function LocationsPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'locations-hero');
  const mapImage = PlaceHolderImages.find(p => p.id === 'world-map');

  return (
    <div>
      <section className="relative h-64 bg-primary">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-white text-center">
            Nuestra Red Global
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Encuentre Nuestras Oficinas</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Estamos estratégicamente ubicados en los principales centros logísticos del mundo para servirle mejor.
            </p>
          </div>
          
          <Card className="overflow-hidden shadow-lg border">
            <CardContent className="p-0">
              <div className="relative w-full aspect-[2/1]">
                {mapImage && (
                  <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={mapImage.imageHint}
                  />
                )}
                {officeLocations.map((loc) => (
                  <div
                    key={loc.city}
                    className="absolute group"
                    style={{ top: loc.coords.top, left: loc.coords.left, transform: 'translate(-50%, -50%)' }}
                  >
                    <MapPin className="size-8 text-accent drop-shadow-lg cursor-pointer transition-transform group-hover:scale-125" />
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-background p-2 rounded-md shadow-lg text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border">
                      <p className="font-bold text-sm">{loc.city}</p>
                      <p className="text-xs text-muted-foreground">{loc.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {officeLocations.map((location) => (
              <Card key={location.city} className="flex flex-col">
                <CardContent className="p-6 flex-grow">
                  <h3 className="font-headline text-xl font-semibold mb-2">{location.city}</h3>
                  <p className="text-sm font-medium text-accent mb-4">{location.type}</p>
                  <div className="space-y-3 text-muted-foreground text-sm">
                    <div className="flex items-start gap-3">
                      <Building className="size-4 mt-0.5 flex-shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="size-4 mt-0.5 flex-shrink-0" />
                      <span>{location.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
