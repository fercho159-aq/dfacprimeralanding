import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos sobre puntales telescópicos, accesorios para cimbra y construcción en Querétaro. Guías, normas de seguridad y novedades del sector.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[hsl(211,96%,25%)] text-white py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Link
            href="/"
            className="inline-block mb-6 text-sm text-white/70 hover:text-white transition-colors"
          >
            &larr; Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Guías, consejos y novedades sobre puntales y accesorios para cimbra
            en Querétaro.
          </p>
        </div>
      </header>

      {/* Blog grid */}
      <main className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col flex-grow p-5">
                <time
                  dateTime={post.date}
                  className="text-xs text-muted-foreground"
                >
                  {new Date(post.date + 'T00:00:00').toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h2 className="mt-2 text-lg font-bold text-foreground group-hover:text-[hsl(211,96%,25%)] transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-grow">
                  {post.description}
                </p>
                <span className="mt-4 text-sm font-semibold text-[hsl(211,96%,25%)] group-hover:underline">
                  Leer m&aacute;s &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[hsl(211,96%,25%)] font-semibold hover:underline"
          >
            &larr; Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  );
}
