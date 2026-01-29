import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPostSlugs } from '@/lib/content';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.summary,
    };
  } catch {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function PostPage({ params }: Props) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <time className="text-slate-500 dark:text-slate-500 mb-4 block">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <article 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
