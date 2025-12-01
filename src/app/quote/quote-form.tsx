'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { useToast } from '@/hooks/use-toast';

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


export function QuoteForm() {
  const { toast } = useToast();

  const { control, register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      origin: '',
      destination: '',
      shipmentType: '',
      notes: '',
    },
  });
  
  const onFormSubmit = async (data: QuoteFormData) => {
    // Simulate processing quote and sending email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Nueva solicitud de cotización (simulada):", data);

    toast({
      title: 'Solicitud Enviada',
      description: "¡Gracias por su solicitud! Hemos recibido su información y uno de nuestros especialistas se pondrá en contacto con usted en breve para proporcionarle su cotización.",
      duration: 8000
    });
    reset();
  };
  
  const renderError = (field: keyof QuoteFormData) =>
    errors[field] && <p className="mt-1 text-sm text-destructive">{errors[field]?.message}</p>;

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <fieldset className="space-y-4" disabled={isSubmitting}>
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">Información de Contacto</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre Completo *</Label>
            <Input id="fullName" placeholder="John Doe" {...register('fullName')} />
            {renderError('fullName')}
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Nombre de la Empresa</Label>
            <Input id="companyName" placeholder="ACME Inc." {...register('companyName')} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input id="email" type="email" placeholder="su@email.com" {...register('email')} />
            {renderError('email')}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono *</Label>
            <Input id="phone" type="tel" placeholder="+34 600 000 000" {...register('phone')} />
            {renderError('phone')}
          </div>
        </div>
      </fieldset>
      
      <fieldset className="space-y-4" disabled={isSubmitting}>
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">Detalles del Envío</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="origin">Ciudad de Origen *</Label>
                <Input id="origin" placeholder="Madrid" {...register('origin')} />
                {renderError('origin')}
            </div>
            <div className="space-y-2">
                <Label htmlFor="destination">Ciudad de Destino *</Label>
                <Input id="destination" placeholder="Nueva York" {...register('destination')} />
                {renderError('destination')}
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="shipmentType">Tipo de Envío *</Label>
             <Controller
                name="shipmentType"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                )}
            />
            {renderError('shipmentType')}
        </div>
        <div className="space-y-2">
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea id="notes" placeholder="Ej. tipo de mercancía, peso, dimensiones, etc." rows={4} {...register('notes')} />
        </div>
      </fieldset>
      
      <div>
        <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isSubmitting ? 'Enviando Solicitud...' : 'Solicitar Cotización'}
        </Button>
      </div>
    </form>
  );
}
