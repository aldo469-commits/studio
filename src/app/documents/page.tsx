'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, Printer, ArrowLeft, FileText, TriangleAlert } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

// Types based on SheetDB structure
type DocumentLine = {
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
  referencia?: string;
  pes?: string;
  volum?: string;
};

type UserData = {
  usuari: string;
  rol: 'admin' | 'administrador' | 'treballador' | 'client';
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
};

// User profile from localStorage
type UserProfile = {
  name: string;
  company: string;
  email: string;
};

type ProcessedInvoice = {
  invoiceNumber: string;
  date: string;
  userEmail: string;
  paymentMethod: string;
  lines: DocumentLine[];
  clientData?: UserData;
  subtotal: number;
  ivaBreakdown: { rate: number; base: number; quota: number }[];
  totalIva: number;
  grandTotal: number;
};

type ProcessedDeliveryNote = {
    deliveryNoteNumber: string;
    date: string;
    userEmail: string;
    clientData?: UserData;
    lines: DocumentLine[];
};

const API_URL = 'https://sheetdb.io/api/v1/qm90759o5g894';

function parseDateFromSheet(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.trim().split('/');
  if (parts.length === 3) {
    const [day, month, year] = parts.map(p => parseInt(p, 10));
    const date = new Date(year, month - 1, day);
    return isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
}

export default function DocumentsPage() {
  const { t, language } = useLanguage();
  const router = useRouter();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [documents, setDocuments] = useState<DocumentLine[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<ProcessedInvoice | null>(null);
  const [selectedDeliveryNote, setSelectedDeliveryNote] = useState<ProcessedDeliveryNote | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.email) {
            setUser(parsedUser);
        } else {
            router.push('/login');
        }
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setAuthLoading(false);
  }, [router]);

  useEffect(() => {
    if (authLoading || !user) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [usersRes, docsRes] = await Promise.all([
            fetch(`${API_URL}?sheet=usuaris`),
            fetch(`${API_URL}?sheet=documents`)
        ]);
        
        if (!usersRes.ok) throw new Error('No se pudieron cargar los datos de los usuarios.');
        if (!docsRes.ok) throw new Error('No se pudieron cargar los documentos.');
        
        const allUsers: UserData[] = await usersRes.json();
        const allDocs: DocumentLine[] = await docsRes.json();

        setUsers(allUsers);
        setDocuments(allDocs);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, authLoading]);

  const role = useMemo(() => {
     if (!users.length || !user) return null;
     const currentUserData = users.find(
      (u) => u.usuari && user?.email && u.usuari.trim().toLowerCase() === user.email.trim().toLowerCase()
    );
    return currentUserData?.rol?.trim().toLowerCase() as UserData['rol'] | null;
  }, [users, user]);

  const visibleDocuments = useMemo(() => {
    if (!user || !documents.length) return [];
    const isAdmin = role && ['admin', 'administrador', 'treballador'].includes(role);
    if (isAdmin) return documents;
    return documents.filter(doc => 
        doc.usuari && user.email && doc.usuari.trim().toLowerCase() === user.email.trim().toLowerCase()
    );
  }, [documents, user, role]);

  const processedInvoices = useMemo((): ProcessedInvoice[] => {
    if (!visibleDocuments.length || !users.length) return [];
    const invoiceDocs = visibleDocuments.filter(doc => doc.num_factura && doc.num_factura.trim() !== '');
    const groupedByInvoiceNumber = invoiceDocs.reduce<Record<string, DocumentLine[]>>((acc, doc) => {
      acc[doc.num_factura] = acc[doc.num_factura] || [];
      acc[doc.num_factura].push(doc);
      return acc;
    }, {});
    return Object.values(groupedByInvoiceNumber).map(lines => {
      const firstLine = lines[0];
      const clientData = users.find(u => u.usuari && firstLine.usuari && u.usuari.trim().toLowerCase() === firstLine.usuari.trim().toLowerCase());
      let subtotal = 0;
      const ivaBreakdown: Record<string, { base: number; quota: number, rate: number }> = {};
      lines.forEach(line => {
        const price = parseFloat(line.preu_unitari) || 0;
        const units = parseFloat(line.unitats) || 0;
        const discount = parseFloat(line.dte) || 0;
        const ivaRate = parseFloat(line.iva) || 0;
        const lineSubtotal = (price * units) * (1 - (discount / 100));
        subtotal += lineSubtotal;
        if (!ivaBreakdown[ivaRate]) {
          ivaBreakdown[ivaRate] = { base: 0, quota: 0, rate: ivaRate };
        }
        ivaBreakdown[ivaRate].base += lineSubtotal;
      });
      let totalIva = 0;
      Object.values(ivaBreakdown).forEach(item => {
        item.quota = item.base * (item.rate / 100);
        totalIva += item.quota;
      });
      return {
        invoiceNumber: firstLine.num_factura,
        date: firstLine.data,
        userEmail: firstLine.usuari,
        paymentMethod: firstLine.fpagament,
        lines: lines,
        clientData: clientData,
        subtotal: subtotal,
        ivaBreakdown: Object.values(ivaBreakdown),
        totalIva: totalIva,
        grandTotal: subtotal + totalIva,
      };
    }).sort((a, b) => {
      const dateA = parseDateFromSheet(a.date)?.getTime() || 0;
      const dateB = parseDateFromSheet(b.date)?.getTime() || 0;
      return dateB - dateA;
    });
  }, [visibleDocuments, users]);
  
  const processedDeliveryNotes = useMemo((): ProcessedDeliveryNote[] => {
    if (!visibleDocuments.length || !users.length) return [];
    const deliveryNoteDocs = visibleDocuments.filter(doc => doc.albara && doc.albara.trim() !== '');
    const groupedByDeliveryNote = deliveryNoteDocs.reduce<Record<string, DocumentLine[]>>((acc, doc) => {
      acc[doc.albara] = acc[doc.albara] || [];
      acc[doc.albara].push(doc);
      return acc;
    }, {});
    return Object.values(groupedByDeliveryNote).map(lines => {
      const firstLine = lines[0];
      const clientData = users.find(u => u.usuari && firstLine.usuari && u.usuari.trim().toLowerCase() === firstLine.usuari.trim().toLowerCase());
      return {
        deliveryNoteNumber: firstLine.albara,
        date: firstLine.data,
        userEmail: firstLine.usuari,
        clientData,
        lines,
      };
    }).sort((a, b) => {
      const dateA = parseDateFromSheet(a.date)?.getTime() || 0;
      const dateB = parseDateFromSheet(b.date)?.getTime() || 0;
      return dateB - dateA;
    });
  }, [visibleDocuments, users]);

  const handlePrint = () => {
    window.print();
  };

  if (authLoading) return <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[50vh]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (loading) return <div className="container mx-auto px-4 py-8 flex justify-center items-center h-[50vh]"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (error) return <div className="container mx-auto px-4 py-8"><Alert variant="destructive"><TriangleAlert className="h-4 w-4" /><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert></div>;

  if (selectedInvoice) {
    const formattedDate = parseDateFromSheet(selectedInvoice.date)?.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US') || selectedInvoice.date;
    return (
      <div className="container mx-auto px-4 py-8 bg-background print:bg-white print:p-0">
        <div className="flex gap-4 mb-6 print:hidden">
            <Button variant="outline" onClick={() => setSelectedInvoice(null)}><ArrowLeft className="mr-2 h-4 w-4" />{t('documents.backToList')}</Button>
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />{t('documents.printPdf')}</Button>
        </div>
        <div id="zona-factura" className="p-8 bg-white border rounded-lg shadow-sm text-black">
            <header className="flex justify-between items-start pb-4 border-b">
                <div><Logo className="h-8 mb-4"/><div className="text-xs text-gray-600 mt-6"><p className="font-bold text-sm text-black mb-1">EJA GlobalTrans</p><p>Calle de la Logística 123, 28001 Madrid, España</p><p>NIF: B12345678</p><p>info@ejaglobaltrans.com</p></div></div>
                <div className="text-right"><h2 className="text-2xl font-bold font-headline text-primary">{t('documents.invoices').toUpperCase()}</h2><p className="font-semibold">{t('documents.invoiceNum')} {selectedInvoice.invoiceNumber}</p><p>{t('blog.date')}: {formattedDate}</p></div>
            </header>
            <section className="my-6"><h3 className="font-semibold mb-2">{t('documents.clientData')}:</h3>{selectedInvoice.clientData ? (<div className="text-sm"><p className="font-bold">{selectedInvoice.clientData.empresa}</p><p>NIF: {selectedInvoice.clientData.fiscalid}</p><p>{selectedInvoice.clientData.adreca}</p><p>{t('contactPage.phone')}: {selectedInvoice.clientData.telefon}</p><p>{t('contactPage.email')}: {selectedInvoice.clientData.usuari}</p></div>) : (<p className="text-sm text-red-500">Error</p>)}</section>
            <section className="my-6">
                <Table>
                    <TableHeader><TableRow className="bg-gray-100"><TableHead className="w-1/2 text-black">{t('documents.concept')}</TableHead><TableHead className="text-right text-black">{t('documents.price')}</TableHead><TableHead className="text-right text-black">{t('documents.units')}</TableHead><TableHead className="text-right text-black">{t('documents.discount')}</TableHead><TableHead className="text-right text-black">{t('documents.total')}</TableHead></TableRow></TableHeader>
                    <TableBody>{selectedInvoice.lines.map((line, index) => {
                        const price = parseFloat(line.preu_unitari) || 0;
                        const units = parseFloat(line.unitats) || 0;
                        const discount = parseFloat(line.dte) || 0;
                        const lineTotal = (price * units) * (1 - (discount / 100));
                        return (<TableRow key={index} className="border-b"><TableCell className="text-black">{line.concepte}</TableCell><TableCell className="text-right text-black">{price.toFixed(2)}€</TableCell><TableCell className="text-right text-black">{units}</TableCell><TableCell className="text-right text-black">{discount}%</TableCell><TableCell className="text-right font-medium text-black">{lineTotal.toFixed(2)}€</TableCell></TableRow>);
                    })}</TableBody>
                </Table>
            </section>
            <section className="flex justify-end mt-6"><div className="w-full max-w-sm space-y-2"><div className="flex justify-between text-sm"><span>{t('documents.subtotal')}</span><span>{selectedInvoice.subtotal.toFixed(2)}€</span></div>{selectedInvoice.ivaBreakdown.map(iva => (<div key={iva.rate} className="flex justify-between text-sm"><span>IVA ({iva.rate}%) sobre {iva.base.toFixed(2)}€</span><span>{iva.quota.toFixed(2)}€</span></div>))}<div className="flex justify-between font-bold text-lg pt-2 border-t mt-2"><span>TOTAL</span><span>{selectedInvoice.grandTotal.toFixed(2)}€</span></div></div></section>
            <section className="my-6"><h3 className="font-semibold text-sm">{t('documents.paymentMethod')}:</h3><p className="text-sm">{selectedInvoice.paymentMethod}</p></section>
        </div>
      </div>
    );
  }

  if (selectedDeliveryNote) {
    const formattedDate = parseDateFromSheet(selectedDeliveryNote.date)?.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US') || selectedDeliveryNote.date;
    return (
      <div className="container mx-auto px-4 py-8 bg-background print:bg-white print:p-0">
        <div className="flex gap-4 mb-6 print:hidden">
            <Button variant="outline" onClick={() => setSelectedDeliveryNote(null)}><ArrowLeft className="mr-2 h-4 w-4" />{t('documents.backToList')}</Button>
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" />{t('documents.printPdf')}</Button>
        </div>
        <div id="zona-factura" className="p-8 bg-white border rounded-lg shadow-sm text-black">
            <header className="flex justify-between items-start pb-4 border-b">
                <div><Logo className="h-8 mb-4"/><div className="text-xs text-gray-600 mt-6"><p className="font-bold text-sm text-black mb-1">EJA GlobalTrans</p><p>Calle de la Logística 123, 28001 Madrid, España</p><p>NIF: B12345678</p></div></div>
                <div className="text-right"><h2 className="text-2xl font-bold font-headline text-primary">{t('documents.deliveryNotes').toUpperCase()}</h2><p className="font-semibold">{t('documents.noteNum')} {selectedDeliveryNote.deliveryNoteNumber}</p><p>{t('blog.date')}: {formattedDate}</p></div>
            </header>
            <section className="my-6"><h3 className="font-semibold mb-2">{t('documents.clientData')}:</h3>{selectedDeliveryNote.clientData ? (<div className="text-sm"><p className="font-bold">{selectedDeliveryNote.clientData.empresa}</p><p>NIF: {selectedDeliveryNote.clientData.fiscalid}</p></div>) : (<p className="text-sm text-red-500">Error</p>)}</section>
            <section className="my-6">
                <Table><TableHeader><TableRow className="bg-gray-100"><TableHead className="w-2/3 text-black">{t('documents.concept')}</TableHead><TableHead className="text-right text-black">{t('documents.units')}</TableHead></TableRow></TableHeader><TableBody>{selectedDeliveryNote.lines.map((line, index) => (<TableRow key={index} className="border-b"><TableCell className="text-black"><div className="font-medium">{line.concepte}</div><div className="text-xs text-gray-500 space-y-0.5 mt-1">{line.referencia && <p>Ref: {line.referencia}</p>}</div></TableCell><TableCell className="text-right text-black">{line.unitats}</TableCell></TableRow>))}</TableBody></Table>
            </section>
            <section className="mt-12 grid grid-cols-2 gap-8"><div className="border rounded p-4 h-32 flex flex-col justify-between"><p className="text-xs font-semibold">{t('documents.receivedBy')}:</p><div className="border-t pt-2 text-[10px] text-gray-500">{t('documents.signature')}</div></div><div className="border rounded p-4 h-32 flex flex-col justify-between"><p className="text-xs font-semibold">{t('documents.deliveredBy')}:</p><div className="border-t pt-2 text-[10px] text-gray-500">{t('documents.signature')}</div></div></section>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-headline">{t('documents.title')}</h1>
        {role && ['admin', 'administrador', 'treballador'].includes(role) && (<Badge>{t('documents.adminView')}</Badge>)}
      </div>
      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="invoices">{t('documents.invoices')}</TabsTrigger><TabsTrigger value="delivery-notes">{t('documents.deliveryNotes')}</TabsTrigger></TabsList>
        <TabsContent value="invoices" className="mt-6">
            {processedInvoices.length === 0 ? (
                <Card className="text-center py-12"><CardHeader><FileText className="mx-auto h-12 w-12 text-muted-foreground" /><CardTitle>{t('documents.noInvoices')}</CardTitle></CardHeader><CardContent><CardDescription>{t('documents.noInvoicesDesc')}</CardDescription></CardContent></Card>
            ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{processedInvoices.map(invoice => (<Card key={invoice.invoiceNumber} className="flex flex-col"><CardHeader><CardTitle>{t('documents.invoiceNum')} {invoice.invoiceNumber}</CardTitle><CardDescription>{t('blog.date')}: {parseDateFromSheet(invoice.date)?.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US') || invoice.date}</CardDescription></CardHeader><CardContent className="flex-grow"><p className="font-bold text-2xl mb-2">{invoice.grandTotal.toFixed(2)}€</p>{role && ['admin', 'administrador', 'treballador'].includes(role) && (<p className="text-sm text-muted-foreground">{invoice.clientData?.empresa || invoice.userEmail}</p>)}</CardContent><CardFooter><Button className="w-full" onClick={() => setSelectedInvoice(invoice)}>{t('documents.viewDetails')}</Button></CardFooter></Card>))}</div>)}
        </TabsContent>
        <TabsContent value="delivery-notes" className="mt-6">
           {processedDeliveryNotes.length === 0 ? (
                <Card className="text-center py-12"><CardHeader><FileText className="mx-auto h-12 w-12 text-muted-foreground" /><CardTitle>{t('documents.noNotes')}</CardTitle></CardHeader><CardContent><CardDescription>{t('documents.noNotesDesc')}</CardDescription></CardContent></Card>
            ) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{processedDeliveryNotes.map(note => (<Card key={note.deliveryNoteNumber} className="flex flex-col"><CardHeader><CardTitle>{t('documents.noteNum')} {note.deliveryNoteNumber}</CardTitle><CardDescription>{t('blog.date')}: {parseDateFromSheet(note.date)?.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US') || note.date}</CardDescription></CardHeader><CardContent className="flex-grow"><p className='text-sm text-muted-foreground'>{note.lines.length} {note.lines.length === 1 ? 'línea' : 'líneas'}</p>{role && ['admin', 'administrador', 'treballador'].includes(role) && (<p className="text-sm text-muted-foreground mt-2">{note.clientData?.empresa || note.userEmail}</p>)}</CardContent><CardFooter><Button className="w-full" onClick={() => setSelectedDeliveryNote(note)}>{t('documents.viewDetails')}</Button></CardFooter></Card>))}</div>)}
        </TabsContent>
      </Tabs>
    </div>
  );
}