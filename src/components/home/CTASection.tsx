
import { Play, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#161616]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your{' '}
          <span className="bg-gradient-to-r from-[#006239] to-[#4ADED1] bg-clip-text text-transparent">
            Streaming Journey?
          </span>
        </h2>

        {/* Supporting Text */}
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of creators who've already built thriving communities on VoltStream. 
          Start streaming for free today and discover why creators love our platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button 
            size="lg" 
            className="bg-[#006239] hover:bg-[#004d2e] text-white border-[#006239] min-w-[200px] text-lg py-6 hover:scale-105 transition-transform"
          >
            <Play className="w-5 h-5 mr-2 fill-white" />
            Start Streaming Free
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:text-white hover:border-[#006239] min-w-[160px] text-lg py-6 hover:scale-105 transition-transform"
          >
            <PlayCircle className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>

        {/* Trust Signal */}
        <p className="text-sm text-gray-500">
          No credit card required • 14-day free trial on all paid plans
        </p>
      </div>
    </section>
  );
}
