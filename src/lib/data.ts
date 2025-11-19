import type { LucideIcon } from 'lucide-react';
import { Truck, Ship, Plane, Warehouse, FileCheck2, Construction, Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react';

export const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/services', label: 'Servicios' },
  { href: '/locations', label: 'Ubicaciones' },
  { href: '/about', label: 'Nosotros' },
  { href: '/tracking', label: 'Seguimiento' },
  { href: '/contact', label: 'Contacto' },
  { href: '/incidents', label: 'Incidencias', auth: true },
  { href: '/login', label: 'Área Clientes', public: true },
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

export const officeLocations = [
  {
    city: "Madrid, España",
    address: "Calle de la Logística 123, 28001 Madrid",
    phone: "+34 91 234 56 78",
    type: "Sede Central",
    coords: { top: '39%', left: '48%' }
  },
  {
    city: "Ciudad de México, México",
    address: "Av. del Transporte 456, 06500 CDMX",
    phone: "+52 55 1234 5678",
    type: "Oficina Regional",
    coords: { top: '48%', left: '17%' }
  },
  {
    city: "Nueva York, EE. UU.",
    address: "100 Global Transit Ave, New York, NY 10001",
    phone: "+1 212 555 0199",
    type: "Oficina Comercial",
    coords: { top: '39%', left: '23%' }
  },
  {
    city: "Shanghái, China",
    address: "世纪大道88号, Pudong, Shanghái",
    phone: "+86 21 8765 4321",
    type: "Centro de Operaciones (Asia)",
    coords: { top: '43%', left: '85%' }
  },
  {
    city: "São Paulo, Brasil",
    address: "Av. Paulista 789, São Paulo - SP, 01311-913",
    phone: "+55 11 9876 5432",
    type: "Oficina Regional (LATAM)",
    coords: { top: '65%', left: '33%' }
  },
    {
    city: "Sídney, Australia",
    address: "Level 5, 45 Clarence St, Sydney NSW 2000",
    phone: "+61 2 1234 5678",
    type: "Oficina Comercial (Oceanía)",
    coords: { top: '69%', left: '92%' }
  },
];

export const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
];
