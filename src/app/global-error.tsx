'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-4">
                        <AlertCircle className="size-8 text-destructive" />
                    </div>
                    <CardTitle className="font-headline text-2xl">Algo ha salido mal</CardTitle>
                    <CardDescription>
                        Se ha producido un error inesperado en la aplicación.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Puedes intentar recargar la página o volver a la página de inicio.
                    </p>
                    {error?.message && (
                        <details className="text-left bg-muted p-3 rounded-md text-xs">
                            <summary className="cursor-pointer font-medium">Detalles del error</summary>
                            <pre className="mt-2 whitespace-pre-wrap font-mono">
                                {error.message}
                                {error.digest && `\nDigest: ${error.digest}`}
                            </pre>
                        </details>
                    )}
                    <div className="flex justify-center gap-4">
                         <Button onClick={() => reset()} variant="outline">
                            Intentar de nuevo
                        </Button>
                        <Button asChild>
                            <a href="/">Volver al Inicio</a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </body>
    </html>
  );
}
