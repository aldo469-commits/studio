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

// Admin user is identified by this email address.
const ADMIN_EMAIL = 'admin@ejaglobaltrans.com';


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
  
  const isAdmin = user?.email === ADMIN_EMAIL;

  const navLinks = defaultNavLinks.filter(link => {
      // Hide auth-related, public, and admin links from the main nav
      if (link.auth || link.public || link.admin) {
          return false;
      }
      return true;
  });

  const authNav = user 
    ? { href: '/incidents', label: 'Mis Incidencias' }
    : { href: '/login', label: 'Área Clientes' };
    
  const adminNav = defaultNavLinks.find(link => link.admin);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo />
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
        
        {/* Mobile Header */}
        <div className="flex w-full items-center justify-between md:hidden">
          <Link href="/">
            <Logo className="w-32" />
          </Link>
          <div className="flex items-center gap-2">
            {!user && !isUserLoading && (
                <Button asChild size="sm">
                  <Link href="/login">Acceder</Link>
                </Button>
            )}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                  <div className="flex h-16 items-center border-b px-6">
                      <Link href="/" onClick={() => setIsMenuOpen(false)}>
                          <Logo className="w-32" />
                      </Link>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col space-y-4">
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
                      {isAdmin && adminNav && (
                        <Link
                          href={adminNav.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={cn(
                            'text-lg transition-colors hover:text-foreground/80 flex items-center gap-2',
                            pathname.startsWith(adminNav.href) ? 'text-primary font-semibold' : 'text-foreground/60'
                          )}
                        >
                          {adminNav.icon && <adminNav.icon className="size-5" />}
                          {adminNav.label}
                        </Link>
                      )}
                      {user && (
                          <button
                              onClick={handleLogout}
                              className="text-lg text-left text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-2"
                          >
                              <LogOut className="size-5" />
                              Cerrar Sesión
                          </button>
                      )}
                    </div>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden flex-1 items-center justify-end space-x-2 md:flex md:space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
             {isAdmin && adminNav && (
                <Link
                href={adminNav.href}
                className={cn(
                    'transition-colors hover:text-primary flex items-center gap-2',
                    pathname.startsWith(adminNav.href) ? 'text-primary font-semibold' : 'text-foreground/60'
                )}
                >
                {adminNav.icon && <adminNav.icon className="size-4" />}
                {adminNav.label}
                </Link>
             )}
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
