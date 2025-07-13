
import React, { useState } from 'react';
import { Shield, Eye, Globe, Users, Lock } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnlineStatus: true,
    showLastSeen: false,
    allowMessages: 'followers',
    showFollowerList: true,
    showFollowingList: true,
    contentVisibility: 'public',
    allowStreamRecording: true,
    allowHighlightCreation: true
  });

  const handleToggle = (key: string) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Profile Visibility
          </CardTitle>
          <CardDescription>Control who can see your profile and content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Visibility</Label>
            <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <div>
                      <div>Public</div>
                      <div className="text-xs text-muted-foreground">Anyone can see your profile</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="followers">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <div>
                      <div>Followers Only</div>
                      <div className="text-xs text-muted-foreground">Only followers can see your content</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <div>
                      <div>Private</div>
                      <div className="text-xs text-muted-foreground">Only you can see your content</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Show Follower List</Label>
              <p className="text-xs text-muted-foreground">Allow others to see who follows you</p>
            </div>
            <Switch
              checked={privacy.showFollowerList}
              onCheckedChange={() => handleToggle('showFollowerList')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Show Following List</Label>
              <p className="text-xs text-muted-foreground">Allow others to see who you follow</p>
            </div>
            <Switch
              checked={privacy.showFollowingList}
              onCheckedChange={() => handleToggle('showFollowingList')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Activity Status
          </CardTitle>
          <CardDescription>Control who can see your online activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Show Online Status</Label>
              <p className="text-xs text-muted-foreground">Show when you're online</p>
            </div>
            <Switch
              checked={privacy.showOnlineStatus}
              onCheckedChange={() => handleToggle('showOnlineStatus')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Show Last Seen</Label>
              <p className="text-xs text-muted-foreground">Show when you were last active</p>
            </div>
            <Switch
              checked={privacy.showLastSeen}
              onCheckedChange={() => handleToggle('showLastSeen')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Privacy</CardTitle>
          <CardDescription>Control how your content can be used and shared</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Content Visibility</Label>
            <Select value={privacy.contentVisibility} onValueChange={(value) => setPrivacy(prev => ({ ...prev, contentVisibility: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can see</SelectItem>
                <SelectItem value="followers">Followers Only</SelectItem>
                <SelectItem value="private">Private - Only me</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Allow Stream Recording</Label>
              <p className="text-xs text-muted-foreground">Let viewers record your live streams</p>
            </div>
            <Switch
              checked={privacy.allowStreamRecording}
              onCheckedChange={() => handleToggle('allowStreamRecording')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Allow Highlight Creation</Label>
              <p className="text-xs text-muted-foreground">Let viewers create clips from your streams</p>
            </div>
            <Switch
              checked={privacy.allowHighlightCreation}
              onCheckedChange={() => handleToggle('allowHighlightCreation')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication</CardTitle>
          <CardDescription>Control who can contact you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Who can message you</Label>
            <Select value={privacy.allowMessages} onValueChange={(value) => setPrivacy(prev => ({ ...prev, allowMessages: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="followers">Followers Only</SelectItem>
                <SelectItem value="none">No One</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
