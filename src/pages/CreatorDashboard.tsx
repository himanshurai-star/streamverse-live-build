
import React from 'react';
import { CreatorHeader } from '@/components/creator/CreatorHeader';
import { QuickActionsSection } from '@/components/creator/QuickActionsSection';
import { PerformanceMetrics } from '@/components/creator/PerformanceMetrics';
import { RecentActivityFeed } from '@/components/creator/RecentActivityFeed';
import { MonetizationSummary } from '@/components/creator/MonetizationSummary';

const CreatorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <CreatorHeader />
      
      <div className="pt-16 px-6 max-w-7xl mx-auto">
        <div className="space-y-8">
          <QuickActionsSection />
          <PerformanceMetrics />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RecentActivityFeed />
            <MonetizationSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
