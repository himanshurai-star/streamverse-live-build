
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Camera, Mic } from 'lucide-react';

interface TechnicalSettingsProps {
  data: any;
  onChange: (data: any) => void;
}

export const TechnicalSettings = ({ data, onChange }: TechnicalSettingsProps) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Camera Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Video Quality</Label>
            <Select value={data.quality} onValueChange={(value) => handleChange('quality', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto (Recommended)</SelectItem>
                <SelectItem value="1080p">1080p HD</SelectItem>
                <SelectItem value="720p">720p</SelectItem>
                <SelectItem value="480p">480p</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm opacity-75">Camera Preview</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Audio Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Microphone</Label>
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Microphone</SelectItem>
                <SelectItem value="built-in">Built-in Microphone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Background Music</Label>
              <p className="text-sm text-muted-foreground">
                Add royalty-free background music
              </p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label>Audio Levels</Label>
            <div className="flex items-center space-x-2">
              <Mic className="w-4 h-4" />
              <div className="flex-1 bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
