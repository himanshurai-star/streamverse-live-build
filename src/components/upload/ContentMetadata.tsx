
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Globe, 
  Users, 
  Lock, 
  MapPin, 
  Hash,
  X
} from 'lucide-react';

interface ContentMetadataProps {
  caption: string;
  setCaption: (caption: string) => void;
  hashtags: string[];
  setHashtags: (hashtags: string[]) => void;
  privacy: 'public' | 'followers' | 'private';
  setPrivacy: (privacy: 'public' | 'followers' | 'private') => void;
  location: string;
  setLocation: (location: string) => void;
  showTitle?: boolean;
  title?: string;
  setTitle?: (title: string) => void;
}

export const ContentMetadata = ({
  caption,
  setCaption,
  hashtags,
  setHashtags,
  privacy,
  setPrivacy,
  location,
  setLocation,
  showTitle = false,
  title = '',
  setTitle
}: ContentMetadataProps) => {
  const [hashtagInput, setHashtagInput] = React.useState('');
  
  const suggestedHashtags = [
    'photography', 'art', 'nature', 'travel', 'lifestyle',
    'creative', 'inspiration', 'beautiful', 'amazing', 'love'
  ];

  const addHashtag = (tag: string) => {
    if (tag && !hashtags.includes(tag) && hashtags.length < 30) {
      setHashtags([...hashtags, tag]);
    }
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(h => h !== tag));
  };

  const handleHashtagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addHashtag(hashtagInput.trim().replace('#', ''));
      setHashtagInput('');
    }
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: Globe, description: 'Anyone can see this' },
    { value: 'followers', label: 'Followers', icon: Users, description: 'Only followers can see this' },
    { value: 'private', label: 'Private', icon: Lock, description: 'Only you can see this' }
  ] as const;

  return (
    <div className="space-y-4">
      {/* Title (for videos) */}
      {showTitle && setTitle && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Title</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Give your video a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {title.length}/100 characters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Caption */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Caption</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={2200}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {caption.length}/2,200 characters
          </p>
        </CardContent>
      </Card>

      {/* Hashtags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <Hash className="w-4 h-4 mr-2" />
            Hashtags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1">
            {hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                <span>#{tag}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => removeHashtag(tag)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
          
          <Input
            placeholder="Add hashtags (press Enter to add)"
            value={hashtagInput}
            onChange={(e) => setHashtagInput(e.target.value)}
            onKeyPress={handleHashtagInputKeyPress}
          />
          
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Suggested hashtags:</p>
            <div className="flex flex-wrap gap-1">
              {suggestedHashtags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => addHashtag(tag)}
                  disabled={hashtags.includes(tag)}
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            {hashtags.length}/30 hashtags
          </p>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {privacyOptions.map((option) => (
              <Button
                key={option.value}
                variant={privacy === option.value ? "default" : "outline"}
                className="w-full justify-start h-auto p-3"
                onClick={() => setPrivacy(option.value)}
              >
                <option.icon className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs opacity-70">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Add location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </CardContent>
      </Card>
    </div>
  );
};
