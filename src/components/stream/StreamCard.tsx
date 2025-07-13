
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StreamCardProps {
  stream: {
    id: string;
    title: string;
    creator: {
      name: string;
      avatar: string;
      verified: boolean;
    };
    thumbnail: string;
    viewers: number;
    category: string;
    duration: string;
    isLive: boolean;
  };
}

export const StreamCard = ({ stream }: StreamCardProps) => {
  const navigate = useNavigate();

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleClick = () => {
    navigate(`/stream/${stream.id}`);
  };

  return (
    <div 
      className="group cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-3">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-full object-cover"
        />
        
        {stream.isLive && (
          <Badge 
            variant="destructive" 
            className="absolute top-2 right-2 bg-red-600 text-white text-xs font-medium"
          >
            <Circle className="w-2 h-2 mr-1 fill-current animate-pulse" />
            LIVE
          </Badge>
        )}
        
        <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {stream.duration}
        </div>
        
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Eye className="w-3 h-3" />
          {formatViewerCount(stream.viewers)}
        </div>
      </div>
      
      <div className="flex gap-3">
        <Avatar className="w-9 h-9 flex-shrink-0">
          <AvatarImage src={stream.creator.avatar} alt={stream.creator.name} />
          <AvatarFallback>{stream.creator.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {stream.title}
          </h3>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1">
              <span>{stream.creator.name}</span>
              {stream.creator.verified && (
                <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-[8px]">✓</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span>{formatViewerCount(stream.viewers)} viewers</span>
              <span>•</span>
              <Badge variant="secondary" className="text-[10px] px-1 py-0">
                {stream.category}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
