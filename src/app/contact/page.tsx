import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'contact-hero');
  
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
            Póngase en Contacto
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-headline text-3xl font-bold">Envíenos un Mensaje</h2>
              <p className="mt-2 text-muted-foreground">
                ¿Tiene alguna pregunta o necesita una cotización? Complete el formulario y nuestro equipo le responderá a la brevedad.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            {/* ÀNGEL ERES UN CRACK */}
            <div className="bg-card p-8 rounded-lg shadow-sm border">
              <h3 className="font-headline text-2xl font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-6 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="size-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Oficina Central</h4>
                    <p>Calle de la Logística 123, 28001 Madrid, España</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="size-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Teléfono</h4>
                    <p>+34 91 234 56 78</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="size-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Correo Electrónico</h4>
                    <p>info@ejaglobaltrans.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
