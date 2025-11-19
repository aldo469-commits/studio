'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitQuoteForm, type QuoteFormState } from './actions';
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

const quoteSchema = z.object({
  fullName: z.string().min(2, "El nombre completo es requerido."),
  companyName: z.string().optional(),
  email: z.string().email("Por favor, introduzca un correo electrónico válido."),
  phone: z.string().min(5, "El número de teléfono no es válido."),
  origin: z.string().min(2, "El origen es requerido."),
  destination: z.string().min(2, "El destino es requerido."),
  shipmentType: z.string().min(1, "Debe seleccionar un tipo de envío."),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? 'Enviando Solicitud...' : 'Solicitar Cotización'}
    </Button>
  );
}

export function QuoteForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState<QuoteFormState, FormData>(
    submitQuoteForm,
    { message: '' }
  );

  const { register, formState: { errors }, setValue } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: state.fields?.fullName || '',
      companyName: state.fields?.companyName || '',
      email: state.fields?.email || '',
      phone: state.fields?.phone || '',
      origin: state.fields?.origin || '',
      destination: state.fields?.destination || '',
      shipmentType: state.fields?.shipmentType || '',
      notes: state.fields?.notes || '',
    },
  });

  useEffect(() => {
    if (state.message) {
      if (state.issues) {
        toast({
          title: 'Error en la solicitud',
          description: 'Por favor, revise los campos marcados en rojo.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Solicitud Enviada',
          description: state.message,
          duration: 8000
        });
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  const renderError = (field: keyof QuoteFormData) =>
    errors[field] && <p className="mt-1 text-sm text-destructive">{errors[field]?.message}</p>;

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      {state.issues && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Errores en el formulario</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {state.issues.map((issue, index) => <li key={index}>{issue}</li>)}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <fieldset className="space-y-4">
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">Información de Contacto</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Input placeholder="Nombre Completo *" {...register('fullName')} />
            {renderError('fullName')}
          </div>
          <div>
            <Input placeholder="Nombre de la Empresa" {...register('companyName')} />
          </div>
          <div>
            <Input type="email" placeholder="Correo Electrónico *" {...register('email')} />
            {renderError('email')}
          </div>
          <div>
            <Input type="tel" placeholder="Teléfono *" {...register('phone')} />
            {renderError('phone')}
          </div>
        </div>
      </fieldset>
      
      <fieldset className="space-y-4">
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">Detalles del Envío</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <Input placeholder="Ciudad de Origen *" {...register('origin')} />
                {renderError('origin')}
            </div>
            <div>
                <Input placeholder="Ciudad de Destino *" {...register('destination')} />
                {renderError('destination')}
            </div>
        </div>
        <div>
            <Select onValueChange={(value) => setValue('shipmentType', value)} {...register('shipmentType')}>
                <SelectTrigger>
                    <SelectValue placeholder="Tipo de Envío *" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Terrestre">Transporte Terrestre</SelectItem>
                    <SelectItem value="Marítimo">Transporte Marítimo</SelectItem>
                    <SelectItem value="Aéreo">Transporte Aéreo</SelectItem>
                    <SelectItem value="Logística y Almacén">Logística y Almacén</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
            </Select>
            {renderError('shipmentType')}
        </div>
        <div>
            <Textarea placeholder="Notas adicionales (ej. tipo de mercancía, peso, dimensiones, etc.)" rows={4} {...register('notes')} />
        </div>
      </fieldset>
      
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
