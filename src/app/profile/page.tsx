'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Building, LogOut, FileText, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type UserProfile = {
  name: string;
  company: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Cargando perfil...</div>;
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
      <Card>
        <CardHeader className="items-center text-center">
            <Avatar className='h-24 w-24 mb-4 text-3xl'>
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          <CardTitle className="text-3xl font-headline">{user.name}</CardTitle>
          <CardDescription className="text-lg">{user.company}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-muted rounded-md">
            <Building className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{user.company}</span>
          </div>
        </CardContent>
        <CardFooter className='flex-col gap-4'>
            <Button onClick={() => router.push('/documents')} className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Mis Documentos
            </Button>
            <Button onClick={() => router.push('/incidents')} className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Mis Incidencias
            </Button>
          <Button onClick={handleLogout} variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
