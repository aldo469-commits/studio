'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`https://sheetdb.io/api/v1/qm90759o5g894/search?usuari=${encodeURIComponent(user)}&password=${encodeURIComponent(password)}&sheet=usuaris`);
      
      if (!response.ok) {
        throw new Error('Error en la connexió amb el servidor.');
      }

      const data = await response.json();

      if (data.length > 0) {
        const userData = data[0];
        // Guardar dades a localStorage
        localStorage.setItem('user', JSON.stringify({ name: userData.usuari, company: userData.empresa }));
        router.push('/profile');
      } else {
        setError("Dades incorrectes.");
      }

    } catch (err: any) {
      setError(err.message || "Hi ha hagut un problema. Intenta-ho de nou més tard.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Àrea de Clientes</CardTitle>
          <CardDescription>Inicie sesión para gestionar sus incidencias.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Error de inicio de sesión</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="user">Usuario</Label>
              <Input
                id="user"
                type="text"
                placeholder="Su usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
            <p className="text-muted-foreground">
                ¿No tiene una cuenta?{' '}
                <Link href="/register" className="font-medium text-primary hover:underline">
                    Regístrese aquí
                </Link>
            </p>
        </CardFooter>
      </Card>
    </div>
  );
}
