import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjectSlugs } from '@/lib/content';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const project = await getProjectBySlug(params.slug);
    return {
      title: project.title,
      description: project.summary,
    };
  } catch {
    return {
      title: 'Project Not Found',
    };
  }
}

export default async function ProjectPage({ params }: Props) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <div className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/projects"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <time className="text-slate-500 dark:text-slate-500">
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
              
              <div className="flex gap-2">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    Repository
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <article 
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-primary-600 dark:prose-a:text-primary-400"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      </div>
    </div>
  );
}
