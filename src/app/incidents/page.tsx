'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { PlusCircle, MessageSquare, ArrowRight, Tag } from 'lucide-react';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/context/language-context';

export default function IncidentsPage() {
  const { t, language } = useLanguage();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newIncidentTitle, setNewIncidentTitle] = useState('');
  const [newIncidentDescription, setNewIncidentDescription] = useState('');
  const [newIncidentCategory, setNewIncidentCategory] = useState('');

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
    if (!user || !newIncidentTitle || !newIncidentDescription || !newIncidentCategory) return;
    const incidentsCollection = collection(firestore, `customers/${user.uid}/incidents`);
    const newIncident = {
      customerId: user.uid,
      dateReported: serverTimestamp(),
      status: 'Open',
      title: newIncidentTitle,
      description: newIncidentDescription,
      category: newIncidentCategory,
    };
    
    const docRefPromise = addDocumentNonBlocking(incidentsCollection, newIncident);
    setIsDialogOpen(false);
    setNewIncidentTitle('');
    setNewIncidentDescription('');
    setNewIncidentCategory('');

    docRefPromise.then(docRef => {
        if(docRef) {
            router.push(`/incidents/${docRef.id}`);
        }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">{t('incidents.title')}</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('incidents.newIncident')}
        </Button>
      </div>
      
      {isLoading && <p>Cargando...</p>}

      {!isLoading && incidents?.length === 0 && (
        <Card className="text-center py-12">
            <CardHeader>
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle>{t('incidents.noIncidents')}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{t('incidents.noIncidentsDesc')}</CardDescription>
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
                    <div className="flex items-center">
                        <span className={`mr-2 h-2 w-2 rounded-full ${incident.status === 'Open' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        {incident.status}
                    </div>
                    {incident.category && (
                        <div className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-md">
                            <Tag className="size-3"/>
                            <span>{incident.category}</span>
                        </div>
                    )}
                </div>
                 <p className="text-sm text-muted-foreground mt-2">
                    {t('incidents.reported')}: {incident.dateReported ? new Date(incident.dateReported.seconds * 1000).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US') : 'N/A'}
                </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/incidents/${incident.id}`}>
                  {t('incidents.viewChat')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('incidents.createDialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('incidents.createDialogDesc')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t('incidents.subject')}</Label>
              <Input
                id="title"
                value={newIncidentTitle}
                onChange={(e) => setNewIncidentTitle(e.target.value)}
                className="w-full"
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="category">{t('incidents.category')}</Label>
               <Select value={newIncidentCategory} onValueChange={setNewIncidentCategory}>
                  <SelectTrigger id="category">
                      <SelectValue placeholder={t('incidents.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Seguimiento del pedido">{t('incidents.categories.tracking')}</SelectItem>
                      <SelectItem value="Estado de la entrega">{t('incidents.categories.delivery')}</SelectItem>
                      <SelectItem value="Albarán">{t('incidents.categories.note')}</SelectItem>
                      <SelectItem value="Mercancía">{t('incidents.categories.goods')}</SelectItem>
                      <SelectItem value="Otro">{t('incidents.categories.other')}</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('incidents.description')}</Label>
              <Textarea
                id="description"
                value={newIncidentDescription}
                onChange={(e) => setNewIncidentDescription(e.target.value)}
                className="w-full"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">{t('incidents.cancel')}</Button>
            </DialogClose>
            <Button onClick={handleCreateIncident} disabled={!newIncidentTitle || !newIncidentDescription || !newIncidentCategory}>
              {t('incidents.create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}