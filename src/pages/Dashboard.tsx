
import React, { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { StreamGrid } from '@/components/stream/StreamGrid';
import { CategoryTabs } from '@/components/stream/CategoryTabs';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        onToggleSidebar={toggleSidebar}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex">
        <DashboardSidebar collapsed={sidebarCollapsed} />
        
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'
        }`}>
          <div className="pt-16 px-6">
            <CategoryTabs 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-primary">Live Now</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    {/* This will be updated with real stream count */}
                    156 streams currently live
                  </p>
                </div>
              </div>
              
              <StreamGrid 
                category={selectedCategory}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
