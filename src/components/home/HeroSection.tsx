
import { Play, Video, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Announcement Badge */}
        <Badge variant="secondary" className="mb-6 bg-[#161616] border border-gray-800 text-gray-300 hover:border-[#006239] transition-colors">
          <Sparkles className="w-3 h-3 mr-2" />
          Introducing Creator Studio Pro
          <ArrowRight className="w-3 h-3 ml-2" />
        </Badge>

        {/* Hero Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          The streaming platform{' '}
          <span className="bg-gradient-to-r from-[#006239] to-[#4ADED1] bg-clip-text text-transparent">
            built for creators
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Professional streaming tools, smart monetization, and powerful community features. 
          Everything you need to turn your passion into your profession.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button size="lg" className="bg-[#006239] hover:bg-[#004d2e] text-white border-[#006239] min-w-[180px]">
            <Play className="w-4 h-4 mr-2 fill-white" />
            Start streaming free
          </Button>
          <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:text-white hover:border-[#006239] min-w-[140px]">
            <Video className="w-4 h-4 mr-2" />
            Watch demo
          </Button>
        </div>

        {/* Social Proof */}
        <p className="text-sm text-gray-500">
          Trusted by 50,000+ creators worldwide
        </p>

        {/* Product Preview */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="relative bg-[#161616] border border-gray-800 rounded-xl p-6 shadow-2xl">
            {/* Live Stats Bar */}
            <div className="flex items-center justify-between mb-6 text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-300">1,247 streams live</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#006239] rounded-full"></div>
                  <span className="text-gray-300">23,891 watching now</span>
                </div>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video bg-[#1A1A1A] rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-50"></div>
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 text-white text-xs">LIVE</Badge>
                  </div>
                  <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                    {Math.floor(Math.random() * 1000) + 100}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
