'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function IncidentsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIncidentTitle, setNewIncidentTitle] = useState('');
  const [newIncidentDescription, setNewIncidentDescription] = useState('');

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
    if (!user || !newIncidentTitle || !newIncidentDescription) return;
    const incidentsCollection = collection(firestore, `customers/${user.uid}/incidents`);
    const newIncident = {
      customerId: user.uid,
      dateReported: serverTimestamp(),
      status: 'Open',
      title: newIncidentTitle,
      description: newIncidentDescription,
    };
    
    const docRefPromise = addDocumentNonBlocking(incidentsCollection, newIncident);
    setIsDialogOpen(false);
    setNewIncidentTitle('');
    setNewIncidentDescription('');

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
        <Button onClick={() => setIsDialogOpen(true)}>
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
              <CardTitle className="truncate">{incident.title}</CardTitle>
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

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Incidencia</DialogTitle>
            <DialogDescription>
              Describa su problema a continuación. Un agente se pondrá en contacto en breve.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Asunto
              </Label>
              <Input
                id="title"
                value={newIncidentTitle}
                onChange={(e) => setNewIncidentTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={newIncidentDescription}
                onChange={(e) => setNewIncidentDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleCreateIncident} disabled={!newIncidentTitle || !newIncidentDescription}>Crear Incidencia</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
