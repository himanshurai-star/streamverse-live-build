
import { Star } from 'lucide-react';
import { CREATORS } from '@/lib/constants';
import { Card } from '@/components/ui/card';

export function CreatorShowcase() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Successful Creators
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See how creators are building thriving communities on VoltStream
          </p>
        </div>

        {/* Creator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CREATORS.map((creator) => (
            <Card key={creator.id} className="bg-[#161616] border-gray-800 p-6 hover:bg-[#1A1A1A] transition-colors">
              <div className="flex items-start space-x-4">
                {/* Creator Avatar */}
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-12 h-12 rounded-full bg-gray-700"
                />

                {/* Creator Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-white">{creator.name}</h3>
                    <span className="text-xs bg-[#006239]/20 text-[#006239] px-2 py-1 rounded-full">
                      {creator.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{creator.followers}</p>
                  
                  {/* Star Rating */}
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#006239] fill-[#006239]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-sm text-gray-300 italic">
                    "{creator.quote}"
                  </blockquote>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
