
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Menu,
  Search,
  Video,
  Plus,
  Grid3X3,
  Bell,
  Settings,
  User,
  LogOut,
  Mic
} from 'lucide-react';

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const DashboardHeader = ({ 
  onToggleSidebar, 
  searchQuery, 
  onSearchChange 
}: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 w-full bg-card/95 backdrop-blur-sm border-b border-border z-50">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
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
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-2xl mx-8 hidden md:block">
          <div className="relative">
            <Input
              placeholder="Search live streams..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-4 pr-12 py-2 rounded-full border-border bg-background"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-9 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
            >
              <Mic className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* Create/Go Live Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Video className="w-4 h-4 mr-2" />
                Go Live
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Plus className="w-4 h-4 mr-2" />
                Create Content
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="p-2">
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm">New follower: @john_doe</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm">Your stream reached 1K viewers!</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
                <div className="p-3 hover:bg-muted rounded-md">
                  <p className="text-sm">Payment processed: $45.67</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-3 border-b">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-muted-foreground">@johndoe</p>
              </div>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Your Channel
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
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
