'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/lib/content';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects);
      setAllTags(data.tags);
      setLoading(false);
    }
    loadProjects();
  }, []);

  const filteredProjects = selectedTag === 'all'
    ? projects
    : projects.filter(p => p.tags.includes(selectedTag));

  if (loading) {
    return (
      <div className="py-16 md:py-24">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="h-10 bg-surface rounded w-48 mb-4"></div>
            <div className="h-6 bg-surface rounded w-64 mb-8"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-surface rounded-2xl"></div>
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
          <p className="section-label">Portfolio</p>
          <h1 className="section-heading">All Projects</h1>
          <p className="text-text-secondary text-lg mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
            A collection of my work and side projects
          </p>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedTag === 'all'
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:border-accent/40 hover:text-text-primary'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-accent text-white'
                  : 'bg-surface border border-border text-text-secondary hover:border-accent/40 hover:text-text-primary'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary" style={{ fontFamily: 'Inter, sans-serif' }}>No projects found with this tag.</p>
          </div>
        )}
      </div>
    </div>
  );
}
