
import { Link } from 'react-router-dom';
import { Play, Twitter, MessageCircle, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-[#161616] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#006239] rounded-lg flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold text-white">VoltStream</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Stream Your Passion, Build Your Community
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-white">Stay updated</p>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-[#1A1A1A] border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button size="sm" className="bg-[#006239] hover:bg-[#004d2e]">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Product</h3>
            <div className="space-y-2">
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Features
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Security
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                API Documentation
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Status Page
              </Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Resources</h3>
            <div className="space-y-2">
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Community Forum
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Creator Resources
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Press Kit
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Company</h3>
            <div className="space-y-2">
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Careers
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-400">
            © 2025 VoltStream. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
