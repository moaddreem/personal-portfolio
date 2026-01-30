import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

// Types
export interface Profile {
  name: string;
  tagline: string;
  shortBio: string;
  longBio: string;
  interests: string[];
  values: { title: string; description: string }[];
  links: {
    linkedin: string;
    email: string;
    twitter: string;
    website: string;
  };
  avatar: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number }[];
}

export interface Skills {
  categories: SkillCategory[];
}

export interface Achievement {
  id: string;
  title: string;
  type: 'certificate' | 'award' | 'leadership' | 'volunteering' | 'speaking';
  date: string;
  organization: string;
  description: string;
  link: string;
}

export interface Achievements {
  achievements: Achievement[];
}

export interface Project {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  repo: string;
  demo: string;
  featured: boolean;
  featuredOrder?: number;
  summary: string;
  stack: string[];
  image?: string;
  content: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
  content: string;
}

// Profile
export function getProfile(): Profile {
  const filePath = path.join(contentDirectory, 'profile.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Skills
export function getSkills(): Skills {
  const filePath = path.join(contentDirectory, 'skills.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Achievements
export function getAchievements(): Achievement[] {
  const filePath = path.join(contentDirectory, 'achievements.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data: Achievements = JSON.parse(fileContents);
  return data.achievements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Projects
export function getProjectSlugs(): string[] {
  const projectsDir = path.join(contentDirectory, 'projects');
  if (!fs.existsSync(projectsDir)) return [];
  return fs.readdirSync(projectsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const filePath = path.join(contentDirectory, 'projects', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    tags: data.tags || [],
    repo: data.repo || '',
    demo: data.demo || '',
    featured: data.featured || false,
    featuredOrder: data.featuredOrder,
    summary: data.summary || '',
    stack: data.stack || [],
    image: data.image || '',
    content: contentHtml,
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = getProjectSlugs();
  const projects = await Promise.all(slugs.map(slug => getProjectBySlug(slug)));
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getAllProjects();
  const featured = projects.filter(p => p.featured);
  // Sort by featuredOrder if available, otherwise by date
  featured.sort((a, b) => {
    if (a.featuredOrder !== undefined && b.featuredOrder !== undefined) {
      return a.featuredOrder - b.featuredOrder;
    }
    if (a.featuredOrder !== undefined) return -1;
    if (b.featuredOrder !== undefined) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return featured.slice(0, 3);
}

// Posts
export function getPostSlugs(): string[] {
  const postsDir = path.join(contentDirectory, 'posts');
  if (!fs.existsSync(postsDir)) return [];
  return fs.readdirSync(postsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(contentDirectory, 'posts', `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    tags: data.tags || [],
    summary: data.summary || '',
    image: data.image || '',
    content: contentHtml,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map(slug => getPostBySlug(slug)));
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getLatestPosts(count: number = 2): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

// Get all unique tags
export async function getAllProjectTags(): Promise<string[]> {
  const projects = await getAllProjects();
  const tags = new Set<string>();
  projects.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}

export async function getAllPostTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).sort();
}
