
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PuntalSelector from '@/components/puntal-selector';
import { Phone, Menu, X, CheckCircle, Shield, Users, Truck, Clock, PackageCheck, Quote, Wrench, Layers, Anchor, Waves, Building2 } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { Button } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { UrgentMaterialModal } from '@/components/urgent-material-modal';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Autoplay from "embla-carousel-autoplay";
import { FacebookIcon, TikTokIcon } from '@/components/icons';
import { Instagram } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Flipbook } from '@/components/flipbook';


const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#modelos', label: 'Cotizador' },
  { href: '#accesorios', label: 'Accesorios' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#beneficios', label: 'Beneficios' },
  { href: '#especificaciones', label: 'Ficha Técnica' },
  { href: '#galeria', label: 'Galería' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#clientes', label: 'Clientes' },
  { href: '#contacto', label: 'Contacto' },
];

const clientes = [
  { name: 'BBVA', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/15/BBVA_Bancomer_logo.svg' },
  { name: 'Aeropuerto Internacional Felipe Ángeles', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/60/010aeropuerto-felipe-angeles-2.jpg' },
  { name: 'Secretaría de Marina', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/SEMAR_Logo_2019.svg/2560px-SEMAR_Logo_2019.svg.png' },
  { name: 'UNAM', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Escudo-UNAM-escalable.svg/1024px-Escudo-UNAM-escalable.svg.png' },
];

const beneficios = [
  {
    icon: Truck,
    title: 'Entrega en Menos de 24h',
    description: 'Recibe tu material en obra con nuestra garantía de entrega express para no detener tu proyecto.'
  },
  {
    icon: Shield,
    title: 'Seguridad Certificada',
    description: 'Fabricados en acero S235JR bajo norma europea UNE-EN 1065, con tablas de carga verificadas y un factor de seguridad de 1.7 respecto al valor de ruptura, según el documento de certificación de fábrica.'
  },
  {
    icon: CheckCircle,
    title: 'Ajuste Preciso cada 10 cm',
    description: 'Regulación de altura mediante pin de acero reforzado de 14 mm de diámetro, para agilizar el proceso de fundición de losa y optimizar los tiempos de montaje.'
  },
  {
    icon: Users,
    title: 'Durabilidad Certificada',
    description: 'Pintura electrostática probada en cámara de humedad bajo norma ASTM D2247-87, y soldadura con registro de cualificación ISO 15613:2005 (certificado No. P16W.0122), bajo regulación de fabricación UNI EN 729-2:1996.'
  }
];

const especificacionesTecnicas = [
  {
    nombre: 'Puntal Telescópico 1.80 – 3.00 m',
    fabricacion: 'Fabricado bajo norma europea en Italia',
    altura: '1.80 a 3.00 m',
    resistenciaMin: { altura: '1.80 m', carga: '1,800 kg' },
    resistenciaMax: { altura: '3.00 m', carga: '801 kg' },
    tuboInterior: 'Ø 48.30 mm · espesor 1.8/2.0 mm',
    tuboExterior: 'Ø 56.00 mm · espesor 1.8 mm',
    base: '120 × 120 × 4.5 mm',
    peso: '10.06 kg (22.13 lb)',
  },
  {
    nombre: 'Puntal Telescópico 2.20 – 4.00 m',
    fabricacion: 'Fabricado bajo norma europea en Italia',
    altura: '2.20 a 4.00 m',
    resistenciaMin: { altura: '2.20 m', carga: '1,800 kg' },
    resistenciaMax: { altura: '4.00 m', carga: '758 kg' },
    tuboInterior: 'Ø 48.30 mm · espesor 1.8/2.0 mm',
    tuboExterior: 'Ø 56.00 mm · espesor 1.8 mm',
    base: '120 × 120 × 4.5 mm',
    peso: '11.00 kg (24.25 lb)',
  },
  {
    nombre: 'Puntal B50 2.80 – 5.00 m',
    fabricacion: 'Fabricado bajo norma europea en Italia',
    altura: '2.80 a 5.00 m',
    resistenciaMin: { altura: '2.80 m', carga: '1,800 kg' },
    resistenciaMax: { altura: '5.00 m', carga: '300 kg' },
    tuboInterior: 'Ø 48.30 mm · espesor 1.8/2.0 mm',
    tuboExterior: 'Ø 56.00 mm · espesor 1.8 mm',
    base: '120 × 120 × 4.5 mm',
    peso: '14.00 kg (30.86 lb)',
  },
  {
    nombre: 'Puntal B40 de Placa 2.31 – 4.00 m',
    fabricacion: 'Fabricado bajo norma UNI EN 729-2 en Italia',
    altura: '2.31 a 4.00 m',
    resistenciaMin: { altura: '2.31 m', carga: '3,059 kg' },
    resistenciaMax: { altura: '4.00 m', carga: '1,019 kg' },
    tuboInterior: 'Ø 48.30 mm',
    tuboExterior: 'Ø 56.00 mm',
    base: '120 × 120 × 4.5 mm',
    peso: '—',
  },
];

const certificaciones = [
  {
    icon: PackageCheck,
    title: 'Ajuste cada 10 cm',
    description: 'Regulación de altura mediante pin de acero reforzado de 14 mm de diámetro, para agilizar el proceso de fundición de losa.',
  },
  {
    icon: Shield,
    title: 'Factor de seguridad 1.7',
    description: 'La tabla de capacidades de resistencia por altura se basa en el documento de certificación de fábrica, con un factor de seguridad de 1.7 respecto al valor de ruptura.',
  },
  {
    icon: CheckCircle,
    title: 'Prueba de humedad ASTM D2247-87',
    description: 'El puntal pasa por una prueba de humedad en cámara con pintura electrostática, bajo la norma ASTM D2247-87.',
  },
  {
    icon: Wrench,
    title: 'Soldadura certificada ISO 15613:2005',
    description: 'Registro de cualificación del proceso de soldadura según ISO 15613:2005, certificado No. P16W.0122.',
  },
];

const featuredProducts = [
    {
        name: 'Junta Ortogonal 4 Tornillos en Chapa Prensada',
        description: 'Asegura uniones firmes y estables a 90 grados en andamios. Esencial para la seguridad estructural.',
        image: '/images/Productos/junta-ortogonal-4-tornillos.png',
        hint: 'scaffolding clamp',
        icon: Wrench
    },
    {
        name: 'Junta Giratoria 2 Tornillos',
        description: 'Permite uniones en ángulos variables con total seguridad. Perfecta para estructuras complejas y versátiles.',
        image: '/images/Productos/junta-giratoria-2-tornillos.png',
        hint: 'swivel coupler',
        icon: Layers
    },
    {
        name: 'Tirante tipo moño con rondana',
        description: 'Moño para cimbra con rondana de neopreno, elaborado con acero de alto carbón de 5.8 mm de diámetro, con capacidad de carga de 1,350 kg y resistencia máxima de 2,200 kg.',
        image: 'https://cimbrayaccesorios.com.mx/Image/MONO-DE-20CM-CON-NEOPRENO.png',
        hint: 'formwork tie',
        icon: Anchor
    },
    {
        name: 'Tirante tipo moño',
        description: 'Moño para cimbra de acero de alto carbón (5.8 mm), con capacidad de carga de 1,350 kg y resistencia máxima de 2,200 kg. COSTO POR ATADO.',
        image: 'https://cimbrayaccesorios.com.mx/Image/WhatsApp-Image-2023-12-29-at-11.23.16-AM-2.jpeg',
        hint: 'formwork anchor',
        icon: Anchor
    },
    {
        name: 'Banda de PVC negra ojillada',
        description: 'Sello retenedor de agua con ojillos, negro de 25 ml, elaborado a base de cloruro de polivinilo en forma de cinta, con bulbo central y laterales estriados.',
        image: 'https://cimbrayaccesorios.com.mx/Image/BOJN4-3.jpg',
        hint: 'pvc waterstop',
        icon: Waves
    },
    {
        name: 'Viga H-20 para Cimbra',
        description: 'Fabricada con madera de alta calidad y un diseño robusto, nuestra viga H-20 garantiza la máxima eficiencia y seguridad en sus proyectos de construcción. El tapón protector integrado aumenta su durabilidad.',
        image: '/images/Productos/viga-h20.jpeg',
        hint: 'h20 beam',
        icon: Building2
    }
];

const heroFeatures = [
    {
        icon: Clock,
        title: "Entrega 24h",
        description: "En Querétaro y área metropolitana"
    },
    {
        icon: PackageCheck,
        title: "Calidad Garantizada",
        description: "Productos certificados"
    },
    {
        icon: Truck,
        title: "Flete Gratis",
        description: "En Querétaro y Zona Metropolitana"
    }
];

const testimonials = [
    {
        name: "Carlos Hernández",
        company: "Director de Obra, Construmex",
        comment: "La calidad de los puntales es excepcional y el servicio de entrega en menos de 24 horas es un salvavidas. Totalmente recomendados.",
        avatar: "https://placehold.co/100x100?text=CH"
    },
    {
        name: "Ana Sofía Robles",
        company: "Gerente de Compras, Edificaciones Modernas",
        comment: "DFAC es nuestro proveedor de confianza. Siempre cumplen con los tiempos y la calidad del material nos da la seguridad que necesitamos en cada proyecto.",
        avatar: "https://placehold.co/100x100?text=AR"
    },
    {
        name: "Jorge Martínez",
        company: "Residente de Obra",
        comment: "El sistema de selección en la web me ayudó a encontrar exactamente lo que necesitaba y la cotización fue inmediata. Excelente servicio.",
        avatar: "https://placehold.co/100x100?text=JM"
    }
];

const galleryImages = [
    { src: '/images/Galeria/puntales-almacen-1.jpeg', alt: 'Puntales en obra de gran altura', hint: 'construction site', className: 'col-span-12 sm:col-span-6 md:col-span-4 h-72' },
    { src: '/images/Galeria/puntales-almacen-2.jpeg', alt: 'Almacén de puntales metálicos', hint: 'construction equipment', className: 'col-span-12 sm:col-span-6 md:col-span-4 h-72' },
    { src: '/images/Galeria/WhatsApp Image 2025-08-27 at 1.27.06 PM.jpeg', alt: 'Detalle de puntal de acero reforzado', hint: 'steel props', className: 'col-span-12 sm:col-span-6 md:col-span-4 h-72' },
    { src: '/images/Galeria/WhatsApp Image 2025-08-27 at 1.27.05 PM.jpeg', alt: 'Trabajadores ajustando puntales', hint: 'construction workers', className: 'col-span-12 sm:col-span-6 h-80' },
    { src: '/images/Galeria/WhatsApp Image 2025-08-27 at 1.27.04 PM.jpeg', alt: 'Vista panorámica de cimbra con puntales', hint: 'formwork structure', className: 'col-span-12 sm:col-span-6 h-80' },
    { src: '/images/Galeria/WhatsApp Image 2025-08-27 at 1.27.03 PM.jpeg', alt: 'Puntales listos para entrega', hint: 'building materials', className: 'col-span-12 h-[26rem]' },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const catalogPdfUrl = "/archivos/CATALOGO-2026.pdf";
  const [isUrgentModalOpen, setIsUrgentModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    const timer = setTimeout(() => {
      // Show the modal only once per session
      if (!sessionStorage.getItem('urgentModalShown')) {
        setIsUrgentModalOpen(true);
        sessionStorage.setItem('urgentModalShown', 'true');
      }
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, []);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 px-4 md:px-8 border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#inicio" onClick={(e) => handleNavLinkClick(e, '#inicio')} className="flex items-center gap-3">
            <Image src="/images/dfac-logo-queretaro.png" alt="DFAC Accesorios para Cimbras Logo" width={256} height={112} className="h-10 w-auto" />
            <span className="sr-only">DFAC Accesorios para Cimbras</span>
          </a>
          <nav className="hidden xl:flex items-center gap-4">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsModalOpen(true)} className="hidden sm:inline-flex">
              Solicitar Cotización
            </Button>
            <div className="flex gap-4 items-center">
              <a href="https://www.facebook.com/bandasdepvcymonosparacimbra/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://www.instagram.com/dfac_cimbra/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@accesorios.dfac" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <TikTokIcon className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </a>
            </div>
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon" className="xl:hidden">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="xl:hidden mt-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="text-base font-medium text-foreground hover:text-primary transition-colors py-2">
                  {link.label}
                </a>
              ))}
              <Button onClick={() => setIsModalOpen(true)} className="w-full mt-4">
                Solicitar Cotización
              </Button>
               <div className="flex gap-4 items-center justify-center mt-4">
                <a href="https://www.facebook.com/bandasdepvcymonosparacimbra/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <FacebookIcon className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://www.instagram.com/dfac_cimbra/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@accesorios.dfac" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <TikTokIcon className="h-6 w-6" />
                  <span className="sr-only">TikTok</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <section id="inicio" className="relative bg-black text-white">
           <div className="relative w-full h-screen">
              <Image
                  src="/images/4c05f0c3-bb8a-4eed-a528-2f71b8b52594.jpg"
                  alt="Puntales Metálicos en Obra"
                  fill
                  className="object-cover"
                  data-ai-hint="construction site"
                  priority
              />
              <div className="absolute inset-0 bg-black/70 z-10"></div>
              <div className="relative z-20 container mx-auto px-4 text-center flex flex-col items-center justify-center h-full py-12 md:py-24">
                  <div className="max-w-4xl">
                      <div className="inline-block bg-primary/20 text-accent px-3 py-1 rounded-full text-sm mb-4 border border-accent/50">
                          ¡Entrega garantizada en menos de 24 horas!
                      </div>
                      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                          Tus materiales de <span className="text-accent">construcción</span> en tiempo récord
                      </h1>
                      <p className="mt-4 text-base md:text-xl text-white/80 max-w-3xl mx-auto">
                          Más de 10 años distribuyendo herramientas y accesorios para la construcción. Calidad profesional con la rapidez que tu proyecto necesita.
                      </p>
                      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                          <Button size="lg" onClick={() => setIsModalOpen(true)}>
                              <WhatsAppIcon className="mr-2 h-5 w-5"/> Cotizar Ahora
                          </Button>
                          <Button size="lg" variant="outline" className="bg-transparent text-white border-white/80 hover:bg-white hover:text-primary" onClick={() => {
                            const el = document.getElementById('catalogo');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}>
                               Ver Catálogo
                          </Button>
                      </div>

                       <div className="mt-12 w-full max-w-5xl mx-auto">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                             {heroFeatures.map((feature, index) => (
                               <div key={index} className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center gap-4 border border-white/20">
                                 <feature.icon className="w-8 h-8 text-accent"/>
                                 <div>
                                     <h3 className="font-bold text-white">{feature.title}</h3>
                                     <p className="text-white/80 text-sm">{feature.description}</p>
                                 </div>
                               </div>
                             ))}
                         </div>
                       </div>
                  </div>
              </div>
           </div>
        </section>
        
        <section id="modelos" className="py-16 md:py-24 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-primary">Encuentra tu Puntal y Cotiza</h2>
              <p className="text-muted-foreground mt-2">
                Selecciona el modelo que necesitas y ajusta la altura para ver la capacidad de carga. ¡Obtén una cotización al instante!
              </p>
            </div>
            <PuntalSelector onCtaClick={() => setIsModalOpen(true)} />
          </div>
        </section>

        <section id="accesorios" className="py-16 md:py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-primary">Completa tu Equipo con Nuestros Accesorios</h2>
                    <p className="text-muted-foreground mt-2">
                        Asegura la máxima versatilidad y seguridad en tu obra con nuestras juntas de alta resistencia.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {featuredProducts.map((product, index) => (
                        <Card key={index} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <CardHeader className="p-0 bg-white">
                                <div className="relative w-full aspect-[3/2]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-6"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        data-ai-hint={product.hint}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 mb-2">
                                    <product.icon className="w-6 h-6 text-primary" />
                                    <h3 className="text-xl font-bold">{product.name}</h3>
                                </div>
                                <CardDescription className="mb-4 flex-grow">{product.description}</CardDescription>
                                <Button onClick={() => setIsModalOpen(true)} className="w-full mt-auto">
                                    Solicitar Cotización
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="catalogo" className="py-16 md:py-24 px-4 bg-secondary/30">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-primary">Nuestro Catálogo 2026</h2>
                    <p className="text-muted-foreground mt-4">Hojéalo como un libro o descárgalo en PDF.</p>
                </div>
                <Flipbook pdfUrl={catalogPdfUrl} />
            </div>
        </section>

        <section id="beneficios" className="py-16 md:py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-primary">El Aliado Perfecto para tu Obra</h2>
                    <p className="text-muted-foreground mt-2">
                        Nuestros puntales están diseñados para ofrecer el máximo rendimiento y seguridad en cualquier situación.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {beneficios.map((item, index) => (
                        <Card key={index} className="text-center p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-center mb-4">
                                <item.icon className="w-12 h-12 text-primary"/>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="especificaciones" className="py-16 md:py-24 px-4 bg-muted/40">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">Ficha Técnica: Puntal Telescópico</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tabla de resistencias por altura con base en el documento de certificación enviado por
                fábrica, para que conozcas exactamente la capacidad de carga de cada modelo DFAC.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-left py-3 pr-4 font-bold">Modelo</th>
                    <th className="text-left py-3 px-4 font-bold">Resistencia altura mínima</th>
                    <th className="text-left py-3 px-4 font-bold">Resistencia altura máxima</th>
                    <th className="text-left py-3 px-4 font-bold">Tubo interior</th>
                    <th className="text-left py-3 px-4 font-bold">Tubo exterior</th>
                    <th className="text-left py-3 px-4 font-bold">Base</th>
                    <th className="text-left py-3 pl-4 font-bold">Peso</th>
                  </tr>
                </thead>
                <tbody>
                  {especificacionesTecnicas.map((e) => (
                    <tr key={e.nombre} className="border-b border-border/50">
                      <td className="py-4 pr-4 font-semibold">{e.nombre}<br /><span className="font-normal text-xs text-muted-foreground">{e.fabricacion}</span></td>
                      <td className="py-4 px-4 text-muted-foreground">{e.resistenciaMin.altura} = {e.resistenciaMin.carga}</td>
                      <td className="py-4 px-4 text-muted-foreground">{e.resistenciaMax.altura} = {e.resistenciaMax.carga}</td>
                      <td className="py-4 px-4 text-muted-foreground">{e.tuboInterior}</td>
                      <td className="py-4 px-4 text-muted-foreground">{e.tuboExterior}</td>
                      <td className="py-4 px-4 text-muted-foreground">{e.base}</td>
                      <td className="py-4 pl-4 text-muted-foreground">{e.peso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {certificaciones.map((c) => (
                <Card key={c.title} className="shadow-md">
                  <CardHeader>
                    <c.icon className="w-9 h-9 text-primary" />
                    <CardTitle className="text-base mt-2">{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground max-w-3xl mx-auto">
              Fácil instalación, poco mantenimiento, durabilidad y resistencia. Tipo de acero S235JR, bajo
              regulación de fabricación UNI EN 729-2:1996.
            </p>
          </div>
        </section>

        <section id="galeria" className="py-12 md:py-16 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-primary">Nuestros Productos en Acción</h2>
              <p className="text-muted-foreground mt-2">
                Vea la calidad y versatilidad de nuestros puntales en proyectos de construcción reales.
              </p>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {galleryImages.map((image, index) => (
                <div key={index} className={cn("overflow-hidden rounded-lg group relative", image.className)}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={image.hint}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors"></div>
                  <div className="absolute bottom-4 left-4 text-white p-2 bg-black/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-bold text-sm">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="testimonios" className="py-16 md:py-24 px-4">
            <div className="container mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-primary">Lo que dicen nuestros clientes</h2>
                    <p className="text-muted-foreground mt-2">
                        La confianza y satisfacción de nuestros clientes es nuestra mejor carta de presentación.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="flex flex-col justify-between p-6 shadow-md hover:shadow-xl transition-shadow duration-300 bg-background">
                            <CardContent className="p-0">
                                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                                <p className="text-muted-foreground mb-6">{testimonial.comment}</p>
                            </CardContent>
                            <CardHeader className="p-0 flex flex-row items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person portrait"/>
                                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle className="text-base font-bold">{testimonial.name}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        <section id="nosotros" className="py-16 md:py-24 px-4 bg-secondary/30">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-in fade-in-0 slide-in-from-left-12 duration-500">
              <h2 className="text-3xl font-bold text-primary mb-4">Más de 10 Años de Experiencia</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Desde 2013, en DFAC nos hemos dedicado a ofrecer un servicio rápido y eficiente, convirtiéndonos en un referente de confianza en el sector.
                </p>
                <p>
                  Nuestra filosofía de excelencia nos ha permitido crecer y equiparnos con maquinaria especializada para fabricar productos de la más alta calidad, garantizando entregas rápidas y la satisfacción de nuestros clientes.
                </p>
                <p>
                  Hoy, agradecemos a quienes confían en nosotros y seguimos comprometidos con los valores que nos vieron nacer.
                </p>
              </div>
            </div>
            <div className="animate-in fade-in-0 slide-in-from-right-12 duration-500 overflow-hidden rounded-lg shadow-xl">
               <video
                  className="w-full h-auto object-cover"
                  src="/videos/VIDEO-2025-08-05-12-37-33.mp4"
                  width={600}
                  height={400}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  Tu navegador no soporta el tag de video.
                </video>
            </div>
          </div>
        </section>
        
        <section id="clientes" className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-primary">Confían en Nosotros</h2>
              <p className="text-muted-foreground mt-2">
                Empresas líderes en la industria de la construcción respaldan la calidad y seguridad de los productos DFAC.
              </p>
            </div>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 3000, stopOnInteraction: true })]}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {clientes.map((cliente, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-4">
                      <Card className="flex items-center justify-center p-6 h-32 bg-background">
                         <Image src={cliente.logo} alt={cliente.name} width={150} height={60} className="object-contain max-h-full max-w-full" data-ai-hint="company logo" />
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>
        
        <section id="contacto" className="py-16 md:py-24 px-4 text-center bg-primary text-primary-foreground">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">¿Listo para Optimizar tu Obra?</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Contacta ahora y recibe tu material en menos de 24 horas. ¡Garantizado!
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
              <Button size="lg" variant="secondary" onClick={() => setIsModalOpen(true)}>
                <WhatsAppIcon className="mr-2 h-5 w-5"/> Solicitar Cotización
              </Button>
              <a href="tel:+524422517169" className="flex items-center gap-2 hover:underline text-lg">
                <Phone className="w-5 h-5" />
                <span>Llámanos: (442) 251-7169</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground border-t">
        <div className="container mx-auto py-8 px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left items-start">
            <div className="md:col-span-1">
               <Image src="/images/dfac-logo-queretaro.png" alt="DFAC Accesorios para Cimbras Logo" width={256} height={112} className="h-10 w-auto mx-auto md:mx-0" />
              <p className="text-sm mt-4">Prol. Bernardo Quintana 2481, Felipe Carrillo Puerto, 76113 Santiago de Querétaro, Qro.</p>
              <p className="text-sm">ventas@cimbrayaccesorios.com.mx</p>
              <div className="mt-4 rounded-lg overflow-hidden border border-border/50 h-[180px]">
                <iframe
                  title="Ubicación de DFAC Querétaro en Google Maps"
                  src="https://maps.google.com/maps?q=Prol.%20Bernardo%20Quintana%202481%2C%20Felipe%20Carrillo%20Puerto%2C%2076113%20Santiago%20de%20Quer%C3%A9taro%2C%20Qro&z=15&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div>
               <h3 className="font-bold text-lg mb-2">Enlaces Rápidos</h3>
               <nav className="flex flex-col gap-2">
                 {navLinks.map(link => (
                   <a key={link.href} href={link.href} onClick={(e) => handleNavLinkClick(e, link.href)} className="text-sm hover:text-primary transition-colors">
                     {link.label}
                   </a>
                 ))}
               </nav>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Contacto Directo (Querétaro)</h3>
              <div className="flex flex-col items-center md:items-start gap-2 text-sm">
                 <a href="tel:+524422517169" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>(442) 251 7169</span>
                </a>
                 <a href="tel:+524422517168" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>(442) 251 7168</span>
                </a>
                 <a href="tel:+524421550415" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>(442) 155 0415</span>
                </a>
              </div>
            </div>
             <div>
              <h3 className="font-bold text-lg mb-2">Síguenos</h3>
              <div className="flex justify-center md:justify-start gap-4">
                <a href="https://www.facebook.com/bandasdepvcymonosparacimbra/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <FacebookIcon className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="https://www.instagram.com/dfac_cimbra/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@accesorios.dfac" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <TikTokIcon className="h-6 w-6" />
                  <span className="sr-only">TikTok</span>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground mt-8 border-t border-border/40 pt-6">
            <p>&copy; {currentYear} DFAC. Todos los derechos reservados. | <a href="#" className="hover:underline">Aviso de Privacidad</a></p>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
      <UrgentMaterialModal isOpen={isUrgentModalOpen} onOpenChange={setIsUrgentModalOpen} />
       <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3">
        <Button
          asChild
          className={cn(
            "rounded-full shadow-lg p-4 h-16 w-16 bg-green-500 hover:bg-green-600"
          )}
        >
          <a href="https://wa.me/5214421550415?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización." target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="h-7 w-7 text-white" />
            <span className="sr-only">Contactar por WhatsApp</span>
          </a>
        </Button>
        <Button
          asChild
          className={cn(
            "rounded-full shadow-lg p-4 h-16 w-16"
          )}
        >
          <a href="tel:+524422517169">
            <Phone className="h-7 w-7" />
            <span className="sr-only">Llamar ahora</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
