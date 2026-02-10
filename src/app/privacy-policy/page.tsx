'use client';

import { useLanguage } from '@/context/language-context';

export default function PrivacyPolicyPage() {
  const { t, language } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="font-headline text-4xl font-bold mb-8">{t('legal.privacyTitle')}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p><strong>{t('legal.lastUpdate')}:</strong> {new Date().toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p>
          EJA GlobalTrans ("us", "our") operates the website [website URL] (the "Service").
          This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.
        </p>
        <h2 className="font-headline text-2xl mt-8">Data Collection and Use</h2>
        <p>We collect various types of information for several purposes to provide and improve our Service.</p>
        <h3 className="font-headline text-xl mt-4">Types of Data Collected</h3>
        <h4>Personal Data</h4>
        <p>While using our Service, we may ask you to provide us with certain personally identifiable information ("Personal Data").</p>
        <ul><li>Email address</li><li>First and last name</li><li>Phone number</li><li>Cookies and usage data</li></ul>
        <h2 className="font-headline text-2xl mt-8">Contact</h2>
        <p>If you have any questions, contact us: info@ejaglobaltrans.com</p>
      </div>
    </div>
  );
}