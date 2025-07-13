
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, Camera } from 'lucide-react';

interface PhotoUploadAreaProps {
  onImageSelect: (file: File) => void;
}

export const PhotoUploadArea = ({ onImageSelect }: PhotoUploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
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
              Upload your photo
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
              <ImageIcon className="w-4 h-4" />
              <span>Choose from Gallery</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>Take Photo</span>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Supports JPG, PNG up to 10MB
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};
