
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Video } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-bg-primary/80 backdrop-blur-sm border-b border-bg-tertiary z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-8 h-8 bg-primary-green rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-text-primary group-hover:opacity-90 transition-opacity">
            VoltStream
          </span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/auth/login')}
            className="text-text-secondary hover:text-primary-green hover:border-primary-green"
          >
            Sign in
          </Button>
          <Button 
            onClick={() => navigate('/auth/register')}
            className="bg-primary-green hover:bg-primary-green-hover text-white"
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
};
