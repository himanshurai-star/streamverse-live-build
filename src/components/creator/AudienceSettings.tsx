
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Globe, Users, Lock } from 'lucide-react';

interface AudienceSettingsProps {
  data: any;
  onChange: (data: any) => void;
}

export const AudienceSettings = ({ data, onChange }: AudienceSettingsProps) => {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.privacy}
            onValueChange={(value) => handleChange('privacy', value)}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value="public" id="public" />
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="public" className="font-medium">Public</Label>
                <p className="text-sm text-muted-foreground">
                  Anyone can discover and watch your stream
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value="followers" id="followers" />
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="followers" className="font-medium">Followers Only</Label>
                <p className="text-sm text-muted-foreground">
                  Only your followers can watch
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value="invite" id="invite" />
              <Lock className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="invite" className="font-medium">Invite Only</Label>
                <p className="text-sm text-muted-foreground">
                  Only invited users can join
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Viewer Interaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Chat</Label>
              <p className="text-sm text-muted-foreground">
                Allow viewers to send messages
              </p>
            </div>
            <Switch
              checked={data.chatEnabled}
              onCheckedChange={(checked) => handleChange('chatEnabled', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Emoji Reactions</Label>
              <p className="text-sm text-muted-foreground">
                Allow emoji reactions and hearts
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Screen Recording</Label>
              <p className="text-sm text-muted-foreground">
                Allow viewers to clip highlights
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
