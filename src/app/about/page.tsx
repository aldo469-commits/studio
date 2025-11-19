import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Globe, HeartHandshake, Rocket } from 'lucide-react';

const values = [
  { icon: HeartHandshake, title: "Compromiso", description: "La confianza de nuestros clientes es nuestro activo más valioso." },
  { icon: Award, title: "Excelencia", description: "Buscamos la perfección en cada operación que gestionamos." },
  { icon: Globe, title: "Visión Global", description: "Conectamos mercados y personas con una perspectiva mundial." },
  { icon: Rocket, title: "Innovación", description: "Adoptamos la tecnología para ofrecer soluciones más inteligentes y eficientes." },
];

export default function AboutPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'about-hero');
  const teamImage = PlaceHolderImages.find(p => p.id === 'about-us-team');

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
            Sobre EJA TransGlobal
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="font-headline text-3xl md:text-4xl">Nuestra Historia</h2>
              <p>
                Fundada en 2005, EJA TransGlobal nació de la visión de tres expertos en logística con una pasión compartida: simplificar el comercio global. Comenzamos como una pequeña operación enfocada en el transporte terrestre en la península ibérica, pero nuestra dedicación a la excelencia y la satisfacción del cliente nos impulsó a crecer rápidamente.
              </p>
              <p>
                Hoy, somos una empresa de logística integral con presencia en los cinco continentes. A lo largo de los años, hemos expandido nuestros servicios para incluir transporte marítimo, aéreo y soluciones logísticas complejas, manteniendo siempre el espíritu de servicio personalizado que nos definió en nuestros inicios.
              </p>
            </div>
            <div>
              {teamImage && (
                <Image
                  src={teamImage.imageUrl}
                  alt={teamImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl w-full"
                  data-ai-hint={teamImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 className="font-headline text-3xl">Misión</h2>
                <p>Facilitar el comercio global a través de soluciones logísticas innovadoras, fiables y personalizadas, creando valor sostenible para nuestros clientes, empleados y socios.</p>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 className="font-headline text-3xl">Visión</h2>
                <p>Ser el socio logístico líder a nivel mundial, reconocido por nuestra excelencia operativa, nuestro compromiso con la sostenibilidad y nuestra capacidad para adaptarnos a un mundo en constante cambio.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Nuestros Valores</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Los pilares que guían cada una de nuestras decisiones y acciones.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
                <Card key={value.title} className="text-center p-6">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        <value.icon className="size-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold">{value.title}</h3>
                    <p className="mt-2 text-muted-foreground">{value.description}</p>
                </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
