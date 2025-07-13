
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Users, MessageCircle, MoreHorizontal, Settings, Copy, Share2, Flag, Ban } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';

import ProfileEditModal from '../components/profile/ProfileEditModal';
import ProfileContentTabs from '../components/profile/ProfileContentTabs';
import ProfileStats from '../components/profile/ProfileStats';

const UserProfile = () => {
  const { username } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Mock user data - replace with actual data fetching
  const isOwnProfile = true; // Replace with actual auth check
  const user = {
    username: 'johndoe',
    displayName: 'John Doe',
    bio: 'Content creator and streamer sharing gaming, music, and lifestyle content. Follow for daily streams! 🎮🎵',
    avatar: '/placeholder.svg',
    isVerified: true,
    isCreator: true,
    followers: 12500,
    following: 856,
    posts: 234,
    streams: 45,
    totalViews: '1.2M'
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessage = () => {
    // Navigate to messaging interface
    console.log('Open message interface');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary">
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback className="text-2xl">
                  {user.displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              {isOwnProfile && (
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-semibold">{user.displayName}</h1>
                    {user.isVerified && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">
                        Verified
                      </Badge>
                    )}
                    {user.isCreator && (
                      <Badge className="bg-primary hover:bg-primary/90">
                        Creator
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 md:ml-auto">
                  {isOwnProfile ? (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleFollow}
                        className={isFollowing ? "bg-secondary text-secondary-foreground hover:bg-destructive hover:text-destructive-foreground" : ""}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button variant="outline" onClick={handleMessage}>
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`@${user.username}`)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Username
                      </DropdownMenuItem>
                      {!isOwnProfile && (
                        <>
                          <DropdownMenuItem>
                            <Flag className="w-4 h-4 mr-2" />
                            Report User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="w-4 h-4 mr-2" />
                            Block User
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Bio */}
              <p className="text-foreground max-w-2xl">{user.bio}</p>

              {/* Stats */}
              <ProfileStats user={user} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-6">
        <ProfileContentTabs user={user} />
      </div>

      {/* Edit Profile Modal */}
      {isOwnProfile && (
        <ProfileEditModal
          user={user}
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
        />
      )}
    </div>
  );
};

export default UserProfile;
