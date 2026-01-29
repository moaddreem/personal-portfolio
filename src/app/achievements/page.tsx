import { Metadata } from 'next';
import { getAchievements } from '@/lib/content';
import AchievementTimeline from '@/components/AchievementTimeline';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'My certificates, awards, leadership roles, volunteering, and speaking engagements.',
};

export default function AchievementsPage() {
  const achievements = getAchievements();

  return (
    <div className="py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="section-heading">Achievements</h1>
            <p className="section-subheading">
              Certificates, awards, leadership roles, and more
            </p>
          </div>

          <AchievementTimeline achievements={achievements} />
        </div>
      </div>
    </div>
  );
}
