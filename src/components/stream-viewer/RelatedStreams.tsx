
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Eye, CheckCircle } from 'lucide-react';

interface RelatedStream {
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
  isLive: boolean;
}

interface RelatedStreamsProps {
  currentStreamId: string;
  category?: string;
}

// Mock related streams data
const mockRelatedStreams: RelatedStream[] = [
  {
    id: '2',
    title: 'Digital Art Live - Character Design Process',
    creator: {
      name: 'ArtistMaria',
      avatar: '/placeholder.svg',
      verified: false
    },
    thumbnail: '/placeholder.svg',
    viewers: 856,
    category: 'Art',
    isLive: true
  },
  {
    id: '3',
    title: 'Cooking Italian Pasta from Scratch',
    creator: {
      name: 'ChefCarlos',
      avatar: '/placeholder.svg',
      verified: true
    },
    thumbnail: '/placeholder.svg',
    viewers: 2341,
    category: 'Food',
    isLive: true
  },
  {
    id: '4',
    title: 'React Tutorial - Building Modern Apps',
    creator: {
      name: 'DevTutor',
      avatar: '/placeholder.svg',
      verified: false
    },
    thumbnail: '/placeholder.svg',
    viewers: 623,
    category: 'Technology',
    isLive: true
  },
  {
    id: '5',
    title: 'Morning Yoga Flow - Energize Your Day',
    creator: {
      name: 'YogaZen',
      avatar: '/placeholder.svg',
      verified: true
    },
    thumbnail: '/placeholder.svg',
    viewers: 189,
    category: 'Fitness',
    isLive: true
  },
  {
    id: '6',
    title: 'Jazz Piano Improvisation Session',
    creator: {
      name: 'JazzMaestro',
      avatar: '/placeholder.svg',
      verified: false
    },
    thumbnail: '/placeholder.svg',
    viewers: 445,
    category: 'Music',
    isLive: true
  }
];

export const RelatedStreams = ({ currentStreamId, category }: RelatedStreamsProps) => {
  const navigate = useNavigate();

  // Filter out current stream and limit results
  const relatedStreams = mockRelatedStreams
    .filter(stream => stream.id !== currentStreamId)
    .slice(0, 6);

  const handleStreamClick = (streamId: string) => {
    navigate(`/stream/${streamId}`);
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-4">Live Streams You Might Like</h3>
      
      <div className="space-y-3">
        {relatedStreams.map((stream) => (
          <div
            key={stream.id}
            onClick={() => handleStreamClick(stream.id)}
            className="flex space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group"
          >
            {/* Thumbnail */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-14 bg-muted rounded-md overflow-hidden">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              {/* Live Badge */}
              {stream.isLive && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 text-xs px-1 py-0 h-auto bg-red-600 text-white"
                >
                  LIVE
                </Badge>
              )}
              
              {/* Viewer Count */}
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 py-0.5 rounded flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{formatViewerCount(stream.viewers)}</span>
              </div>
            </div>

            {/* Stream Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                {stream.title}
              </h4>
              
              <div className="flex items-center space-x-1 mb-1">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={stream.creator.avatar} alt={stream.creator.name} />
                  <AvatarFallback className="text-xs">
                    {stream.creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <span className="text-xs text-muted-foreground truncate">
                  {stream.creator.name}
                </span>
                
                {stream.creator.verified && (
                  <CheckCircle className="w-3 h-3 text-blue-500 fill-current flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {stream.category}
                </Badge>
                
                <span className="text-xs text-muted-foreground">
                  {formatViewerCount(stream.viewers)} viewers
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show More Button */}
      <button className="w-full mt-4 text-sm text-primary hover:text-primary/80 transition-colors">
        Show more streams
      </button>
    </div>
  );
};
