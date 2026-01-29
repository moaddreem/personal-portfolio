import { NextResponse } from 'next/server';
import { getAllProjects, getAllProjectTags } from '@/lib/content';

export async function GET() {
  const projects = await getAllProjects();
  const tags = await getAllProjectTags();
  
  return NextResponse.json({ projects, tags });
}
