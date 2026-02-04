
import type { LucideIcon } from 'lucide-react';
import { Truck, Ship, Plane, Warehouse, FileCheck2, Construction, Facebook, Twitter, Linkedin, ShieldCheck, User as UserIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  auth?: boolean;
  public?: boolean;
  admin?: boolean;
  icon?: LucideIcon;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/about', label: 'Nosotros', public: true },
  { href: '/tracking', label: 'Seguimiento' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
  { href: '/dashboard', label: 'Área Cliente', auth: true, icon: UserIcon },
  { href: '/login', label: 'Acceder', public: true },
  { href: '/admin/incidents', label: 'Admin', admin: true, icon: ShieldCheck },
];

export type Service = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: LucideIcon;
  image: string;
};

export const services: Service[] = [
  {
    slug: 'terrestre',
    title: 'Transporte Terrestre',
    shortDescription: 'Soluciones eficientes y seguras para sus envíos por carretera.',
    longDescription: 'Ofrecemos una red de transporte terrestre completa que cubre todo el continente. Con una flota moderna y sistemas de seguimiento avanzados, garantizamos la entrega puntual y segura de su mercancía, ya sea carga completa (FTL) o grupaje (LTL).',
    icon: Truck,
    image: 'service-land',
  },
  {
    slug: 'maritimo',
    title: 'Transporte Marítimo',
    shortDescription: 'Cobertura global para cargas completas y consolidadas.',
    longDescription: 'Navegue los mercados globales con nuestros servicios de transporte marítimo. Gestionamos contenedores completos (FCL) y carga consolidada (LCL), ofreciendo soluciones flexibles y rentables para sus envíos internacionales, con conexiones a los principales puertos del mundo.',
    icon: Ship,
    image: 'service-sea',
  },
  {
    slug: 'aereo',
    title: 'Transporte Aéreo',
    shortDescription: 'La máxima velocidad para sus envíos más urgentes.',
    longDescription: 'Cuando el tiempo es crítico, nuestro servicio de transporte aéreo es la solución ideal. Colaboramos con las principales aerolíneas para ofrecerle tiempos de tránsito rápidos y fiabilidad para sus envíos urgentes, perecederos o de alto valor.',
    icon: Plane,
    image: 'service-air',
  },
  {
    slug: 'logistica',
    title: 'Almacenamiento y Logística',
    shortDescription: 'Gestión de inventario y almacenamiento a la medida de su negocio.',
    longDescription: 'Nuestras soluciones de almacenamiento y logística van más allá del simple depósito. Ofrecemos gestión de inventario, picking y packing, distribución y logística inversa en nuestras instalaciones estratégicamente ubicadas y equipadas con la última tecnología.',
    icon: Warehouse,
    image: 'service-logistics',
  },
  {
    slug: 'aduanas',
    title: 'Soluciones Aduaneras',
    shortDescription: 'Simplificamos el comercio internacional con una gestión aduanera experta.',
    longDescription: 'Navegar por las complejidades de las aduanas puede ser un desafío. Nuestro equipo de expertos en aduanas se encarga de todos los trámites, clasificaciones arancelarias y documentación para asegurar un despacho rápido y sin complicaciones de su mercancía.',
    icon: FileCheck2,
    image: 'service-customs',
  },
  {
    slug: 'proyectos',
    title: 'Carga de Proyectos',
    shortDescription: 'Transporte especializado para cargas sobredimensionadas y proyectos complejos.',
    longDescription: 'Gestionamos proyectos logísticos complejos de principio a fin. Desde el transporte de maquinaria pesada y componentes industriales hasta la coordinación de envíos para grandes proyectos de construcción, tenemos la experiencia para manejar las cargas más desafiantes.',
    icon: Construction,
    image: 'service-projects',
  },
];

export const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export type BlogAuthor = {
  name: string;
  avatarUrl?: string;
}

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: BlogAuthor;
  category: string;
  content?: string;
};

// La única imagen presente en la carpeta public
const AUTHOR_IMAGE = '/logo.png';

export const blogPosts: BlogPost[] = [
  {
    slug: 'futuro-logistica-4pl-hub-tarragona',
    title: 'EJA Globaltrans: Por qué el futuro de la logística 4PL pasa por el Hub de Tarragona',
    excerpt: 'En un mercado globalizado donde los márgenes del transporte son cada vez más estrechos, el éxito real se encuentra en la inteligencia logística y el modelo 4PL.',
    image: 'blog-supply-chain',
    date: '2025-11-25',
    author: { name: 'Alejandro Doncel', avatarUrl: AUTHOR_IMAGE },
    category: 'Estrategia',
    content: `
<p>En un mercado globalizado donde los márgenes del transporte son cada vez más estrechos, la verdadera ventaja competitiva ya no reside solo en mover mercancía de un punto A a un punto B. El éxito real se encuentra en la inteligencia logística: la capacidad de transformar el flujo de datos y la manipulación de producto en un ahorro directo de costes operativos.</p>

<p>En <strong>EJA Globaltrans</strong>, hemos nacido con una misión clara: ser el motor logístico que optimiza el corredor europeo desde nuestro enclave estratégico en el Polígono de Constantí (Tarragona).</p>

<h3 class="font-headline text-2xl mt-8 mb-4">De Transportistas a Socios Estratégicos (Modelo 4PL)</h3>
<p>¿Qué diferencia a EJA de una agencia de transporte convencional? La respuesta es la gestión integral. Mientras otros se limitan a buscar un camión, nosotros actuamos como el "cerebro" de su cadena de suministro. Nuestro modelo se basa en cuatro pilares de rentabilidad:</p>

<ul class="list-disc pl-6 space-y-2 mt-4">
  <li><strong>Agregación de Demanda:</strong> Optimizamos las cargas desde origen (Bélgica, Francia, Norte de Europa) consolidando grupajes en vehículos de gran volumen. Menos camiones, más eficiencia.</li>
  <li><strong>El Hub de Constantí como Centro de Valor:</strong> Nuestra ubicación, a un paso del Puerto de Tarragona y con conexión directa a la AP-7 y A-27, nos permite actuar como un pulmón operativo. Aquí, la mercancía no solo se guarda; se transforma. Realizamos controles de calidad, etiquetado y kitting, convirtiendo el "producto de fábrica" en "producto listo para el supermercado".</li>
  <li><strong>Milla de Oro y Distribución Capilar:</strong> Gestionamos la entrega Just-In-Time en las principales plataformas logísticas. Si el supermercado retrasa una ventana de descarga, nosotros absorbemos el impacto en nuestro almacén, eliminando los sobrecostes por esperas o camiones parados.</li>
  <li><strong>Logística Inversa Inteligente:</strong> Recuperamos los rechazos de plataforma de forma inmediata en nuestro Hub, evitando retornos costosos a origen y reintroduciendo el producto en la cadena de valor rápidamente.</li>
</ul>

<h3 class="font-headline text-2xl mt-8 mb-4">Tecnología y Ubicación: El Binomio Perfecto</h3>
<p>Estar situados en Constantí no es casualidad. Es una decisión estratégica para ofrecer una comunicación inmejorable con el Puerto de Tarragona y los principales polígonos industriales de la zona. Esta proximidad nos permite reducir drásticamente los "kilómetros en vacío", una obsesión en EJA Globaltrans para garantizar la sostenibilidad económica y ambiental de nuestros clientes.</p>

<h3 class="font-headline text-2xl mt-8 mb-4">Mucho más que transporte</h3>
<p>En EJA Globaltrans no vendemos fletes; vendemos tranquilidad operativa. Nuestro equipo, liderado por especialistas en ventas, multicanalidad y operaciones de almacén, trabaja con un único objetivo: que usted se olvide de la logística para centrarse en hacer crecer su negocio.</p>

<p class="mt-6 font-bold">¿Está su empresa lista para dar el salto al modelo 4PL? Bienvenidos a la logística del futuro. Bienvenidos a EJA Globaltrans.</p>
`
  },
  {
    slug: 'optimizando-cadena-suministro',
    title: '5 Claves para Optimizar tu Cadena de Suministro en 2025',
    excerpt: 'Descubre estrategias probadas para aumentar la eficiencia, reducir costes y mejorar la resiliencia de tu cadena de suministro en el competitivo mercado actual.',
    image: 'blog-supply-chain',
    date: '2025-11-20',
    author: { name: 'Alejandro Doncel', avatarUrl: AUTHOR_IMAGE },
    category: 'Logística',
  },
  {
    slug: 'transporte-maritimo-sostenible',
    title: 'El Futuro del Transporte Marítimo: Hacia una Logística más Sostenible',
    excerpt: 'El transporte marítimo se enfrenta a una transformación verde. Analizamos las últimas innovaciones en combustibles alternativos y tecnologías para un futuro más limpio.',
    image: 'blog-sea-freight',
    date: '2025-11-15',
    author: { name: 'Alejandro Doncel', avatarUrl: AUTHOR_IMAGE },
    category: 'Sostenibilidad',
  },
  {
    slug: 'impacto-ia-logistica',
    title: 'Inteligencia Artificial: La Revolución Silenciosa en la Logística',
    excerpt: 'Desde la optimización de rutas en tiempo real hasta la predicción de la demanda, la IA está redefiniendo la eficiencia en el sector logístico. ¿Está tu empresa preparada?',
    image: 'blog-ai',
    date: '2025-11-10',
    author: { name: 'Alejandro Doncel', avatarUrl: AUTHOR_IMAGE },
    category: 'Tecnología',
  },
  {
    slug: 'gestion-aduanas-eficiente',
    title: 'Cómo Evitar Retrasos: Guía para una Gestión de Aduanas Eficiente',
    excerpt: 'Los trámites aduaneros son un punto crítico en el comercio internacional. Te damos consejos prácticos para asegurar que tu mercancía cruce las fronteras sin problemas.',
    image: 'blog-customs',
    date: '2025-11-05',
    author: { name: 'Alejandro Doncel', avatarUrl: AUTHOR_IMAGE },
    category: 'Comercio Internacional',
  },
];
