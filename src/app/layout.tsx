import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'Puntales para Cimbra en Querétaro | Venta, Renta y Entrega – DFAC',
    template: '%s | DFAC Accesorios para Cimbra',
  },
  description: 'Puntales telescópicos certificados UNE-EN 1065. Venta, renta y entrega inmediata en Querétaro. Calculadora de carga en línea. Más de 12 años de experiencia.',
  metadataBase: new URL('https://puntales.mx'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Puntales para Cimbra en Querétaro | DFAC',
    description: 'Puntales telescópicos certificados, accesorios para cimbra y entrega inmediata en Querétaro. Cotiza ahora.',
    url: 'https://puntales.mx',
    siteName: 'DFAC Accesorios para Cimbra',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Puntales para Cimbra en Querétaro | DFAC',
    description: 'Puntales telescópicos certificados, accesorios para cimbra y entrega inmediata en Querétaro.',
  },
  verification: {
    google: 'VcHiJDttxnnmOnWj3cIRHbGRTyJvEMO2iKMqcroZ_a0',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'DFAC Accesorios para Cimbra – Querétaro',
  description: 'Venta y renta de puntales telescópicos, cuñas, silletas, desmoldante y accesorios para cimbra en Querétaro.',
  url: 'https://puntales.mx',
  telephone: ['+524422517169', '+524422517168', '+524421550415', '+525546134738'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Querétaro',
    addressRegion: 'QRO',
    addressCountry: 'MX',
  },
  areaServed: {
    '@type': 'State',
    name: 'Querétaro',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WKWWJQD7');`,
          }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-KLDB6HS5TB" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KLDB6HS5TB');
          `}
        </Script>
      </head>
      <body className={cn("font-body antialiased min-h-screen")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
