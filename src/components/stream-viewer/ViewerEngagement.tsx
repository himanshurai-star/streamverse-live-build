
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Heart, 
  Gift, 
  Share2, 
  UserPlus,
  Star,
  Zap,
  Crown
} from 'lucide-react';

interface ViewerEngagementProps {
  streamId: string;
  isFollowing: boolean;
  onFollow: () => void;
  onSendGift: (gift: any) => void;
  onShare: () => void;
}

interface GiftOption {
  id: string;
  name: string;
  icon: string;
  coins: number;
  color: string;
}

export const ViewerEngagement = ({ 
  streamId, 
  isFollowing, 
  onFollow, 
  onSendGift, 
  onShare 
}: ViewerEngagementProps) => {
  const [likes, setLikes] = useState(1247);
  const [hasLiked, setHasLiked] = useState(false);
  const [showGifts, setShowGifts] = useState(false);
  const [recentGifts, setRecentGifts] = useState<any[]>([]);

  const quickGifts: GiftOption[] = [
    { id: '1', name: 'Heart', icon: '❤️', coins: 10, color: 'text-red-500' },
    { id: '2', name: 'Star', icon: '⭐', coins: 50, color: 'text-yellow-500' },
    { id: '3', name: 'Fire', icon: '🔥', coins: 100, color: 'text-orange-500' },
    { id: '4', name: 'Crown', icon: '👑', coins: 500, color: 'text-yellow-600' }
  ];

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      // Create floating heart animation
      createFloatingHeart();
    }
  };

  const createFloatingHeart = () => {
    // This would create floating heart particles animation
    console.log('Creating floating heart animation');
  };

  const handleSendGift = (gift: GiftOption) => {
    onSendGift(gift);
    setRecentGifts(prev => [gift, ...prev.slice(0, 4)]);
    setShowGifts(false);
  };

  // Simulate gift notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const randomGift = quickGifts[Math.floor(Math.random() * quickGifts.length)];
        setRecentGifts(prev => [randomGift, ...prev.slice(0, 4)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Recent Gift Notifications */}
      {recentGifts.length > 0 && (
        <div className="space-y-2">
          {recentGifts.slice(0, 3).map((gift, index) => (
            <Card key={`${gift.id}-${index}`} className="bg-primary/10 border-primary/20">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{gift.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">
                      Someone sent {gift.name}!
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {gift.coins} coins
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Main Engagement Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Follow Button */}
            <Button
              variant={isFollowing ? "outline" : "default"}
              onClick={onFollow}
              className="flex items-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>{isFollowing ? 'Following' : 'Follow'}</span>
            </Button>

            {/* Share Button */}
            <Button
              variant="outline"
              onClick={onShare}
              className="flex items-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>

            {/* Like Button */}
            <Button
              variant={hasLiked ? "default" : "outline"}
              onClick={handleLike}
              className="flex items-center space-x-2 col-span-2"
              disabled={hasLiked}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{likes.toLocaleString()} likes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Gifts */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Send a Gift</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGifts(!showGifts)}
              >
                {showGifts ? 'Less' : 'More'}
              </Button>
            </div>
            
            <div className={`grid ${showGifts ? 'grid-cols-2' : 'grid-cols-4'} gap-2`}>
              {(showGifts ? quickGifts : quickGifts.slice(0, 4)).map((gift) => (
                <Button
                  key={gift.id}
                  variant="outline"
                  onClick={() => handleSendGift(gift)}
                  className="flex flex-col items-center space-y-1 h-auto p-3"
                >
                  <span className="text-lg">{gift.icon}</span>
                  <span className="text-xs">{gift.coins}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Viewer Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Stream Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-primary">{likes.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Likes</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-primary">2.1K</p>
                <p className="text-xs text-muted-foreground">Gifts Sent</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
