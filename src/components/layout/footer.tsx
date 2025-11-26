import Link from 'next/link';
import { Logo } from '@/components/icons';
import { services, navLinks, socialLinks } from '@/lib/data';
import { Button } from '@/components/ui/button';

export function Footer() {
  const footerNavLinks = navLinks.filter(l => l.href !== '/');
  const footerServices = services.slice(0, 4);

  return (
    <footer className="bg-card border-t">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <Logo className="w-40" />
            <p className="text-sm text-muted-foreground">
              Su socio de confianza en soluciones de transporte y logística a nivel mundial.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="outline" size="icon" asChild>
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2">
              {footerNavLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Servicios Destacados</h3>
            <ul className="space-y-2">
              {footerServices.map(service => (
                <li key={service.slug}>
                  <Link href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Contacto</h3>
            <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Email:</strong> info@ejaglobaltrans.com</p>
                <p><strong>Teléfono:</strong> +34 91 234 56 78</p>
                <p>Calle de la Logística 123, 28001 Madrid, España</p>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EJA GlobalTrans. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Política de Cookies</Link>
            <Link href="#" className="hover:text-primary transition-colors">Política de Privacidad</Link>
            <Link href="#" className="hover:text-primary transition-colors">Aviso Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
