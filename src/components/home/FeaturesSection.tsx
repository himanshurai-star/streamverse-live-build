
import { 
  Video, 
  DollarSign, 
  Users, 
  Globe, 
  BarChart3, 
  Shield,
  Check
} from 'lucide-react';
import { FEATURES } from '@/lib/constants';

const iconMap = {
  Video,
  DollarSign,
  Users,
  Globe,
  BarChart3,
  Shield
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything you need to stream
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional tools designed for creators who care about quality
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap];
            
            return (
              <div key={feature.id} className="group">
                {/* Feature Icon */}
                <div className="w-12 h-12 bg-[#161616] border border-gray-800 rounded-xl flex items-center justify-center mb-5 group-hover:border-[#006239] transition-colors">
                  <IconComponent className="w-5 h-5 text-[#006239]" />
                </div>

                {/* Feature Content */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-start space-x-3 text-sm text-gray-500">
                        <Check className="w-4 h-4 text-[#006239] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
