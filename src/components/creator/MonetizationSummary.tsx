
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, ChevronDown, ChevronUp, Gift, Eye } from 'lucide-react';

export const MonetizationSummary = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const revenueData = {
    thisMonth: { amount: 1247, target: 2000 },
    lastPayment: { date: '15 days ago', amount: 892 },
    nextPayout: { date: 'Dec 15, 2024', amount: 1247 },
    sources: [
      { name: 'Virtual Gifts', amount: 680, percentage: 55 },
      { name: 'Subscriptions', amount: 360, percentage: 29 },
      { name: 'Advertisements', amount: 150, percentage: 12 },
      { name: 'Tips', amount: 57, percentage: 4 }
    ]
  };

  const progressPercentage = (revenueData.thisMonth.amount / revenueData.thisMonth.target) * 100;

  return (
    <Card className="border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Monetization Summary
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary"
          >
            {isExpanded ? (
              <>Hide Details <ChevronUp className="w-4 h-4 ml-1" /></>
            ) : (
              <>Show Details <ChevronDown className="w-4 h-4 ml-1" /></>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* This Month Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">This Month</span>
            <Badge variant="secondary">${revenueData.thisMonth.amount}</Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>${revenueData.thisMonth.amount} earned</span>
            <span>Goal: ${revenueData.thisMonth.target}</span>
          </div>
        </div>

        {/* Payment Info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Last Payment</p>
            <p className="font-medium">${revenueData.lastPayment.amount}</p>
            <p className="text-xs text-muted-foreground">{revenueData.lastPayment.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next Payout</p>
            <p className="font-medium">${revenueData.nextPayout.amount}</p>
            <p className="text-xs text-muted-foreground">{revenueData.nextPayout.date}</p>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Revenue Sources
              </h4>
              <div className="space-y-3">
                {revenueData.sources.map((source) => (
                  <div key={source.name} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{source.name}</span>
                      <span className="font-medium">${source.amount}</span>
                    </div>
                    <Progress value={source.percentage} className="h-1" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Gift className="w-4 h-4 mr-2" />
                Gift Settings
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
