import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TrackingModule } from './tracking-module';

export default function TrackingPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'tracking-hero');
  
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
            Seguimiento de Envíos
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h2 className="font-headline text-3xl font-bold">Rastree su Mercancía en Tiempo Real</h2>
              <p className="mt-2 text-muted-foreground">
                Introduzca su número de seguimiento para ver el estado actual de su envío.
              </p>
            </div>
            <div className="mt-8">
                <TrackingModule />
            </div>
        </div>
      </section>
    </div>
  );
}
