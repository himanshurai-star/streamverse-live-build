
import React, { useState } from 'react';
import { Crown, ArrowRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

interface CreatorApplicationCardProps {
  user: {
    isCreator: boolean;
    applicationStatus?: 'pending' | 'approved' | 'rejected' | null;
  };
}

const CreatorApplicationCard = ({ user }: CreatorApplicationCardProps) => {
  const navigate = useNavigate();

  if (user.isCreator) {
    return (
      <Card className="border-primary">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-primary" />
            <CardTitle>Creator Dashboard</CardTitle>
          </div>
          <CardDescription>You are a verified creator on VoltStream</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">45</div>
              <div className="text-sm text-muted-foreground">Total Streams</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">12.5K</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">$1,247</div>
              <div className="text-sm text-muted-foreground">Monthly Earnings</div>
            </div>
          </div>
          <Button onClick={() => navigate('/creator/dashboard')} className="w-full">
            <Crown className="w-4 h-4 mr-2" />
            Open Creator Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (user.applicationStatus === 'pending') {
    return (
      <Card className="border-amber-500">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-500" />
            <CardTitle>Creator Application Pending</CardTitle>
          </div>
          <CardDescription>Your creator application is currently under review</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Application Progress</span>
              <span>3/7 Steps</span>
            </div>
            <Progress value={42} className="w-full" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Application Received</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Document Review</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Identity Verification</span>
            </div>
            <div className="flex items-center gap-2 text-amber-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Financial Verification</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-4 h-4 border-2 border-muted rounded-full" />
              <span className="text-sm">Content Review</span>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Estimated completion:</strong> 2-3 business days
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              We'll notify you via email once your application is processed.
            </p>
          </div>

          <Button variant="outline" onClick={() => navigate('/creator/application/status')}>
            View Application Status
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (user.applicationStatus === 'rejected') {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <XCircle className="w-6 h-6 text-destructive" />
            <CardTitle>Creator Application Rejected</CardTitle>
          </div>
          <CardDescription>Your creator application was not approved</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-destructive/10 p-4 rounded-lg">
            <p className="text-sm text-destructive-foreground">
              <strong>Reason:</strong> Incomplete documentation
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Your ID verification documents were not clear enough for verification. Please resubmit with clearer images.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Next Steps:</p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Retake ID photos with better lighting</li>
              <li>• Ensure all text is clearly readable</li>
              <li>• Submit high-resolution images</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => navigate('/creator/application/reapply')}>
              Reapply Now
            </Button>
            <Button variant="outline">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Crown className="w-6 h-6 text-primary" />
          <CardTitle>Become a Creator</CardTitle>
        </div>
        <CardDescription>Start earning money by streaming and creating content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Creator Benefits:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Monetize your streams with virtual gifts</li>
            <li>• Access to advanced analytics and insights</li>
            <li>• Priority support and creator tools</li>
            <li>• Revenue sharing from advertisements</li>
            <li>• Custom stream overlays and effects</li>
          </ul>
        </div>

        <div className="bg-background p-4 rounded-lg border">
          <h4 className="font-medium mb-2">Requirements:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Must be 18+ years old</li>
            <li>• Valid government-issued ID</li>
            <li>• Bank account for payments</li>
            <li>• Consistent content creation</li>
          </ul>
        </div>

        <Button onClick={() => navigate('/creator/application')} className="w-full">
          <Crown className="w-4 h-4 mr-2" />
          Apply to Become a Creator
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Application review typically takes 3-5 business days
        </p>
      </CardContent>
    </Card>
  );
};

export default CreatorApplicationCard;
