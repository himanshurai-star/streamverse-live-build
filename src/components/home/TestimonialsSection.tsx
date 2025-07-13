
import { Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';
import { Card } from '@/components/ui/card';

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#161616]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Creators Say
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Real feedback from creators who have transformed their streaming experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.id} className="bg-black border-gray-800 p-6 hover:bg-[#0A0A0A] transition-colors">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-white">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
                {testimonial.verified && (
                  <CheckCircle className="w-4 h-4 text-[#006239]" />
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#006239] fill-[#006239]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-300 text-sm leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
