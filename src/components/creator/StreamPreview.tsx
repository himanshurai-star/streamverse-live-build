
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Settings } from 'lucide-react';

interface StreamPreviewProps {
  data: any;
  onGoLive: () => void;
}

export const StreamPreview = ({ data, onGoLive }: StreamPreviewProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stream Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-black rounded-lg relative overflow-hidden mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Live Stream Preview</p>
                <p className="text-sm opacity-75">Your stream will appear here</p>
              </div>
            </div>
            
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-600 text-white">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                LIVE
              </Badge>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/50 rounded p-2">
                <p className="text-white font-medium">{data.title || 'Untitled Stream'}</p>
                <p className="text-white/75 text-sm">{data.category || 'No category'}</p>
              </div>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Test Stream Quality
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Final Check</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Title</p>
              <p className="text-sm text-muted-foreground">
                {data.title || 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Category</p>
              <p className="text-sm text-muted-foreground">
                {data.category || 'Not set'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Privacy</p>
              <p className="text-sm text-muted-foreground capitalize">
                {data.privacy}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Quality</p>
              <p className="text-sm text-muted-foreground">
                {data.quality}
              </p>
            </div>
          </div>

          <Button onClick={onGoLive} className="w-full bg-primary hover:bg-primary/90 text-white">
            <Play className="w-5 h-5 mr-2" />
            Go Live
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
