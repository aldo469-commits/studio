'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useCollection, useDoc, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Send, Tag, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { chat } from '@/ai/flows/chatbot';
import type { ChatInput } from '@/ai/flows/chatbot';

export default function IncidentChatPage() {
  const { incidentId } = useParams();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [newMessage, setNewMessage] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [isAiReplying]);

  const incidentRef = useMemoFirebase(() => {
    if (!user || !incidentId) return null;
    return doc(firestore, `customers/${user.uid}/incidents`, incidentId as string);
  }, [firestore, user, incidentId]);

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
      senderId: user.uid,
      messageText: userMessageText,
      sentDate: serverTimestamp(),
    };
    
    const messagesCollection = collection(incidentRef, 'messages');
    addDocumentNonBlocking(messagesCollection, userMessageData);
    
    setIsAiReplying(true);

    try {
        const history = (messages || []).map(m => ({
            role: m.senderId === user.uid ? 'user' : 'model',
            content: m.messageText
        }));
        history.push({ role: 'user', content: userMessageText });

        const chatInput: ChatInput = {
            history,
            incidentContext: {
                title: incident.title,
                description: incident.description,
                category: incident.category,
                status: incident.status,
            }
        };

        const result = await chat(chatInput);
        
        const botMessageData = {
            senderId: 'EJA-Bot',
            messageText: result.response,
            sentDate: serverTimestamp(),
        };
        addDocumentNonBlocking(messagesCollection, botMessageData);

    } catch (error) {
        console.error("AI reply error:", error);
        const errorMessageData = {
            senderId: 'EJA-Bot',
            messageText: "Lo siento, ha ocurrido un error al procesar mi respuesta. Un agente humano revisará su mensaje pronto.",
            sentDate: serverTimestamp(),
        };
        addDocumentNonBlocking(messagesCollection, errorMessageData);
    } finally {
        setIsAiReplying(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  if (isUserLoading || isIncidentLoading) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  if (!incident) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
        <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>No se pudo cargar la incidencia. Es posible que no exista o que no tenga permiso para verla.</AlertDescription>
        </Alert>
        <Button asChild variant="link" className="mt-4">
            <Link href="/incidents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Mis Incidencias
            </Link>
        </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <Button asChild variant="outline" size="sm" className="mb-4">
            <Link href="/incidents">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Mis Incidencias
            </Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">{incident.title}</CardTitle>
          <p className="text-muted-foreground">{incident.description}</p>
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
              className={`flex items-end gap-2 ${message.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
            >
              {message.senderId !== user?.uid && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>EJA</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md rounded-lg px-4 py-2 ${
                  message.senderId === user?.uid
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.messageText}</p>
                <p className={`text-xs mt-1 ${ message.senderId === user?.uid ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {message.sentDate ? new Date(message.sentDate.seconds * 1000).toLocaleTimeString('es-ES') : 'Enviando...'}
                </p>
              </div>
              {message.senderId === user?.uid && user && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user.displayName ? getInitials(user.displayName) : 'TÚ'}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
           {isAiReplying && (
                <div className="flex items-end gap-2 justify-start">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>EJA</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-3 py-2 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                </div>
            )}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
            <Input
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Escriba su mensaje..."
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
