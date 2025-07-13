
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Clock, MoreVertical, Share, Flag, CheckCircle } from 'lucide-react';

interface StreamCardProps {
  stream: {
    id: string;
    title: string;
    creator: string;
    creatorAvatar: string;
    thumbnail: string;
    viewerCount: number;
    category: string;
    duration: string;
    isLive: boolean;
    isVerified: boolean;
  };
}

export const StreamCard = ({ stream }: StreamCardProps) => {
  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card className="group cursor-pointer overflow-hidden hover:scale-[1.02] transition-transform duration-200">
      <div className="relative aspect-video">
        {/* Thumbnail */}
        <img 
          src={stream.thumbnail} 
          alt={stream.title}
          className="w-full h-full object-cover bg-muted"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop&crop=center&auto=format&q=75`;
          }}
        />
        
        {/* Overlay Elements */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Live Badge */}
        {stream.isLive && (
          <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1">
            LIVE
          </Badge>
        )}
        
        {/* Duration */}
        <Badge 
          variant="secondary" 
          className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1"
        >
          {stream.duration}
        </Badge>
        
        {/* Viewer Count */}
        <div className="absolute bottom-2 left-2 flex items-center space-x-1 bg-black/80 text-white text-xs px-2 py-1 rounded">
          <Eye className="w-3 h-3" />
          <span>{formatViewerCount(stream.viewerCount)}</span>
        </div>
        
        {/* Hover Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="w-8 h-8 bg-black/80 hover:bg-black/60">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Clock className="w-4 h-4 mr-2" />
                Watch Later
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share className="w-4 h-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="w-4 h-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <CardContent className="p-3">
        <div className="flex space-x-3">
          {/* Creator Avatar */}
          <div className="relative flex-shrink-0">
            <Avatar className="w-9 h-9">
              <AvatarImage src={stream.creatorAvatar} />
              <AvatarFallback>{stream.creator.charAt(0)}</AvatarFallback>
            </Avatar>
            {stream.isLive && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-primary border-2 border-background rounded-full" />
            )}
          </div>
          
          {/* Stream Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm line-clamp-2 text-foreground mb-1">
              {stream.title}
            </h3>
            
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>{stream.creator}</span>
              {stream.isVerified && (
                <CheckCircle className="w-3 h-3 text-primary" />
              )}
            </div>
            
            <div className="text-xs text-muted-foreground mt-1">
              <span>{formatViewerCount(stream.viewerCount)} viewers</span>
              <span className="mx-1">•</span>
              <span>{stream.category}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
