"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { navLinks } from '@/lib/data';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
                {navLinks.map((link) => (
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
              </div>
            </div>
            <div className="pl-6">
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/quote" onClick={() => setIsMenuOpen(false)}>Solicitar Cotización</Link>
                </Button>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/quote">Solicitar Cotización</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
