import Link from 'next/link';
import Image from 'next/image';
import { getProfile, getFeaturedProjects, getSkills, getAchievements, getLatestPosts } from '@/lib/content';
import ProjectCard from '@/components/ProjectCard';
import AnimateOnScroll from '@/components/AnimateOnScroll';

export default async function HomePage() {
  const profile = getProfile();
  const featuredProjects = await getFeaturedProjects();
  const skills = getSkills();
  const achievements = getAchievements();
  const latestPosts = await getLatestPosts(2);

  // Get top 3 projects (featured first, then by date)
  const topProjects = featuredProjects.slice(0, 3);
  
  // Get top 3 achievements (most recent)
  const topAchievements = achievements.slice(0, 3);

  return (
    <div className="bg-bg-primary">
      {/* Hero Section - zoom resilient with padding instead of vh */}
      <section id="home" className="relative overflow-hidden bg-accent">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-16 md:py-24 lg:py-32">
            {/* Left Content */}
            <div className="relative z-10">
              <p className="animate-fade-in-up text-white/80 text-sm font-medium tracking-wider uppercase mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                {profile.tagline}
              </p>
              <h1 
                className="animate-fade-in-up-delay-1 font-semibold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)' }}
              >
                I&apos;m {profile.name.split(' ')[0]}<br />
                <span className="text-white/90">{profile.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="animate-fade-in-up-delay-2 text-base md:text-lg text-white/80 mb-8 max-w-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {profile.shortBio}
              </p>
              <div className="animate-fade-in-up-delay-3 flex flex-wrap gap-4">
                <Link href="/#about" className="inline-flex items-center justify-center px-6 py-3 font-medium bg-white text-accent hover:bg-white/90 hover:scale-105 transition-all duration-200" style={{ borderRadius: '0 9999px 9999px 9999px', fontFamily: 'Inter, sans-serif' }}>
                  About Me
                </Link>
                <Link href="/#projects" className="inline-flex items-center gap-3 text-white hover:scale-105 transition-all duration-200" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                  <span className="font-medium uppercase tracking-wider text-sm">See Projects</span>
                </Link>
              </div>
            </div>
            
            {/* Right - Avatar with responsive sizing */}
            <div className="relative hidden lg:flex justify-center items-center">
              <div className="animate-scale-in relative w-full max-w-sm aspect-square">
                <div className="animate-float absolute inset-0 bg-white/10 rounded-3xl"></div>
                <div className="animate-float-reverse absolute inset-0 bg-white/20 rounded-3xl"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/30 hover:scale-105 transition-transform duration-500">
                  <Image
                    src={profile.avatar || '/avatar.jpg'}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-surface-2">
        <div className="container-custom py-16 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="fade-right">
              <p className="section-label">About Me</p>
              <h2 className="section-heading">
                Building,<br />
                Leading,<br />
                Delivering.
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={200}>
              <div className="text-text-secondary text-lg mb-6 leading-relaxed space-y-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                {profile.longBio.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/momo 2026 jan.pdf" className="btn-primary">
                  Download CV
                </Link>
                <Link href="/#skills" className="btn-secondary">
                  View Skills
                </Link>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-bg-primary">
        <div className="container-custom py-16 md:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll animation="scale-up" className="relative hidden lg:block">
              <div className="w-80 h-80 xl:w-96 xl:h-96 rounded-[32px] overflow-hidden">
                <Image
                  src="/2FEAB54D-31D8-4DF0-A6FC-EBAF375F0C2C.png"
                  alt="Muath working / portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 384px"
                  className="object-cover rounded-[32px]"
                />
              </div>
            </AnimateOnScroll>
            <div>
              <AnimateOnScroll animation="fade-up">
                <p className="section-label">My Skillset</p>
                <h2 className="section-heading mb-10">
                  I Specialize In<br />
                  Building Solutions
                </h2>
              </AnimateOnScroll>
              <div className="space-y-6">
                {skills.categories.slice(0, 4).map((category, index) => (
                  <AnimateOnScroll key={category.name} animation="fade-up" delay={index * 100}>
                    <div className="flex justify-between mb-2">
                      <span className="text-text-primary font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{category.name}</span>
                      <span className="text-accent text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {Math.round(category.skills.reduce((a, b) => a + b.level, 0) / category.skills.length)}%
                      </span>
                    </div>
                    <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{ width: `${Math.round(category.skills.reduce((a, b) => a + b.level, 0) / category.skills.length)}%` }}
                      ></div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Top 3 only */}
      <section id="projects" className="bg-surface-2">
        <div className="container-custom py-16 md:py-24 lg:py-28">
          <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
            <p className="section-label">Works</p>
            <h2 className="section-heading">Featured Projects</h2>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProjects.map((project, index) => (
              <AnimateOnScroll key={project.slug} animation="fade-up" delay={index * 150}>
                <ProjectCard project={project} />
              </AnimateOnScroll>
            ))}
          </div>
          
          <AnimateOnScroll animation="fade-up" delay={300} className="mt-10 md:mt-12 text-center">
            <Link href="/projects" className="btn-secondary">
              View All Projects
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Achievements Section - Alternating Timeline */}
      <section id="achievements" className="bg-bg-primary">
        <div className="container-custom py-16 md:py-24 lg:py-28">
          <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
            <p className="section-label">Achievements</p>
            <h2 className="section-heading">Certifications & Leadership</h2>
          </AnimateOnScroll>
          
          {/* Alternating Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-accent-highlight to-accent hidden md:block" />
            
            {topAchievements.map((achievement, index) => {
              const isLeft = index % 2 === 0;
              return (
                <AnimateOnScroll 
                  key={achievement.id} 
                  animation={isLeft ? 'fade-right' : 'fade-left'} 
                  delay={index * 150}
                  className="relative mb-8 md:mb-12 last:mb-0"
                >
                  <div className={`flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Card */}
                    <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                      <div className="bg-surface rounded-2xl border border-border p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            achievement.type === 'certificate' ? 'bg-accent/20 text-accent-highlight group-hover:bg-accent/30' :
                            achievement.type === 'leadership' ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30' :
                            'bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30'
                          }`}>
                            {achievement.type === 'certificate' ? (
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                              </svg>
                            ) : (
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-accent-highlight text-xs font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                            </p>
                            <h3 className="text-text-primary font-semibold mb-1">{achievement.title}</h3>
                            <p className="text-text-secondary text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{achievement.organization}</p>
                            <p className="text-text-secondary text-sm line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>{achievement.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Center node */}
                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-bg-primary shadow-lg shadow-accent/30" />
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
          
          <AnimateOnScroll animation="fade-up" delay={300} className="mt-10 md:mt-12 text-center">
            <Link href="/achievements" className="btn-secondary">
              View All Achievements
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-surface-2">
        <div className="container-custom py-16 md:py-24 lg:py-28">
          <div className="max-w-4xl mx-auto">
            <AnimateOnScroll animation="fade-up" className="text-center mb-12">
              <p className="section-label">Get In Touch</p>
              <h2 className="section-heading">Let&apos;s Work Together</h2>
              <p className="text-text-secondary text-lg mt-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Have a project in mind or just want to say hello? Feel free to reach out!
              </p>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fade-up" delay={200}>
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <a href="mailto:muathduraym@gmail.com" className="bg-surface rounded-2xl border border-border p-6 text-center hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-7 h-7 text-accent-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-text-primary font-semibold mb-1">Email</h3>
                  <p className="text-accent-highlight text-sm group-hover:underline" style={{ fontFamily: 'Inter, sans-serif' }}>muathduraym@gmail.com</p>
                </a>
                
                <a href="https://www.linkedin.com/in/muath-al-duraym/" target="_blank" rel="noopener noreferrer" className="bg-surface rounded-2xl border border-border p-6 text-center hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-7 h-7 text-accent-highlight" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <h3 className="text-text-primary font-semibold mb-1">LinkedIn</h3>
                  <p className="text-accent-highlight text-sm group-hover:underline" style={{ fontFamily: 'Inter, sans-serif' }}>muath-al-duraym</p>
                </a>
                
                <a href="https://x.com/just_moad_" target="_blank" rel="noopener noreferrer" className="bg-surface rounded-2xl border border-border p-6 text-center hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-7 h-7 text-accent-highlight" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                  <h3 className="text-text-primary font-semibold mb-1">X (Twitter)</h3>
                  <p className="text-accent-highlight text-sm group-hover:underline" style={{ fontFamily: 'Inter, sans-serif' }}>@just_moad_</p>
                </a>
              </div>
            </AnimateOnScroll>
            
            <AnimateOnScroll animation="fade-up" delay={300}>
              <div className="bg-accent rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-semibold text-white mb-4">Ready to start a project?</h3>
                <p className="text-white/80 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                  I&apos;m always open to discussing new projects and opportunities.
                </p>
                <a 
                  href="mailto:muathduraym@gmail.com" 
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-medium bg-white text-accent hover:bg-white/90 hover:scale-105 transition-all duration-200"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send me an email
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="bg-bg-primary">
        <div className="container-custom py-16 md:py-24 lg:py-28">
          <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
            <p className="section-label">Latest Posts</p>
            <h2 className="section-heading">From the Blog</h2>
          </AnimateOnScroll>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {latestPosts.map((post, index) => (
              <AnimateOnScroll key={post.slug} animation="fade-up" delay={index * 150}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="bg-surface rounded-2xl border border-border overflow-hidden h-full hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300">
                    {/* Cover Image */}
                    <div className="relative aspect-video bg-surface-2 overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
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
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-accent-highlight text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-semibold text-text-primary mb-3 group-hover:text-accent-highlight transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {post.summary}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent-highlight font-medium text-sm group-hover:gap-3 transition-all" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Read Article
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </article>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
          
          <AnimateOnScroll animation="fade-up" delay={300} className="mt-12 text-center">
            <Link href="/blog" className="btn-secondary">
              View More Posts
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
