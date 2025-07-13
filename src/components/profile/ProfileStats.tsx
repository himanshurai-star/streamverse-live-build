
import React from 'react';
import { Users, Video, Eye } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

interface ProfileStatsProps {
  user: {
    followers: number;
    following: number;
    posts: number;
    streams?: number;
    totalViews?: string;
    isCreator: boolean;
  };
}

const ProfileStats = ({ user }: ProfileStatsProps) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex gap-4">
      <Card className="flex-1">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-primary mr-2" />
          </div>
          <div className="text-2xl font-semibold">{formatNumber(user.followers)}</div>
          <div className="text-sm text-muted-foreground">Followers</div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-semibold">{formatNumber(user.following)}</div>
          <div className="text-sm text-muted-foreground">Following</div>
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-semibold">{formatNumber(user.posts)}</div>
          <div className="text-sm text-muted-foreground">Posts</div>
        </CardContent>
      </Card>

      {user.isCreator && user.streams && (
        <Card className="flex-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Video className="w-5 h-5 text-primary mr-2" />
            </div>
            <div className="text-2xl font-semibold">{user.streams}</div>
            <div className="text-sm text-muted-foreground">Streams</div>
          </CardContent>
        </Card>
      )}

      {user.isCreator && user.totalViews && (
        <Card className="flex-1">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-primary mr-2" />
            </div>
            <div className="text-2xl font-semibold">{user.totalViews}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileStats;
