
import React, { useState } from 'react';
import { Camera, Save, X } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface ProfileEditModalProps {
  user: {
    username: string;
    displayName: string;
    bio: string;
    avatar: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileEditModal = ({ user, open, onOpenChange }: ProfileEditModalProps) => {
  const [formData, setFormData] = useState({
    displayName: user.displayName,
    username: user.username,
    bio: user.bio,
    profileVisibility: 'public'
  });

  const handleSave = () => {
    // Save profile changes
    console.log('Saving profile changes:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt={user.displayName} />
                <AvatarFallback className="text-2xl">
                  {user.displayName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-center space-y-2">
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive">
                Remove Photo
              </Button>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={formData.displayName}
                onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                maxLength={50}
              />
              <p className="text-xs text-muted-foreground">
                {formData.displayName.length}/50 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                placeholder="@username"
              />
              <p className="text-xs text-muted-foreground">
                Username can only contain letters, numbers, and underscores
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                maxLength={160}
                rows={3}
                placeholder="Tell people about yourself..."
              />
              <p className="text-xs text-muted-foreground">
                {formData.bio.length}/160 characters
              </p>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Privacy Settings</h3>
            
            <div className="space-y-2">
              <Label htmlFor="visibility">Profile Visibility</Label>
              <Select value={formData.profileVisibility} onValueChange={(value) => setFormData(prev => ({ ...prev, profileVisibility: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                  <SelectItem value="followers">Followers Only - Only followers can see your content</SelectItem>
                  <SelectItem value="private">Private - Only you can see your content</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
