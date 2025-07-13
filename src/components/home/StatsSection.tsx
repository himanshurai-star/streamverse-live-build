
import { Video, Eye, Clock, Globe } from 'lucide-react';
import { STATS } from '@/lib/constants';

const iconMap = {
  Video,
  Eye,
  Clock,
  Globe
};

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => {
            const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
            
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#006239]/10 border border-[#006239]/20 rounded-xl mb-4">
                  <IconComponent className="w-6 h-6 text-[#006239]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
