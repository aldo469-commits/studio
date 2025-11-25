'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collectionGroup, query } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowRight, Tag, ShieldCheck, HardHat } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// Admin user is identified by this email address.
const ADMIN_EMAIL = 'admin@ejaglobaltrans.com';

export default function AdminIncidentsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const isAdmin = user?.email === ADMIN_EMAIL;

  const incidentsQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collectionGroup(firestore, `incidents`));
  }, [firestore, isAdmin]);

  const { data: incidents, isLoading } = useCollection(incidentsQuery);

  if (isUserLoading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }
  
  if (!isAdmin) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Alert variant="destructive">
                <HardHat className="h-4 w-4" />
                <AlertTitle>Acceso Denegado</AlertTitle>
                <AlertDescription>
                No tienes permisos para acceder a esta página.
                </AlertDescription>
            </Alert>
        </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
            <ShieldCheck className="size-8 text-primary"/>
            Panel de Administrador - Incidencias
        </h1>
      </div>
      
      {isLoading && <p>Cargando todas las incidencias...</p>}

      {!isLoading && incidents?.length === 0 && (
        <Card className="text-center py-12">
            <CardHeader>
                <CardTitle>No hay incidencias</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Actualmente no hay ninguna incidencia reportada por los clientes.</CardDescription>
            </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidents?.map(incident => (
          <Card key={incident.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="truncate">{incident.title}</CardTitle>
              <CardDescription>{incident.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <Badge variant={incident.status === 'Open' ? 'default' : 'secondary'}>
                        {incident.status}
                    </Badge>
                    {incident.category && (
                        <div className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
                            <Tag className="size-3"/>
                            <span>{incident.category}</span>
                        </div>
                    )}
                </div>
                 <p className="text-sm text-muted-foreground mt-4">
                    <span className='font-semibold'>Cliente ID:</span> {incident.customerId}
                </p>
                 <p className="text-sm text-muted-foreground mt-1">
                    <span className='font-semibold'>Reportado:</span> {incident.dateReported ? new Date(incident.dateReported.seconds * 1000).toLocaleDateString('es-ES') : 'N/A'}
                </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/admin/incidents/${incident.customerId}/${incident.id}`}>
                  Gestionar Incidencia <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
