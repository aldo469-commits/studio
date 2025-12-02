'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function QuoteForm() {
  return (
    <form
      action="https://formspree.io/f/mldqnpvo"
      method="POST"
      className="space-y-6"
    >
      <fieldset className="space-y-4">
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">Información de Contacto</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo *</Label>
            <Input id="fullName" name="fullName" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Nombre de la Empresa</Label>
            <Input id="companyName" name="companyName" placeholder="ACME Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input id="email" type="email" name="email" placeholder="su@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input id="phone" type="tel" name="phone" placeholder="+34 600 000 000" required />
          </div>
        </div>
      </fieldset>
      
      <fieldset className="space-y-4">
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">Detalles del Envío</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="origin">Ciudad de Origen *</Label>
                <Input id="origin" name="origin" placeholder="Madrid" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="destination">Ciudad de Destino *</Label>
                <Input id="destination" name="destination" placeholder="Nueva York" required />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="shipmentType">Tipo de Envío *</Label>
            <Select name="shipmentType" required>
                <SelectTrigger id="shipmentType">
                    <SelectValue placeholder="Seleccione un tipo de envío" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Terrestre">Transporte Terrestre</SelectItem>
                    <SelectItem value="Marítimo">Transporte Marítimo</SelectItem>
                    <SelectItem value="Aéreo">Transporte Aéreo</SelectItem>
                    <SelectItem value="Logística y Almacén">Logística y Almacén</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea id="notes" name="notes" placeholder="Ej. tipo de mercancía, peso, dimensiones, etc." rows={4} />
        </div>
      </fieldset>
      
      <div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            Solicitar Cotización
        </Button>
      </div>
    </form>
  );
}
