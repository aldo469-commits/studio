import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { QuoteForm } from './quote-form';

export default function QuotePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'quote-hero');
  
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
            Solicitar una Cotización
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="font-headline text-3xl font-bold">Detalles de su Envío</h2>
              <p className="mt-2 text-muted-foreground">
                Proporciónenos la información a continuación y le enviaremos una cotización personalizada.
              </p>
            </div>
            <div className="bg-card p-6 sm:p-8 rounded-lg shadow-sm border">
                <QuoteForm />
            </div>
        </div>
      </section>
    </div>
  );
}
