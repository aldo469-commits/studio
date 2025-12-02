'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/mldqnpvo"
      method="POST"
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Su Nombre</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Su Correo Electrónico</Label>
          <Input id="email" type="email" name="email" placeholder="su@email.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Asunto</Label>
        <Select name="subject" required>
          <SelectTrigger id="subject">
            <SelectValue placeholder="Seleccione un asunto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Consulta General">Consulta General</SelectItem>
            <SelectItem value="Soporte Técnico">Soporte Técnico</SelectItem>
            <SelectItem value="Solicitud de Presupuesto">Solicitud de Presupuesto</SelectItem>
            <SelectItem value="Prensa">Prensa</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Su Mensaje</Label>
        <Textarea id="message" name="message" placeholder="Escriba aquí su consulta..." rows={6} required />
      </div>

      <div>
        <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            Enviar Mensaje
        </Button>
      </div>
    </form>
  );
}
