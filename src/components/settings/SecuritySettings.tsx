
import React, { useState } from 'react';
import { Shield, Key, Smartphone, Download, Trash2 } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Mock blocked users data
  const blockedUsers = [
    { id: 1, username: 'spammer123', avatar: '/placeholder.svg', blockedDate: '2 weeks ago' },
    { id: 2, username: 'trolluser', avatar: '/placeholder.svg', blockedDate: '1 month ago' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Enable 2FA</Label>
              <p className="text-sm text-muted-foreground">Require a code from your phone to sign in</p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <Smartphone className="w-5 h-5" />
                <span className="font-medium">2FA is enabled</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Two-factor authentication is protecting your account. You'll need your phone to sign in.
              </p>
              <Button variant="outline" size="sm">
                View Recovery Codes
              </Button>
            </div>
          )}

          {!twoFactorEnabled && (
            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Recommended:</strong> Enable two-factor authentication to secure your account from unauthorized access.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Blocked Users</CardTitle>
          <CardDescription>Manage users you've blocked</CardDescription>
        </CardHeader>
        <CardContent>
          {blockedUsers.length > 0 ? (
            <div className="space-y-4">
              {blockedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar} alt={user.username} />
                      <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">@{user.username}</p>
                      <p className="text-sm text-muted-foreground">Blocked {user.blockedDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No blocked users</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Download or delete your account data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Download Your Data</p>
                <p className="text-sm text-muted-foreground">Get a copy of all your data</p>
              </div>
            </div>
            <Button variant="outline">
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-destructive rounded-lg">
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-destructive" />
              <div>
                <p className="font-medium text-destructive">Delete Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
            </div>
            <Button variant="destructive">
              Delete
            </Button>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Account deletion is permanent and cannot be undone. You'll have a 30-day grace period to recover your account before permanent deletion.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
