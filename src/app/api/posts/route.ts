import { NextResponse } from 'next/server';
import { getAllPosts, getAllPostTags } from '@/lib/content';

export async function GET() {
  const posts = await getAllPosts();
  const tags = await getAllPostTags();
  
  return NextResponse.json({ posts, tags });
}
