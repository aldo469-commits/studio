'use client';

import { useLanguage } from '@/context/language-context';

export default function CookiePolicyPage() {
  const { t, language } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-headline text-4xl font-bold mb-8">{t('legal.cookieTitle')}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p><strong>{t('legal.lastUpdate')}:</strong> {new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>This Cookie Policy explains what cookies are and how we use them.</p>
        <h2 className="font-headline text-2xl mt-8">What are cookies?</h2>
        <p>Cookies are small text files stored in your browser when you visit a website.</p>
        <h2 className="font-headline text-2xl mt-8">Contact</h2>
        <p>If you have any questions: info@ejaglobaltrans.com</p>
      </div>
    </div>
  );
}