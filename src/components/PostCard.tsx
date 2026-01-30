import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/content';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Post Image */}
      <div className="relative h-48 bg-surface-2 overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-sm text-text-secondary" style={{ fontFamily: 'Inter, sans-serif' }}>
          <time className="flex items-center gap-1">
            <svg className="w-4 h-4 text-accent-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
        </div>
        
        <h3 className="text-xl font-serif font-semibold text-text-primary mb-3 group-hover:text-accent-highlight transition-colors">
          <Link href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          {post.summary}
        </p>
        
        <Link 
          href={`/blog/${post.slug}`}
          className="text-accent-highlight text-sm font-medium hover:underline"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
