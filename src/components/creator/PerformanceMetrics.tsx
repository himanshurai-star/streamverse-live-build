
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, DollarSign, Video, TrendingUp, TrendingDown } from 'lucide-react';

export const PerformanceMetrics = () => {
  const metrics = [
    {
      title: 'Followers',
      value: '12.5K',
      change: '+5.2%',
      trend: 'up',
      icon: Users,
      description: 'Total followers'
    },
    {
      title: 'Engagement',
      value: '8.4%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      description: 'Average engagement rate'
    },
    {
      title: 'Earnings',
      value: '$1,247',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
      description: 'This month'
    },
    {
      title: 'Stream Performance',
      value: '456',
      change: '-3.2%',
      trend: 'down',
      icon: Video,
      description: 'Avg. concurrent viewers'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Performance Overview</h2>
        <Badge variant="outline">Last 30 days</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={metric.title} className="hover:shadow-md transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`flex items-center text-xs ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {metric.change}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    vs last period
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
