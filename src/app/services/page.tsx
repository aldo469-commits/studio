'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context';

export default function ServicesPage() {
  const { t } = useLanguage();
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
            {t('servicesPage.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('servicesPage.title')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('servicesPage.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, index) => {
              const serviceImage = PlaceHolderImages.find(p => p.id === service.image);
              return (
                <div key={service.slug} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                  <div className={`relative h-64 w-full rounded-lg overflow-hidden shadow-lg ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                    {serviceImage && (
                        <Image
                            src={serviceImage.imageUrl}
                            alt={serviceImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={serviceImage.imageHint}
                        />
                    )}
                  </div>
                  <div className="prose dark:prose-invert">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <service.icon className="size-6 text-primary" />
                        </div>
                        <h3 className="font-headline text-2xl mt-0 mb-0">{service.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{service.longDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('servicesPage.ctaTitle')}</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/80">
                {t('servicesPage.ctaSubtitle')}
                </p>
                <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/quote">{t('servicesPage.ctaButton')}</Link>
                </Button>
            </div>
      </section>
    </div>
  );
}