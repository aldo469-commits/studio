'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, FilePlus, Search, Box, Truck, FileText, MessageSquare, Building, User as UserIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '@/context/language-context';

type UserProfile = {
  name: string;
  company: string;
};

export default function DashboardPage() {
  const { t } = useLanguage();
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };
  
  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isLoading || !user) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  const options = [
    { title: t('dashboard.contracting'), icon: <FilePlus className="size-8 text-primary" />, href: "#" },
    { title: t('dashboard.tracking'), icon: <Search className="size-8 text-primary" />, href: "/tracking" },
    { title: t('dashboard.pickup'), icon: <Box className="size-8 text-primary" />, href: "#" },
    { title: t('dashboard.delivery'), icon: <Truck className="size-8 text-primary" />, href: "#" },
  ];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row gap-8">
            <aside className='md:w-1/3 lg:w-1/4'>
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className='h-24 w-24 mb-4 text-3xl'>
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-2xl font-headline">{user.name}</CardTitle>
                        <CardDescription className="text-md">{user.company}</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
                            <UserIcon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium truncate">{user.name}</span>
                        </div>
                        <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium truncate">{user.company}</span>
                        </div>
                    </CardContent>
                    <CardFooter className='flex-col gap-4'>
                        <Button onClick={handleLogout} variant="destructive" className="w-full">
                            <LogOut className="mr-2 h-4 w-4" />
                            {t('dashboard.logout')}
                        </Button>
                    </CardFooter>
                </Card>
            </aside>

            <section className='md:w-2/3 lg:w-3/4'>
                <div className='space-y-8'>
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">{t('dashboard.shortcuts')}</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button onClick={() => router.push('/documents')} size="lg" className="h-auto py-4 justify-start">
                                <FileText className="mr-4 h-6 w-6 flex-shrink-0" />
                                <div className='text-left'>
                                    <p className='font-bold'>{t('dashboard.myDocuments')}</p>
                                    <p className='font-normal text-sm text-primary-foreground/80'>{t('dashboard.myDocumentsDesc')}</p>
                                </div>
                            </Button>
                            <Button onClick={() => router.push('/incidents')} size="lg" className="h-auto py-4 justify-start">
                                <MessageSquare className="mr-4 h-6 w-6 flex-shrink-0" />
                                 <div className='text-left'>
                                    <p className='font-bold'>{t('dashboard.myIncidents')}</p>
                                    <p className='font-normal text-sm text-primary-foreground/80'>{t('dashboard.myIncidentsDesc')}</p>
                                </div>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold font-headline mb-4">{t('dashboard.operations')}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {options.map(option => (
                                <Card key={option.title} className="text-center hover:shadow-lg transition-shadow">
                                    <Link href={option.href} className="block h-full p-6">
                                        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                                            {option.icon}
                                        </div>
                                        <CardTitle className="font-headline text-lg">{option.title}</CardTitle>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
}