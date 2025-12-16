import type { Metadata } from 'next';
import './globals.css';
import { Inter, Roboto } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { ChatWidget } from '@/components/chatbot/ChatWidget';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Roboto({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'EJA GlobalTrans - Soluciones de Transporte y Logística',
  description: 'EJA GlobalTrans ofrece soluciones integrales de transporte y logística a nivel mundial. Expertos en carga terrestre, marítima y aérea.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <FirebaseClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
