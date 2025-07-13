
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Eye, Clock, DollarSign, Signal } from 'lucide-react';

interface LiveStreamOverlaysProps {
  isVisible: boolean;
  streamDuration: string;
  viewerCount: number;
  earnings: number;
  isLive: boolean;
}

export const LiveStreamOverlays = ({ 
  isVisible, 
  streamDuration, 
  viewerCount, 
  earnings, 
  isLive 
}: LiveStreamOverlaysProps) => {
  if (!isVisible) return null;

  return (
    <>
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge className="bg-red-600 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE
            </Badge>
            <div className="flex items-center text-white text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {streamDuration}
            </div>
            <div className="flex items-center text-white text-sm">
              <Eye className="w-4 h-4 mr-1" />
              {viewerCount.toLocaleString()}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-white text-sm">
              <DollarSign className="w-4 h-4 mr-1" />
              ${earnings.toFixed(2)}
            </div>
            <div className="flex items-center text-green-400">
              <Signal className="w-4 h-4 mr-1" />
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-green-400 rounded"></div>
                <div className="w-1 h-4 bg-green-400 rounded"></div>
                <div className="w-1 h-4 bg-green-400 rounded"></div>
                <div className="w-1 h-3 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Follower Notification */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-top duration-500">
          <p className="text-sm font-medium">Welcome @new_follower! 🎉</p>
        </div>
      </div>
    </>
  );
};
