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
import { useLanguage } from '@/context/language-context';

export function ContactForm() {
  const { t } = useLanguage();

  return (
    <form
      action="https://formspree.io/f/mldqnpvo"
      method="POST"
      className="space-y-4"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t('contactPage.form.name')}</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('contactPage.form.email')}</Label>
          <Input id="email" type="email" name="email" placeholder="su@email.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t('contactPage.form.subject')}</Label>
        <Select name="subject" required>
          <SelectTrigger id="subject">
            <SelectValue placeholder={t('contactPage.form.subjectPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Consulta General">{t('contactPage.form.subjects.general')}</SelectItem>
            <SelectItem value="Soporte Técnico">{t('contactPage.form.subjects.support')}</SelectItem>
            <SelectItem value="Solicitud de Presupuesto">{t('contactPage.form.subjects.quote')}</SelectItem>
            <SelectItem value="Prensa">{t('contactPage.form.subjects.press')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('contactPage.form.message')}</Label>
        <Textarea id="message" name="message" placeholder={t('contactPage.form.messagePlaceholder')} rows={6} required />
      </div>

      <div>
        <Button type="submit" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
            {t('contactPage.form.submit')}
        </Button>
      </div>
    </form>
  );
}