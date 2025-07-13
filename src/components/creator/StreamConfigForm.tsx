
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface StreamConfigFormProps {
  data: any;
  onChange: (data: any) => void;
}

export const StreamConfigForm = ({ data, onChange }: StreamConfigFormProps) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleTagAdd = (tag: string) => {
    if (tag && !data.tags.includes(tag)) {
      handleChange('tags', [...data.tags, tag]);
    }
  };

  const handleTagRemove = (index: number) => {
    const newTags = data.tags.filter((_: any, i: number) => i !== index);
    handleChange('tags', newTags);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stream Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Stream Title *</Label>
            <Input
              id="title"
              placeholder="What's your stream about today?"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {data.title.length}/200 characters
            </p>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={data.category} onValueChange={(value) => handleChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="talk">Talk Show</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="dance">Dance</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Stream Thumbnail (Optional)</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                JPG/PNG, max 2MB, 16:9 recommended
              </p>
            </div>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {data.tags.map((tag: string, index: number) => (
                <div
                  key={index}
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  #{tag}
                  <button onClick={() => handleTagRemove(index)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <Input
              placeholder="Add tags (press Enter)"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleTagAdd(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
