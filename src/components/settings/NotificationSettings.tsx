
import React, { useState } from 'react';
import { Bell, Smartphone, Mail } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    emailEnabled: true,
    liveStreams: true,
    newFollowers: true,
    comments: true,
    mentions: true,
    likes: false,
    systemUpdates: true,
    marketingEmails: false,
    frequency: 'immediate'
  });

  const handleToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>Manage your mobile and desktop push notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="pushEnabled" className="text-base font-medium">Enable Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
            </div>
            <Switch
              id="pushEnabled"
              checked={notifications.pushEnabled}
              onCheckedChange={() => handleToggle('pushEnabled')}
            />
          </div>

          {notifications.pushEnabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Live Streams</Label>
                  <p className="text-xs text-muted-foreground">When creators you follow go live</p>
                </div>
                <Switch
                  checked={notifications.liveStreams}
                  onCheckedChange={() => handleToggle('liveStreams')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">New Followers</Label>
                  <p className="text-xs text-muted-foreground">When someone follows you</p>
                </div>
                <Switch
                  checked={notifications.newFollowers}
                  onCheckedChange={() => handleToggle('newFollowers')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Comments</Label>
                  <p className="text-xs text-muted-foreground">Comments on your content</p>
                </div>
                <Switch
                  checked={notifications.comments}
                  onCheckedChange={() => handleToggle('comments')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Mentions</Label>
                  <p className="text-xs text-muted-foreground">When someone mentions you</p>
                </div>
                <Switch
                  checked={notifications.mentions}
                  onCheckedChange={() => handleToggle('mentions')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Likes</Label>
                  <p className="text-xs text-muted-foreground">Likes on your content</p>
                </div>
                <Switch
                  checked={notifications.likes}
                  onCheckedChange={() => handleToggle('likes')}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>Control what emails you receive from us</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailEnabled" className="text-base font-medium">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <Switch
              id="emailEnabled"
              checked={notifications.emailEnabled}
              onCheckedChange={() => handleToggle('emailEnabled')}
            />
          </div>

          {notifications.emailEnabled && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Email Frequency</Label>
                <Select value={notifications.frequency} onValueChange={(value) => setNotifications(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">System Updates</Label>
                  <p className="text-xs text-muted-foreground">Important account and security updates</p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={() => handleToggle('systemUpdates')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Marketing Emails</Label>
                  <p className="text-xs text-muted-foreground">Product updates and promotional content</p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={() => handleToggle('marketingEmails')}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
