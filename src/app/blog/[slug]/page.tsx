import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="outline" size="sm">
            <Link href="/blog">
                <ArrowLeft className="mr-2"/>
                Volver al Blog
            </Link>
        </Button>
      </div>

      <header className="mb-8">
        <Badge variant="secondary" className="mb-4">{post.category}</Badge>
        <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </div>
      </header>

      <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={`Imagen para ${post.title}`}
          fill
          className="object-cover"
          data-ai-hint={post.imageHint}
        />
      </div>
      
      {post.content ? (
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>{post.excerpt}</p>
            <p>Contenido del artículo en desarrollo...</p>
        </div>
      )}

    </article>
  );
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
