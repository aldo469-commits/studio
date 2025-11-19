'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function IncidentsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const incidentsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, `customers/${user.uid}/incidents`);
  }, [firestore, user]);

  const { data: incidents, isLoading } = useCollection(incidentsQuery);

  if (isUserLoading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleCreateIncident = async () => {
    if (!user) return;
    const incidentsCollection = collection(firestore, `customers/${user.uid}/incidents`);
    const newIncident = {
      customerId: user.uid,
      dateReported: serverTimestamp(),
      status: 'Open',
      description: 'Nueva incidencia reportada',
    };
    
    const docRefPromise = addDocumentNonBlocking(incidentsCollection, newIncident);
    docRefPromise.then(docRef => {
        if(docRef) {
            router.push(`/incidents/${docRef.id}`);
        }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">Mis Incidencias</h1>
        <Button onClick={handleCreateIncident}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Incidencia
        </Button>
      </div>
      
      {isLoading && <p>Cargando incidencias...</p>}

      {!isLoading && incidents?.length === 0 && (
        <Card className="text-center py-12">
            <CardHeader>
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle>No tiene incidencias</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Cuando cree una nueva incidencia, aparecerá aquí.</CardDescription>
            </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidents?.map(incident => (
          <Card key={incident.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="truncate">Incidencia #{incident.id.substring(0, 8)}</CardTitle>
              <CardDescription>{incident.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center text-sm text-muted-foreground">
                    <span className={`mr-2 h-2 w-2 rounded-full ${incident.status === 'Open' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    {incident.status}
                </div>
                 <p className="text-sm text-muted-foreground mt-2">
                    Reportado: {incident.dateReported ? new Date(incident.dateReported.seconds * 1000).toLocaleDateString('es-ES') : 'N/A'}
                </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/incidents/${incident.id}`}>
                  Ver Chat <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
