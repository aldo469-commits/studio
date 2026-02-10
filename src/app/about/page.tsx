'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { Award, Globe, HeartHandshake, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function AboutPage() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(p => p.id === 'about-hero');
  const teamImage = PlaceHolderImages.find(p => p.id === 'about-us-team');

  const values = [
    { icon: HeartHandshake, title: t('about.value1'), description: t('about.value1Desc') },
    { icon: Award, title: t('about.value2'), description: t('about.value2Desc') },
    { icon: Globe, title: t('about.value3'), description: t('about.value3Desc') },
    { icon: Rocket, title: t('about.value4'), description: t('about.value4Desc') },
  ];

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
            {t('about.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="font-headline text-3xl md:text-4xl">{t('about.historyTitle')}</h2>
              <p>{t('about.historyText1')}</p>
              <p>{t('about.historyText2')}</p>
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
                <h2 className="font-headline text-3xl">{t('about.missionTitle')}</h2>
                <p>{t('about.missionText')}</p>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
                <h2 className="font-headline text-3xl">{t('about.visionTitle')}</h2>
                <p>{t('about.visionText')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">{t('about.valuesTitle')}</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('about.valuesSubtitle')}
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