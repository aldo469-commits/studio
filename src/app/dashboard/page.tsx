'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, FilePlus, Search, Box, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type UserProfile = {
  name: string;
  company: string;
};

const options = [
    { title: "Contratación", icon: <FilePlus className="size-8 text-primary" />, href: "#" },
    { title: "Seguimiento", icon: <Search className="size-8 text-primary" />, href: "/tracking" },
    { title: "Recogida", icon: <Box className="size-8 text-primary" />, href: "#" },
    { title: "Entrega", icon: <Truck className="size-8 text-primary" />, href: "#" },
];

export default function DashboardPage() {
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

  if (isLoading || !user) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
        <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-headline font-bold">
                Benvingut a la teva zona privada, {user.name}
            </h1>
            <p className="text-muted-foreground mt-2">{user.company}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {options.map(option => (
                <Card key={option.title} className="text-center hover:shadow-lg transition-shadow">
                    <Link href={option.href} className="block h-full">
                        <CardHeader>
                            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-2">
                                {option.icon}
                            </div>
                            <CardTitle className="font-headline text-lg">{option.title}</CardTitle>
                        </CardHeader>
                    </Link>
                </Card>
            ))}
        </div>
        
        <div className="flex justify-center">
            <Button onClick={handleLogout} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sortir
            </Button>
        </div>
    </div>
  );
}
