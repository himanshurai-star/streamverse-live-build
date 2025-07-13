
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-[#006239] rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-semibold text-white">VoltStream</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:border-[#006239]">
              Sign up
            </Button>
            <Button size="sm" className="bg-[#006239] hover:bg-[#004d2e] text-white border-[#006239]">
              Get started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden transition-all duration-200 ease-in-out",
          isMobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}>
          <div className="py-4 space-y-3">
            <Button variant="ghost" size="sm" className="w-full justify-start text-gray-300 hover:text-white hover:border-[#006239]">
              Sign up
            </Button>
            <Button size="sm" className="w-full bg-[#006239] hover:bg-[#004d2e] text-white border-[#006239]">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
