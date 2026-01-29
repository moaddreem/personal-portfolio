'use client';

import { useState, useEffect } from 'react';
import PostCard from '@/components/PostCard';
import { Post } from '@/lib/content';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.posts);
      setAllTags(data.tags);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag);
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  if (loading) {
    return (
      <div className="py-16 md:py-24">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-4"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-64 mb-8"></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-48 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="section-heading">Blog</h1>
          <p className="section-subheading">Thoughts, tutorials, and insights</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-96 px-4 py-3 pl-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedTag === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">No posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
