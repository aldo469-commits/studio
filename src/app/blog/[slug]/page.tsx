'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/context/language-context';

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postImage = PlaceHolderImages.find(p => p.id === post.image);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
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
                {t('blog.backToBlog')}
            </Link>
        </Button>
      </div>

      <header className="mb-8">
        <Badge variant="secondary" className="mb-4">{post.category}</Badge>
        <h1 className="font-headline text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <Avatar className="h-8 w-8">
              {post.author.avatarUrl && <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />}
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

      {postImage && (
        <div className="relative h-64 md:h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
            src={postImage.imageUrl}
            alt={postImage.description}
            fill
            className="object-cover"
            data-ai-hint={postImage.imageHint}
            />
        </div>
      )}
      
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