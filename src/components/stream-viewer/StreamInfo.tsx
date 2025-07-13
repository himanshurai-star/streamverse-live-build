
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Share, 
  Bookmark, 
  Flag, 
  Bell, 
  BellRing,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

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

interface StreamInfoProps {
  streamData: StreamData;
}

export const StreamInfo = ({ streamData }: StreamInfoProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(342);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `Started ${diffInMinutes} minutes ago`;
    } else if (diffInHours === 1) {
      return 'Started 1 hour ago';
    } else {
      return `Started ${diffInHours} hours ago`;
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleNotificationToggle = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <div className="space-y-4">
      {/* Stream Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-semibold text-foreground mb-2 leading-tight">
            {streamData.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>{formatTimeAgo(streamData.startedAt)}</span>
            <span>•</span>
            <Badge variant="secondary" className="text-xs">
              {streamData.category}
            </Badge>
            <span>•</span>
            <span>{streamData.viewers.toLocaleString()} watching now</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isLiked ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
            className="gap-2"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            {likeCount}
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Share className="w-4 h-4" />
            Share
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Bookmark className="w-4 h-4" />
            Save
          </Button>
          
          <Button variant="outline" size="sm" className="gap-2">
            <Flag className="w-4 h-4" />
            Report
          </Button>
        </div>
      </div>

      {/* Creator Information */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={streamData.creator.avatar} alt={streamData.creator.name} />
              <AvatarFallback>{streamData.creator.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {streamData.creator.online && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary border-2 border-background rounded-full"></div>
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">
                {streamData.creator.name}
              </h3>
              {streamData.creator.verified && (
                <CheckCircle className="w-5 h-5 text-blue-500 fill-current" />
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {streamData.creator.subscribers} subscribers
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSubscribed && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleNotificationToggle}
              className="gap-2"
            >
              {isNotificationEnabled ? (
                <BellRing className="w-4 h-4" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
            </Button>
          )}
          
          <Button
            onClick={handleSubscribe}
            variant={isSubscribed ? "outline" : "default"}
            className={`gap-2 ${isSubscribed ? '' : 'bg-primary hover:bg-primary/90'}`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        </div>
      </div>

      {/* Stream Description */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {streamData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          <div>
            <p className={`text-sm text-foreground leading-relaxed ${
              isDescriptionExpanded ? '' : 'line-clamp-3'
            }`}>
              {streamData.description}
            </p>
            
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2 p-0 h-auto text-primary hover:text-primary/80 gap-1"
            >
              {isDescriptionExpanded ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
