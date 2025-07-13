
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Users, Pin, Flag, Settings } from 'lucide-react';

interface CreatorChatPanelProps {
  viewerCount: number;
  onModerateMessage: () => void;
  onPinMessage: () => void;
}

export const CreatorChatPanel = ({ viewerCount, onModerateMessage, onPinMessage }: CreatorChatPanelProps) => {
  return (
    <div className="absolute top-16 right-4 w-80 max-h-96 z-20">
      <Card className="bg-black/80 backdrop-blur-sm border-white/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <Users className="w-4 h-4" />
              Chat ({viewerCount})
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <ScrollArea className="h-32">
            <div className="space-y-2 text-white text-sm">
              <div className="p-2 rounded hover:bg-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs">Mod</Badge>
                  <span className="font-medium">ChatMod</span>
                </div>
                <p>Welcome everyone to the stream!</p>
              </div>
              
              <div className="p-2 rounded hover:bg-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-primary">SuperFan</span>
                  <Badge variant="outline" className="text-xs">Sub</Badge>
                </div>
                <p>Great stream quality! 🔥</p>
                <div className="flex gap-1 mt-1">
                  <Button variant="ghost" size="sm" onClick={onPinMessage} className="text-xs p-1 h-auto">
                    <Pin className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onModerateMessage} className="text-xs p-1 h-auto">
                    <Flag className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
