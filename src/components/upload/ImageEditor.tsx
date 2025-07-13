
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Crop, 
  Sliders, 
  Type, 
  Sparkles,
  RotateCw,
  FlipHorizontal
} from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onImageUpdate: (url: string) => void;
}

export const ImageEditor = ({ imageUrl, onImageUpdate }: ImageEditorProps) => {
  const [brightness, setBrightness] = useState([0]);
  const [contrast, setContrast] = useState([0]);
  const [saturation, setSaturation] = useState([0]);
  const [selectedFilter, setSelectedFilter] = useState('none');

  const filters = [
    { id: 'none', name: 'Original', preview: '' },
    { id: 'vintage', name: 'Vintage', preview: 'sepia(30%) contrast(120%)' },
    { id: 'bw', name: 'B&W', preview: 'grayscale(100%)' },
    { id: 'warm', name: 'Warm', preview: 'sepia(20%) saturate(120%)' },
    { id: 'cool', name: 'Cool', preview: 'hue-rotate(180deg) saturate(120%)' },
  ];

  const getImageStyle = () => {
    const filterString = selectedFilter === 'none' ? '' : 
      filters.find(f => f.id === selectedFilter)?.preview || '';
    
    return {
      filter: `brightness(${100 + brightness[0]}%) contrast(${100 + contrast[0]}%) saturate(${100 + saturation[0]}%) ${filterString}`,
    };
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-full h-full object-contain"
              style={getImageStyle()}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Edit Photo</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="filters" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="filters" className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </TabsTrigger>
              <TabsTrigger value="adjust" className="flex items-center space-x-1">
                <Sliders className="w-4 h-4" />
                <span className="hidden sm:inline">Adjust</span>
              </TabsTrigger>
              <TabsTrigger value="crop" className="flex items-center space-x-1">
                <Crop className="w-4 h-4" />
                <span className="hidden sm:inline">Crop</span>
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center space-x-1">
                <Type className="w-4 h-4" />
                <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="filters" className="space-y-3">
              <div className="grid grid-cols-5 gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id)}
                    className="h-16 p-1"
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 bg-muted rounded mb-1 mx-auto"></div>
                      <span className="text-xs">{filter.name}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="adjust" className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Brightness</label>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    max={50}
                    min={-50}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contrast</label>
                  <Slider
                    value={contrast}
                    onValueChange={setContrast}
                    max={50}
                    min={-50}
                    step={1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Saturation</label>
                  <Slider
                    value={saturation}
                    onValueChange={setSaturation}
                    max={50}
                    min={-50}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="crop" className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                <Button variant="outline" size="sm">Original</Button>
                <Button variant="outline" size="sm">1:1</Button>
                <Button variant="outline" size="sm">4:3</Button>
                <Button variant="outline" size="sm">16:9</Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <RotateCw className="w-4 h-4 mr-2" />
                  Rotate
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <FlipHorizontal className="w-4 h-4 mr-2" />
                  Flip
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="text" className="space-y-3">
              <Button variant="outline" className="w-full">
                <Type className="w-4 h-4 mr-2" />
                Add Text
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Tap to add text overlay to your photo
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
