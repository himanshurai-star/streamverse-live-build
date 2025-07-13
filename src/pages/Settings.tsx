
import React, { useState } from 'react';
import { User, Shield, Bell, Crown, HelpCircle, Smartphone, Mail, Lock, Eye, Globe, Users } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';

import CreatorApplicationCard from '../components/settings/CreatorApplicationCard';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import SecuritySettings from '../components/settings/SecuritySettings';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  // Mock user data
  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    emailVerified: true,
    phoneVerified: false,
    isCreator: false,
    applicationStatus: null
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden md:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden md:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="creator" className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                <span className="hidden md:inline">Creator</span>
              </TabsTrigger>
              <TabsTrigger value="support" className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                <span className="hidden md:inline">Support</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue={user.fullName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex gap-2">
                        <Input id="email" defaultValue={user.email} className="flex-1" />
                        <Badge variant={user.emailVerified ? "default" : "destructive"}>
                          {user.emailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <Input id="phone" defaultValue={user.phoneNumber} className="flex-1" />
                      <Badge variant={user.phoneVerified ? "default" : "destructive"}>
                        {user.phoneVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                    {!user.phoneVerified && (
                      <Button variant="outline" size="sm">
                        <Smartphone className="w-4 h-4 mr-2" />
                        Verify Phone
                      </Button>
                    )}
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your account password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Verification</CardTitle>
                  <CardDescription>Verify your email address for account security</CardDescription>
                </CardHeader>
                <CardContent>
                  {!user.emailVerified ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-600">
                        <Mail className="w-5 h-5" />
                        <span>Your email address is not verified</span>
                      </div>
                      <Button>
                        <Mail className="w-4 h-4 mr-2" />
                        Send Verification Email
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <Mail className="w-5 h-5" />
                      <span>Your email address is verified</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <PrivacySettings />
            </TabsContent>

            <TabsContent value="notifications" className="mt-6">
              <NotificationSettings />
            </TabsContent>

            <TabsContent value="creator" className="mt-6">
              <CreatorApplicationCard user={user} />
            </TabsContent>

            <TabsContent value="support" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Help & Support</CardTitle>
                  <CardDescription>Get help with your account and app features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help Center
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Community Guidelines
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Policy
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Management</CardTitle>
                  <CardDescription>Manage your account data and privacy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
