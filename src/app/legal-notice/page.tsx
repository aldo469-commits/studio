'use client';

import { useLanguage } from '@/context/language-context';

export default function LegalNoticePage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-headline text-4xl font-bold mb-8">{t('legal.noticeTitle')}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="font-headline text-2xl mt-8">1. IDENTIFICATION DATA</h2>
        <p>
          In compliance with the information obligation in Article 10 of Law 34/2002, the company owner of the domain is EJA GlobalTrans.
        </p>
        <h2 className="font-headline text-2xl mt-8">2. USERS</h2>
        <p>Access and/or use of this portal attributes the condition of USER.</p>
        <h2 className="font-headline text-2xl mt-8">Contact</h2>
        <p>info@ejaglobaltrans.com</p>
      </div>
    </div>
  );
}