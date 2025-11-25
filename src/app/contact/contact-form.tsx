'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitContactForm, type ContactFormState } from './actions';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Label } from '@/components/ui/label';

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido."),
  email: z.string().email("El correo electrónico no es válido."),
  subject: z.string().min(1, "Debe seleccionar un asunto."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

type ContactFormData = z.infer<typeof contactSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Enviando...' : 'Enviar Mensaje'}
    </Button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    {
      message: '',
    }
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
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

  useEffect(() => {
    if (state.message) {
      if (state.issues) {
        toast({
          title: 'Error en el formulario',
          description: state.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Éxito',
          description: state.message,
        });
        reset(); // Reset form fields on success
      }
    }
  }, [state, toast, reset]);
  
  const onFormSubmit = (data: ContactFormData) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if(value) {
            formData.append(key, value);
        }
    });
    formAction(formData);
  };


  return (
    <form
      ref={formRef}
      action={formAction} // We can still use the action for progressive enhancement
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-4"
    >
        {state.issues && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error al enviar el formulario</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {state.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

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
                <Select onValueChange={field.onChange} value={field.value}>
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
        <SubmitButton />
      </div>
    </form>
  );
}
