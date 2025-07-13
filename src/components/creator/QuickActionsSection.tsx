
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Upload, Settings, Calendar, TrendingUp } from 'lucide-react';

export const QuickActionsSection = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Quick Actions</h2>
        <Badge variant="outline" className="text-xs">
          Last stream: 2 days ago
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Go Live Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Video className="w-8 h-8" />
              <Badge variant="secondary" className="bg-white/20 text-white">
                Ready
              </Badge>
            </div>
            <h3 className="text-xl font-semibold mb-2">Go Live</h3>
            <p className="text-primary-foreground/80 mb-4">
              Start streaming now and connect with your audience
            </p>
            <Button 
              onClick={() => navigate('/creator/go-live')}
              variant="secondary" 
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              Start Stream
            </Button>
          </CardContent>
        </Card>

        {/* Upload Content Card */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Upload className="w-8 h-8 text-primary" />
              <Badge variant="outline">3 drafts</Badge>
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Content</h3>
            <p className="text-muted-foreground mb-4">
              Share photos and videos with your followers
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Video className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Creator Tools Card */}
        <Card className="hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Settings className="w-8 h-8 text-primary" />
              <Badge variant="outline">Updated</Badge>
            </div>
            <h3 className="text-xl font-semibold mb-2">Creator Tools</h3>
            <p className="text-muted-foreground mb-4">
              Manage your channel and analyze performance
            </p>
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start p-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start p-2">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Content
              </Button>
              <Button variant="ghost" className="w-full justify-start p-2">
                <Settings className="w-4 h-4 mr-2" />
                Channel Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
