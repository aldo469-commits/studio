import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Ship, Truck, Plane, Warehouse } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    title: 'Transporte Terrestre',
    description: 'Soluciones eficientes y seguras para sus envíos por carretera.',
    icon: <Truck className="size-8 text-primary" />,
    href: '/services',
  },
  {
    title: 'Transporte Marítimo',
    description: 'Cobertura global para cargas completas y consolidadas.',
    icon: <Ship className="size-8 text-primary" />,
    href: '/services',
  },
  {
    title: 'Transporte Aéreo',
    description: 'La máxima velocidad para sus envíos más urgentes.',
    icon: <Plane className="size-8 text-primary" />,
    href: '/services',
  },
  {
    title: 'Logística y Almacén',
    description: 'Gestión de inventario y almacenamiento a la medida de su negocio.',
    icon: <Warehouse className="size-8 text-primary" />,
    href: '/services',
  },
];

const whyChooseUs = [
    { title: "Red Global", description: "Conectamos su negocio con el mundo a través de nuestra extensa red de socios y oficinas." },
    { title: "Tecnología Avanzada", description: "Utilizamos la última tecnología para un seguimiento preciso y una gestión logística eficiente." },
    { title: "Atención Personalizada", description: "Un equipo de expertos dedicados a encontrar la mejor solución para cada uno de sus envíos." },
    { title: "Compromiso y Confianza", description: "Su tranquilidad es nuestra prioridad. Gestionamos cada envío con el máximo cuidado y profesionalidad." },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full">
        {heroImage && (
             <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
              />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter drop-shadow-2xl">
            Conectando su Mundo, Moviendo su Futuro
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            EJA TransGlobal: Su socio de confianza en soluciones de transporte y logística a nivel mundial.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/quote">Solicitar Cotización</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link href="/services">Nuestros Servicios <ArrowRight className="ml-2 size-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Nuestros Servicios Integrales</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Ofrecemos una gama completa de servicios para satisfacer todas sus necesidades logísticas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                  <Button variant="link" asChild className="mt-4 text-primary">
                    <Link href={service.href}>Saber más <ArrowRight className="ml-2 size-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section id="why-us" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">¿Por Qué Elegir EJA TransGlobal?</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              Somos más que una empresa de logística, somos su socio estratégico para el éxito.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <span className="font-bold text-xl">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-headline text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">¿Listo para optimizar su logística?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Contáctenos hoy y descubra cómo nuestras soluciones pueden impulsar su negocio.
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/quote">Obtener una Cotización Gratuita</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
