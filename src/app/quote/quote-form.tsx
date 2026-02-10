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
import { useLanguage } from '@/context/language-context';

export function QuoteForm() {
  const { t } = useLanguage();

  return (
    <form
      action="https://formspree.io/f/mldqnpvo"
      method="POST"
      className="space-y-6"
    >
      <fieldset className="space-y-4">
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">{t('quotePage.form.contactLegend')}</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">{t('quotePage.form.fullName')}</Label>
            <Input id="fullName" name="fullName" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">{t('quotePage.form.company')}</Label>
            <Input id="companyName" name="companyName" placeholder="ACME Inc." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('quotePage.form.email')}</Label>
            <Input id="email" type="email" name="email" placeholder="su@email.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t('quotePage.form.phone')}</Label>
            <Input id="phone" type="tel" name="phone" placeholder="+34 600 000 000" required />
          </div>
        </div>
      </fieldset>
      
      <fieldset className="space-y-4">
        <legend className="font-headline text-lg font-semibold mb-2 border-b pb-2">{t('quotePage.form.shipmentLegend')}</legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="origin">{t('quotePage.form.origin')}</Label>
                <Input id="origin" name="origin" placeholder="Madrid" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="destination">{t('quotePage.form.destination')}</Label>
                <Input id="destination" name="destination" placeholder="Nueva York" required />
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="shipmentType">{t('quotePage.form.type')}</Label>
            <Select name="shipmentType" required>
                <SelectTrigger id="shipmentType">
                    <SelectValue placeholder={t('quotePage.form.typePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Terrestre">{t('quotePage.form.types.land')}</SelectItem>
                    <SelectItem value="Marítimo">{t('quotePage.form.types.sea')}</SelectItem>
                    <SelectItem value="Aéreo">{t('quotePage.form.types.air')}</SelectItem>
                    <SelectItem value="Logística y Almacén">{t('quotePage.form.types.logistics')}</SelectItem>
                    <SelectItem value="Otro">{t('quotePage.form.types.other')}</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label htmlFor="notes">{t('quotePage.form.notes')}</Label>
            <Textarea id="notes" name="notes" placeholder={t('quotePage.form.notesPlaceholder')} rows={4} />
        </div>
      </fieldset>
      
      <div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {t('quotePage.form.submit')}
        </Button>
      </div>
    </form>
  );
}