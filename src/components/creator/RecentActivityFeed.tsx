
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Trophy, DollarSign, MessageSquare, Bell, RefreshCw } from 'lucide-react';

export const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'followers',
      icon: Users,
      message: '5 new users followed you',
      timestamp: '2 minutes ago',
      actionable: false
    },
    {
      id: 2,
      type: 'milestone',
      icon: Trophy,
      message: 'Reached 1K concurrent viewers on your last stream',
      timestamp: '1 hour ago',
      actionable: false
    },
    {
      id: 3,
      type: 'earnings',
      icon: DollarSign,
      message: 'Received $50 in gifts from viewers',
      timestamp: '3 hours ago',
      actionable: true,
      action: 'View breakdown'
    },
    {
      id: 4,
      type: 'comment',
      icon: MessageSquare,
      message: 'New comment on your latest video',
      timestamp: '5 hours ago',
      actionable: true,
      action: 'Reply'
    },
    {
      id: 5,
      type: 'system',
      icon: Bell,
      message: 'Your stream has been featured in Gaming category',
      timestamp: '1 day ago',
      actionable: false
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'followers': return 'text-blue-500';
      case 'milestone': return 'text-yellow-500';
      case 'earnings': return 'text-green-500';
      case 'comment': return 'text-purple-500';
      case 'system': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <Button variant="ghost" size="icon">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      {activity.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                      {activity.actionable && (
                        <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                          {activity.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
