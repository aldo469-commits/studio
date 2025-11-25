'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';

type Message = {
    text: string;
    sender: 'user' | 'bot';
};

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "¡Hola! Soy el asistente virtual de EJA TransGlobal. ¿Cómo puedo ayudarte hoy?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Placeholder for bot response
        setTimeout(() => {
            const botMessage: Message = { text: "Gracias por tu mensaje. Estoy procesando tu solicitud...", sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50 bg-accent hover:bg-accent/90 text-accent-foreground"
                    aria-label="Abrir chat"
                >
                   {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
                side="top" 
                align="end" 
                className="w-[350px] md:w-[400px] h-[60vh] p-0 border-0 shadow-2xl rounded-lg mr-4 mb-2"
            >
                <Card className="h-full flex flex-col">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="font-headline text-lg">Asistente Virtual</CardTitle>
                            <CardDescription>EJA TransGlobal</CardDescription>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <ScrollArea className="flex-1 px-4">
                        <div className="space-y-4 py-4">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "flex items-end gap-2",
                                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    )}
                                >
                                    {message.sender === 'bot' && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>EJA</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                                            message.sender === 'user'
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <CardFooter className="pt-4 border-t">
                        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                autoComplete="off"
                            />
                            <Button type="submit" size="icon" disabled={!input.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    );
}