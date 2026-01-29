import { Metadata } from 'next';
import { getProfile, getSkills } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me, my background, interests, and values.',
};

export default function AboutPage() {
  const profile = getProfile();
  const skills = getSkills();

  return (
    <div className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="section-heading">About Me</h1>
            <p className="section-subheading">Get to know me better</p>
          </div>

          {/* Long Bio */}
          <section className="mb-16">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-slate-600 dark:text-slate-400 whitespace-pre-line">
                {profile.longBio}
              </p>
            </div>
          </section>

          {/* Interests */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Interests
            </h2>
            <div className="flex flex-wrap gap-3">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Values & Working Style
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {profile.values.map((value) => (
                <div key={value.title} className="card p-6">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Skills
            </h2>
            <div className="space-y-8">
              {skills.categories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                    {category.name}
                  </h3>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-slate-700 dark:text-slate-300">
                            {skill.name}
                          </span>
                          <span className="text-slate-500 dark:text-slate-500 text-sm">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-600 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
