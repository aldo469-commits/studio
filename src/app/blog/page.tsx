import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const featuredPostImage = PlaceHolderImages.find(p => p.id === featuredPost.image);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline">Blog de EJA GlobalTrans</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Noticias, tendencias y análisis del sector de la logística y el transporte.
        </p>
      </header>

      {/* Featured Post */}
      <section className="mb-16">
        <Card className="grid md:grid-cols-2 overflow-hidden border-2 border-primary/20 shadow-lg">
          <div className="relative h-64 md:h-auto">
            {featuredPostImage && (
                <Image
                src={featuredPostImage.imageUrl}
                alt={featuredPostImage.description}
                fill
                className="object-cover"
                data-ai-hint={featuredPostImage.imageHint}
                />
            )}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-2">{featuredPost.category}</Badge>
            <CardTitle className="text-2xl lg:text-3xl font-headline mb-4">
              <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                {featuredPost.title}
              </Link>
            </CardTitle>
            <CardDescription className="text-base mb-6">{featuredPost.excerpt}</CardDescription>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={featuredPost.author.avatarUrl} alt={featuredPost.author.name} />
                  <AvatarFallback>{featuredPost.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{featuredPost.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                <time dateTime={featuredPost.date}>{formatDate(featuredPost.date)}</time>
              </div>
            </div>
             <Button asChild className="mt-6 w-fit">
                <Link href={`/blog/${featuredPost.slug}`}>
                    Leer más <ArrowRight className="ml-2"/>
                </Link>
            </Button>
          </div>
        </Card>
      </section>
      
      {/* Other Posts */}
      <section>
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Más Artículos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => {
            const postImage = PlaceHolderImages.find(p => p.id === post.image);
            return (
                <Card key={post.slug} className="flex flex-col group">
                <CardHeader className="p-0">
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    {postImage && (
                        <Image
                            src={postImage.imageUrl}
                            alt={postImage.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={postImage.imageHint}
                        />
                    )}
                    <Badge variant="secondary" className="absolute top-3 right-3">{post.category}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                    <CardTitle className="font-headline text-xl mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                        </Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 text-xs text-muted-foreground flex justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="size-3" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                </CardFooter>
                </Card>
            )
          })}
        </div>
      </section>
    </div>
  );
}