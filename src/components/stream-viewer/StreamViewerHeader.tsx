
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Video, 
  Expand, 
  Shrink, 
  Share, 
  MoreVertical,
  Sun,
  Moon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';

interface StreamViewerHeaderProps {
  streamTitle: string;
  theaterMode: boolean;
  onTheaterModeToggle: () => void;
}

export const StreamViewerHeader = ({ 
  streamTitle, 
  theaterMode, 
  onTheaterModeToggle 
}: StreamViewerHeaderProps) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // In a real app, you'd show a toast notification here
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              VoltStream
            </span>
          </div>
        </div>

        {/* Center Section - Stream Title (Desktop) */}
        <div className="hidden md:block flex-1 max-w-md mx-8">
          <h1 className="text-foreground font-medium truncate text-center">
            {streamTitle}
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onTheaterModeToggle}
            className="hover:bg-muted"
          >
            {theaterMode ? (
              <Shrink className="h-5 w-5" />
            ) : (
              <Expand className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="hover:bg-muted"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="hover:bg-muted"
          >
            <Share className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Report stream</DropdownMenuItem>
              <DropdownMenuItem>Block creator</DropdownMenuItem>
              <DropdownMenuItem>Add to Watch Later</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile - simplified for now */}
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center ml-2">
            <span className="text-xs font-medium text-muted-foreground">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};
