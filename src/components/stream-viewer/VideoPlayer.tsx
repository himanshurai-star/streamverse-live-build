
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  Maximize, 
  PictureInPicture,
  RotateCcw
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StreamData {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar: string;
    subscribers: string;
    verified: boolean;
    online: boolean;
  };
  category: string;
  viewers: number;
  startedAt: Date;
  isLive: boolean;
  description: string;
  tags: string[];
}

interface VideoPlayerProps {
  streamData: StreamData;
  theaterMode: boolean;
}

export const VideoPlayer = ({ streamData, theaterMode }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [quality, setQuality] = useState('Auto');
  const playerRef = useRef<HTMLDivElement>(null);

  const formatDuration = (startTime: Date) => {
    const now = new Date();
    const diff = now.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleFullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        playerRef.current.requestFullscreen();
      }
    }
  };

  const handlePictureInPicture = () => {
    // Picture-in-picture functionality would be implemented here
    console.log('Picture-in-picture not implemented yet');
  };

  const handleRetry = () => {
    setIsError(false);
    setIsLoading(true);
    // Simulate retry
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={playerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${
        theaterMode ? 'aspect-video' : 'aspect-video'
      }`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Content Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-primary-foreground ml-1" />
          </div>
          <p className="text-lg font-medium">Live Stream Placeholder</p>
          <p className="text-sm text-gray-400 mt-1">Video player implementation in progress</p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading stream...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {isError && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium mb-2">Connection Error</p>
            <p className="text-sm text-gray-400 mb-4">Unable to load the stream</p>
            <Button onClick={handleRetry} variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Progress Bar */}
          <div className="w-full h-1 bg-white/30 rounded-full mb-4">
            <div className="h-full bg-primary rounded-full w-1/3"></div>
          </div>

          <div className="flex items-center justify-between">
            {/* Left Controls */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20 w-12 h-12"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6 ml-0.5" />
                )}
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleMuteToggle}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none slider"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="destructive" className="bg-red-600 text-white">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  LIVE
                </Badge>
                <span className="text-white text-sm">
                  {formatViewerCount(streamData.viewers)} watching
                </span>
              </div>
            </div>

            {/* Center - Stream Title */}
            <div className="hidden md:block flex-1 mx-8">
              <p className="text-white text-sm font-medium text-center truncate">
                {streamData.title}
              </p>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setQuality('Auto')}>
                    Auto {quality === 'Auto' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuality('1080p')}>
                    1080p {quality === '1080p' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuality('720p')}>
                    720p {quality === '720p' && '✓'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setQuality('480p')}>
                    480p {quality === '480p' && '✓'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                variant="ghost"
                size="icon"
                onClick={handlePictureInPicture}
                className="text-white hover:bg-white/20"
              >
                <PictureInPicture className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Maximize className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Duration */}
      <div className="absolute top-4 left-4">
        <Badge variant="outline" className="bg-black/50 text-white border-white/30">
          {formatDuration(streamData.startedAt)}
        </Badge>
      </div>
    </div>
  );
};
