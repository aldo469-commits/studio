'use client';

import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  email: z.string().email("El correo electrónico no es válido."),
  subject: z.string().min(1, "Debe seleccionar un asunto."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type ContactFormData = z.infer<typeof contactSchema>;


export function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onFormSubmit = async (data: ContactFormData) => {
    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Nuevo mensaje de contacto (simulado):", data);

    toast({
        title: 'Éxito',
        description: "¡Gracias por su mensaje! Nos pondremos en contacto con usted pronto.",
    });
    reset();
  };


  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Su Nombre</Label>
          <Input id="name" placeholder="John Doe" {...register('name')} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Su Correo Electrónico</Label>
          <Input id="email" type="email" placeholder="su@email.com" {...register('email')} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Asunto</Label>
        <Controller
            name="subject"
            control={control}
            render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <SelectTrigger id="subject" aria-invalid={!!errors.subject}>
                        <SelectValue placeholder="Seleccione un asunto" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Consulta General">Consulta General</SelectItem>
                        <SelectItem value="Soporte Técnico">Soporte Técnico</SelectItem>
                        <SelectItem value="Solicitud de Presupuesto">Solicitud de Presupuesto</SelectItem>
                        <SelectItem value="Prensa">Prensa</SelectItem>
                    </SelectContent>
                </Select>
            )}
        />
        {errors.subject && <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Su Mensaje</Label>
        <Textarea id="message" placeholder="Escriba aquí su consulta..." rows={6} {...register('message')} aria-invalid={!!errors.message} />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </Button>
      </div>
    </form>
  );
}
