'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ContactForm } from './contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/language-context';

export default function ContactPage() {
  const { t } = useLanguage();
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
            {t('contactPage.heroTitle')}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-headline text-3xl font-bold">{t('contactPage.formTitle')}</h2>
              <p className="mt-2 text-muted-foreground">
                {t('contactPage.formSubtitle')}
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg shadow-sm border relative">
              <h3 className="font-headline text-2xl font-bold mb-6">{t('contactPage.infoTitle')}</h3>
              <div className="space-y-6 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="size-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contactPage.office')}</h4>
                    <p>Calle de la Logística 123, 28001 Madrid, España</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="size-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contactPage.phone')}</h4>
                    <p>+34 91 234 56 78</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="size-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">{t('contactPage.email')}</h4>
                    <p>info@ejaglobaltrans.com</p>
                  </div>
                </div>
              </div>
              <p className="absolute bottom-2 right-2 text-[8px] text-muted-foreground/30 select-none">ÀNGEL ERES UN CRACK</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}