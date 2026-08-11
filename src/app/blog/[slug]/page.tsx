import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPost, getAllSlugs } from '@/lib/blog-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date + 'T00:00:00').toLocaleDateString(
    'es-MX',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-[hsl(211,96%,25%)] text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="inline-block mb-4 text-sm text-white/70 hover:text-white transition-colors"
          >
            &larr; Volver al blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {post.title}
          </h1>
          <time
            dateTime={post.date}
            className="inline-block mt-3 text-sm text-white/70"
          >
            {formattedDate}
          </time>
        </div>
      </header>

      {/* Featured image */}
      <div className="container mx-auto max-w-4xl px-4 -mt-1">
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </div>
      </div>

      {/* Article content */}
      <article className="container mx-auto max-w-4xl px-4 py-10">
        <div
          className="prose prose-lg max-w-none text-foreground
            [&_h2]:text-foreground [&_h3]:text-foreground
            [&_p]:text-muted-foreground [&_li]:text-muted-foreground
            [&_a]:text-[hsl(211,96%,25%)] [&_a]:underline
            [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA Section */}
        <div className="mt-12 rounded-lg bg-[hsl(211,96%,25%)] p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            ¿Necesitas puntales o accesorios para tu obra en Querétaro?
          </h2>
          <p className="mt-3 text-white/80">
            Contáctanos por WhatsApp y recibe una cotización personalizada en
            minutos. Entrega en menos de 24 horas.
          </p>
          <a
            href="https://wa.me/524421550415?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Solicitar cotización por WhatsApp
          </a>
        </div>

        {/* Back to blog */}
        <div className="mt-10 pt-6 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[hsl(211,96%,25%)] font-semibold hover:underline"
          >
            &larr; Ver todos los artículos
          </Link>
        </div>
      </article>
    </div>
  );
}
