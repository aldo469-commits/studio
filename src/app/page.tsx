'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Ship, Truck, Plane, Warehouse, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';
import { services } from '@/lib/data';

export default function Home() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-home');
  
  const whyChooseUs = t('home.whyUs') as any[];

  const serviceIcons: Record<string, any> = {
    'terrestre': <Truck className="size-8 text-primary" />,
    'maritimo': <Ship className="size-8 text-primary" />,
    'aereo': <Plane className="size-8 text-primary" />,
    'logistica': <Warehouse className="size-8 text-primary" />,
  };

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] min-h-[500px] w-full">
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
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter drop-shadow-2xl">
            {t('home.heroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90">
            {t('home.heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/quote">{t('home.ctaQuote')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link href="/services">{t('home.ctaServices')} <ArrowRight className="ml-2 size-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('home.servicesTitle')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('home.servicesSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 4).map((service) => (
              <Card key={service.slug} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                    {serviceIcons[service.slug] || <Truck className="size-8 text-primary" />}
                  </div>
                  <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.shortDescription}</p>
                  <Button variant="link" asChild className="mt-4 text-primary">
                    <Link href="/services">{t('home.learnMore')} <ArrowRight className="ml-2 size-4" /></Link>
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
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('home.whyUsTitle')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('home.whyUsSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.isArray(whyChooseUs) && whyChooseUs.map((item: any) => (
              <div key={item.title} className="flex flex-col items-center text-center p-4">
                <div className="flex-shrink-0 size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <CheckCircle className="size-6" />
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
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('home.ctaReady')}</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
              {t('home.ctaReadySubtitle')}
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/quote">{t('home.ctaFreeQuote')}</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
