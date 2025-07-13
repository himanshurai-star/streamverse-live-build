
import React from 'react';
import { Button } from '@/components/ui/button';
import { Power, Camera, Mic, MicOff, Radio, Sparkles, Smile } from 'lucide-react';

interface LiveStreamControlsProps {
  isVisible: boolean;
  onEndStream: () => void;
  onToggleChat: () => void;
  onToggleCamera: () => void;
  onToggleMicrophone: () => void;
}

export const LiveStreamControls = ({ 
  isVisible, 
  onEndStream, 
  onToggleChat, 
  onToggleCamera, 
  onToggleMicrophone 
}: LiveStreamControlsProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
      <div className="flex items-center justify-between">
        {/* Left Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="destructive"
            onClick={onEndStream}
            className="bg-red-600 hover:bg-red-700"
          >
            <Power className="w-5 h-5 mr-2" />
            End Live
          </Button>
          
          <Button
            variant="secondary"
            onClick={onToggleCamera}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Camera className="w-5 h-5" />
          </Button>
        </div>

        {/* Center Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            onClick={onToggleMicrophone}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Mic className="w-5 h-5" />
          </Button>
          
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Radio className="w-5 h-5" />
          </Button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Sparkles className="w-5 h-5" />
          </Button>
          
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Smile className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
