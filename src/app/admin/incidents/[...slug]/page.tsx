'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCollection, useDoc, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Tag, Loader2, HardHat } from 'lucide-react';
import Link from 'next/link';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { chat } from '@/ai/flows/chatbot';
import type { ChatInput } from '@/ai/flows/chatbot';

const ADMIN_EMAIL = 'admin@ejaglobaltrans.com';

export default function AdminIncidentChatPage() {
  const params = useParams();
  const { slug } = params;
  const [customerId, incidentId] = Array.isArray(slug) ? slug : [null, null];

  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const [newMessage, setNewMessage] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [isAiReplying, isUserLoading]);

  const incidentRef = useMemoFirebase(() => {
    if (!isAdmin || !customerId || !incidentId) return null;
    return doc(firestore, `customers/${customerId}/incidents`, incidentId as string);
  }, [firestore, isAdmin, customerId, incidentId]);

  const { data: incident, isLoading: isIncidentLoading } = useDoc(incidentRef);

  const messagesQuery = useMemoFirebase(() => {
    if (!incidentRef) return null;
    return query(collection(incidentRef, 'messages'), orderBy('sentDate', 'asc'));
  }, [incidentRef]);

  const { data: messages, isLoading: areMessagesLoading } = useCollection(messagesQuery);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !incidentRef || !incident) return;

    const userMessageText = newMessage;
    setNewMessage('');

    const userMessageData = {
      senderId: 'EJA-Bot', // Admin sends as EJA-Bot
      messageText: userMessageText,
      sentDate: serverTimestamp(),
    };
    
    const messagesCollection = collection(incidentRef, 'messages');
    addDocumentNonBlocking(messagesCollection, userMessageData);
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isUserLoading || isIncidentLoading) {
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

  if (!incident) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
        <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>No se pudo cargar la incidencia. Es posible que no exista o que los datos sean incorrectos.</AlertDescription>
        </Alert>
        <Button asChild variant="link" className="mt-4">
            <Link href="/admin/incidents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Panel de Administrador
            </Link>
        </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/admin/incidents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Incidencias
            </Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{incident.title}</CardTitle>
          <CardDescription>
            Incidencia de cliente: <span className="font-mono text-xs">{customerId}</span>
          </CardDescription>
          <p className="text-muted-foreground pt-2">{incident.description}</p>
          <div className="flex items-center text-sm pt-2 gap-4">
            <div className="flex items-center">
              <span className={`mr-2 h-2 w-2 rounded-full ${incident.status === 'Open' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              {incident.status}
            </div>
            {incident.category && (
              <div className="flex items-center gap-1.5 text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  <Tag className="size-3"/>
                  <span>{incident.category}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent ref={scrollAreaRef} className="h-[50vh] overflow-y-auto p-6 flex flex-col gap-4">
          {areMessagesLoading && <p>Cargando mensajes...</p>}
          {messages?.map(message => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.senderId === customerId ? 'justify-start' : 'justify-end'}`}
            >
              {message.senderId === customerId && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md rounded-lg px-4 py-2 ${
                  message.senderId !== customerId
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.messageText}</p>
                <p className={`text-xs mt-1 ${ message.senderId !== customerId ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {message.sentDate ? new Date(message.sentDate.seconds * 1000).toLocaleTimeString('es-ES') : 'Enviando...'}
                </p>
              </div>
              {message.senderId !== customerId && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>EJA</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isAiReplying && (
                <div className="flex items-end gap-2 justify-end">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>EJA</AvatarFallback>
                    </Avatar>
                    <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                </div>
            )}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Escriba su respuesta como agente..."
              autoComplete="off"
              disabled={isAiReplying}
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim() || isAiReplying}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
