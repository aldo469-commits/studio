"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { navLinks as defaultNavLinks } from '@/lib/data';
import { useUser, useAuth } from '@/firebase';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
    setIsMenuOpen(false);
  }

  const navLinks = defaultNavLinks.filter(link => {
      if (link.href === '/incidents' || link.href === '/login') {
          return false; // Always hide these from the main nav
      }
      return true;
  });

  const authNav = user 
    ? { href: '/incidents', label: 'Mis Incidencias' }
    : { href: '/login', label: 'Área Clientes' };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo className="w-40" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <div className="flex-1 md:hidden">
            <Link href="/" className="flex justify-center">
              <Logo className="w-32" />
            </Link>
          </div>
          <SheetContent side="left" className="pr-0">
            <div className="flex items-center justify-between">
                <Link href="/" className="mr-6" onClick={() => setIsMenuOpen(false)}>
                    <Logo className="w-40" />
                </Link>
                <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Cerrar menú</span>
                </Button>
            </div>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {[...navLinks, authNav].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'text-lg transition-colors hover:text-foreground/80',
                      pathname === link.href ? 'text-foreground font-semibold' : 'text-foreground/60'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                 {user && (
                    <button
                        onClick={handleLogout}
                        className="text-lg text-left text-foreground/60 transition-colors hover:text-foreground/80"
                    >
                        Cerrar Sesión
                    </button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
             <Link
                href={authNav.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname.startsWith(authNav.href) ? 'text-foreground font-semibold' : 'text-foreground/60'
                )}
              >
                {authNav.label}
              </Link>
          </nav>

          {user && !isUserLoading && (
            <Button onClick={handleLogout} variant="ghost" size="icon" className="hidden md:inline-flex" title="Cerrar Sesión">
                <LogOut className="h-5 w-5" />
            </Button>
          )}

          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/quote">Solicitar Cotización</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
