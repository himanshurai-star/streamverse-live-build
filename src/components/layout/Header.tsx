
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Video, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold text-foreground group-hover:opacity-90 transition-opacity">
            VoltStream
          </span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => navigate('/auth/login')}
            className="text-muted-foreground hover:text-foreground hover:border-primary"
          >
            Sign in
          </Button>
          <Button 
            onClick={() => navigate('/auth/register')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
};
