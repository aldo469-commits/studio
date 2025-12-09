'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function AssistentPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse('');
    setError(null);

    const messages: Message[] = [{ role: 'user', content: prompt }];

    try {
      const res = await fetch('/api/mistral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data.content);
    } catch (err: any) {
      setError(err.message || 'Hi ha hagut un problema en contactar l\'assistent.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12 md:py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Assistent IA</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Fes una pregunta o demana el que necessitis.
        </p>
      </div>

      <Card className="mb-8 shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Quines són les tendències en logística sostenible?"
              className="flex-grow text-base h-12"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className="h-12 text-base w-full sm:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-5 w-5" />
              )}
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive bg-destructive/10 text-destructive-foreground">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      )}

      {response && (
        <Card className="animate-in fade-in-50 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
              Resposta de l'Assistent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none">
                <p>{response}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
