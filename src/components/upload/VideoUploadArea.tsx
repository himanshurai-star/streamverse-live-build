
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Video, Camera } from 'lucide-react';

interface VideoUploadAreaProps {
  onVideoSelect: (file: File) => void;
}

export const VideoUploadArea = ({ onVideoSelect }: VideoUploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    }
  };

  return (
    <Card className="border-2 border-dashed border-border">
      <CardContent className="p-8">
        <div 
          className="text-center space-y-4"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-muted-foreground" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Upload your video
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop or click to select files
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2"
            >
              <Video className="w-4 h-4" />
              <span>Choose Video</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>Record Video</span>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Supports MP4, MOV, AVI up to 100MB • 15s to 10min duration
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};
