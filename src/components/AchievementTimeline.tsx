'use client';

import { useState } from 'react';
import { Achievement } from '@/lib/content';

interface AchievementTimelineProps {
  achievements: Achievement[];
}

export default function AchievementTimeline({ achievements }: AchievementTimelineProps) {
  const [filter, setFilter] = useState<string>('all');
  
  const types = ['all', 'certificate', 'leadership', 'award', 'volunteering', 'speaking'];
  
  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.type === filter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === type
                ? 'bg-accent text-white'
                : 'bg-surface border border-border text-text-secondary hover:border-accent/40 hover:text-text-primary'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Alternating Timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent via-accent-highlight to-accent" />
        
        <div className="space-y-8 md:space-y-12">
          {filteredAchievements.map((achievement, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={achievement.id}
                className={`relative flex items-start ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Center node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-bg-primary shadow-lg shadow-accent/30 transform -translate-x-1/2 mt-6 z-10" />
                
                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-surface rounded-2xl border border-border p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        achievement.type === 'certificate' ? 'bg-accent/20 text-accent-highlight group-hover:bg-accent/30' :
                        achievement.type === 'leadership' ? 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30' :
                        achievement.type === 'award' ? 'bg-yellow-500/20 text-yellow-400 group-hover:bg-yellow-500/30' :
                        achievement.type === 'volunteering' ? 'bg-green-500/20 text-green-400 group-hover:bg-green-500/30' :
                        'bg-red-500/20 text-red-400 group-hover:bg-red-500/30'
                      }`}>
                        {achievement.type === 'certificate' ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        ) : achievement.type === 'leadership' ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        ) : achievement.type === 'award' ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        ) : achievement.type === 'volunteering' ? (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-accent-highlight text-xs font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </p>
                        <h3 className="text-text-primary font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-text-secondary text-sm mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{achievement.organization}</p>
                        <p className="text-text-secondary text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{achievement.description}</p>
                        
                        {achievement.link && (
                          <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-3 text-sm text-accent-highlight hover:underline"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            View credential
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
