
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Settings, 
  User, 
  LogOut,
  Sun,
  Moon,
  Bell,
  Grid3X3,
  ArrowLeftRight
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';

export const CreatorHeader = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground hidden sm:block">
              VoltStream
            </span>
          </div>
          
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Creator Dashboard
          </Badge>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Switch to User Dashboard */}
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="hidden md:flex items-center gap-2"
          >
            <ArrowLeftRight className="w-4 h-4" />
            User Dashboard
          </Button>

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

          {/* App Grid */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Creator Studio</DropdownMenuItem>
              <DropdownMenuItem>Analytics</DropdownMenuItem>
              <DropdownMenuItem>Community</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-primary">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 border-b">
                <h3 className="font-semibold">Creator Notifications</h3>
              </div>
              <div className="p-2">
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm">New subscriber: @creative_viewer</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm">Stream reached 500 viewers!</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm">Revenue milestone: $100 earned</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Creator Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>CR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-3 border-b">
                <p className="font-medium">Creator Name</p>
                <p className="text-sm text-muted-foreground">@creatorhandle</p>
                <Badge variant="secondary" className="mt-1 text-xs">Verified Creator</Badge>
              </div>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Creator Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Creator Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/auth/login')}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
