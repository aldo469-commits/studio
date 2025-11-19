import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'services-hero');

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
            Nuestros Servicios
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Soluciones Logísticas a su Medida</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Desde el transporte local hasta la logística global compleja, tenemos la experiencia para llevar su negocio más lejos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const serviceImage = PlaceHolderImages.find(p => p.id === service.image);
              return (
                <Card key={service.slug} className="flex flex-col overflow-hidden group">
                  {serviceImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={serviceImage.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <service.icon className="size-6 text-primary" />
                        </div>
                        <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-muted-foreground flex-grow">{service.longDescription}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
