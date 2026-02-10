"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, LogOut, User, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/icons';
import { useLanguage } from '@/context/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();

  useEffect(() => {
    const checkLoginStatus = () => {
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!user);
    };
    checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);
    return () => {
        window.removeEventListener('storage', checkLoginStatus);
    };
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    if(isMenuOpen) setIsMenuOpen(false);
    router.push('/login');
  };

  const navItems = [
    { href: '/', label: t('nav.home'), public: true },
    { href: '/services', label: t('nav.services'), public: true },
    { href: '/about', label: t('nav.about'), public: true },
    { href: '/tracking', label: t('nav.tracking'), public: true },
    { href: '/blog', label: t('nav.blog'), public: true },
    { href: '/contact', label: t('nav.contact'), public: true },
    { href: '/dashboard', label: t('nav.clientArea'), auth: true },
  ];

  const visibleNavLinks = navItems.filter(link => {
    if (isLoggedIn) return !link.public || link.href === '/';
    return link.public;
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {visibleNavLinks.map((link) => (
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
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            {!isLoggedIn && (
              <Button asChild size="sm">
                <Link href="/login">{t('nav.access')}</Link>
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
                    <Logo />
                  </Link>
                </div>
                <div className="p-6">
                  <div className="flex flex-col space-y-4">
                    {visibleNavLinks.map((link) => (
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
                    <div className="pt-4 border-t">
                      <p className="text-sm font-semibold mb-2">Idioma / Language</p>
                      <div className="flex gap-2">
                        <Button variant={language === 'es' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('es')}>ES</Button>
                        <Button variant={language === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('en')}>EN</Button>
                      </div>
                    </div>
                    {isLoggedIn && (
                      <button
                        onClick={handleLogout}
                        className="text-lg text-left text-foreground/60 transition-colors hover:text-foreground/80 flex items-center gap-2 pt-4"
                      >
                        <LogOut className="size-5" />
                        {t('nav.logout')}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('es')} className={cn(language === 'es' && "font-bold")}>
                Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')} className={cn(language === 'en' && "font-bold")}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isLoggedIn && (
             <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')} title={t('nav.clientArea')}>
                <User className="h-5 w-5" />
             </Button>
          )}

          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/quote">{t('nav.quote')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
