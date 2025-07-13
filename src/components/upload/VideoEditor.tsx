
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Volume2, 
  Scissors, 
  Sparkles,
  Music,
  Type
} from 'lucide-react';

interface VideoEditorProps {
  videoUrl: string;
  onVideoUpdate: (url: string) => void;
}

export const VideoEditor = ({ videoUrl, onVideoUpdate }: VideoEditorProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState([100]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-white text-sm">{formatTime(currentTime)}</span>
                  <div className="flex-1 h-1 bg-white/30 rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-white text-sm">{formatTime(duration)}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-white" />
                  <div className="w-16">
                    <Slider
                      value={volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="[&_[role=slider]]:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Edit Video</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trim" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trim">
                <Scissors className="w-4 h-4 mr-2" />
                Trim
              </TabsTrigger>
              <TabsTrigger value="effects">
                <Sparkles className="w-4 h-4 mr-2" />
                Effects
              </TabsTrigger>
              <TabsTrigger value="audio">
                <Music className="w-4 h-4 mr-2" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="w-4 h-4 mr-2" />
                Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trim" className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Trim Video</label>
                <div className="h-8 bg-muted rounded flex items-center px-2">
                  <div className="flex-1 h-2 bg-primary/30 rounded relative">
                    <div className="absolute left-0 w-2 h-4 bg-primary rounded-sm -top-1 cursor-pointer"></div>
                    <div className="absolute right-0 w-2 h-4 bg-primary rounded-sm -top-1 cursor-pointer"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Start: 0:00</span>
                  <span>End: {formatTime(duration)}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effects" className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {['Original', 'Vintage', 'B&W', 'Dramatic'].map((effect) => (
                  <Button key={effect} variant="outline" size="sm" className="h-16 p-1">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-muted rounded mb-1 mx-auto"></div>
                      <span className="text-xs">{effect}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Music className="w-4 h-4 mr-2" />
                  Add Background Music
                </Button>
                <div>
                  <label className="text-sm font-medium">Original Audio</label>
                  <Slider
                    value={[50]}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-3">
              <Button variant="outline" className="w-full">
                <Type className="w-4 h-4 mr-2" />
                Add Text Overlay
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Add text that appears at specific times in your video
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
