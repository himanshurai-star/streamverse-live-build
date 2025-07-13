
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Home,
  Users,
  Video,
  Library,
  Clock,
  TrendingUp,
  Gamepad2,
  Music,
  Palette,
  Cpu,
  Dumbbell,
  Utensils,
  GraduationCap,
  Trophy,
  Settings,
  HelpCircle,
  MessageSquare,
  Flame,
  User
} from 'lucide-react';

interface DashboardSidebarProps {
  collapsed: boolean;
}

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  badge?: string | number;
  isLive?: boolean;
}

const primaryNavItems: NavItem[] = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Users, label: 'Subscriptions', path: '/subscriptions', badge: 5 },
  { icon: Video, label: 'Live Now', path: '/live', isLive: true },
];

const libraryItems: NavItem[] = [
  { icon: Library, label: 'Library', path: '/library' },
  { icon: Clock, label: 'History', path: '/history' },
  { icon: User, label: 'Your Streams', path: '/your-streams' },
];

const exploreItems: NavItem[] = [
  { icon: Flame, label: 'Trending', path: '/trending' },
  { icon: Gamepad2, label: 'Gaming', path: '/gaming' },
  { icon: Music, label: 'Music', path: '/music' },
  { icon: Palette, label: 'Art', path: '/art' },
  { icon: Cpu, label: 'Technology', path: '/technology' },
  { icon: Dumbbell, label: 'Fitness', path: '/fitness' },
  { icon: Utensils, label: 'Food', path: '/food' },
  { icon: GraduationCap, label: 'Education', path: '/education' },
  { icon: Trophy, label: 'Sports', path: '/sports' },
];

const settingsItems: NavItem[] = [
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
  { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
];

export const DashboardSidebar = ({ collapsed }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const NavSection = ({ 
    items, 
    title 
  }: { 
    items: NavItem[]; 
    title?: string; 
  }) => (
    <div className="space-y-1">
      {title && !collapsed && (
        <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Button
            key={item.path}
            variant={isActive ? "secondary" : "ghost"}
            className={`w-full justify-start h-10 px-3 ${
              collapsed ? 'px-2' : ''
            } ${
              isActive ? 'bg-secondary border-l-2 border-primary' : ''
            }`}
            onClick={() => navigate(item.path)}
          >
            <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} ${
              item.isLive ? 'text-primary' : ''
            }`} />
            {!collapsed && (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm">{item.label}</span>
                {item.badge && (
                  <Badge 
                    variant={item.isLive ? "default" : "secondary"} 
                    className={`text-xs ${
                      item.isLive ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
                {item.isLive && !item.badge && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </div>
            )}
          </Button>
        );
      })}
    </div>
  );

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 z-40 ${
      collapsed ? 'w-[72px]' : 'w-[240px]'
    }`}>
      <div className="flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-muted">
        <div className="p-3 space-y-6">
          <NavSection items={primaryNavItems} />
          
          <Separator />
          
          <NavSection items={libraryItems} title={collapsed ? undefined : "Library"} />
          
          <Separator />
          
          <NavSection items={exploreItems} title={collapsed ? undefined : "Explore"} />
          
          <Separator />
          
          <NavSection items={settingsItems} title={collapsed ? undefined : "Settings"} />
        </div>
      </div>
    </aside>
  );
};
