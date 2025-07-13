
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Camera, User, CreditCard, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';

import DocumentUpload from '../components/creator-application/DocumentUpload';
import SelfieCapture from '../components/creator-application/SelfieCapture';
import FinancialInformation from '../components/creator-application/FinancialInformation';
import ContentCategorySelection from '../components/creator-application/ContentCategorySelection';

const CreatorApplication = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      dateOfBirth: '',
      address: '',
      city: '',
      country: '',
      postalCode: ''
    },
    documents: {
      idDocument: null,
      selfiePhoto: null
    },
    financial: {
      bankAccount: '',
      routingNumber: '',
      panNumber: '',
      taxId: ''
    },
    content: {
      categories: [],
      description: '',
      sampleContent: null
    },
    agreements: {
      terms: false,
      privacy: false,
      creator: false
    }
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Document Upload', icon: FileText },
    { id: 3, title: 'Identity Verification', icon: Camera },
    { id: 4, title: 'Financial Information', icon: CreditCard },
    { id: 5, title: 'Content & Review', icon: Upload }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Submit application
    console.log('Submitting application:', formData);
    navigate('/creator/application/submitted');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Please provide your personal details for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                    }))}
                    placeholder="Enter your full legal name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.personalInfo.dateOfBirth}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.personalInfo.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, address: e.target.value }
                  }))}
                  placeholder="Street address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.personalInfo.city}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, city: e.target.value }
                    }))}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country *</Label>
                  <Select value={formData.personalInfo.country} onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, country: value }
                  }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="in">India</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    value={formData.personalInfo.postalCode}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, postalCode: e.target.value }
                    }))}
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return <DocumentUpload formData={formData} setFormData={setFormData} />;

      case 3:
        return <SelfieCapture formData={formData} setFormData={setFormData} />;

      case 4:
        return <FinancialInformation formData={formData} setFormData={setFormData} />;

      case 5:
        return (
          <div className="space-y-6">
            <ContentCategorySelection formData={formData} setFormData={setFormData} />
            
            <Card>
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                <CardDescription>Please read and accept our terms to continue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreements.terms}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      agreements: { ...prev.agreements, terms: checked }
                    }))}
                  />
                  <Label htmlFor="terms">I agree to the Terms and Conditions</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={formData.agreements.privacy}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      agreements: { ...prev.agreements, privacy: checked }
                    }))}
                  />
                  <Label htmlFor="privacy">I agree to the Privacy Policy</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="creator"
                    checked={formData.agreements.creator}
                    onCheckedChange={(checked) => setFormData(prev => ({
                      ...prev,
                      agreements: { ...prev.agreements, creator: checked }
                    }))}
                  />
                  <Label htmlFor="creator">I agree to the Creator Agreement</Label>
                </div>

                <div className="bg-muted p-4 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Review Timeline:</strong> Your application will be reviewed within 3-5 business days. 
                    We'll send you email updates throughout the process.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/settings')} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Button>
            <h1 className="text-3xl font-bold">Creator Application</h1>
            <p className="text-muted-foreground">Complete your application to become a VoltStream creator</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Navigation */}
          <div className="flex justify-between mb-8 overflow-x-auto">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    step.id === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : step.id < currentStep
                        ? 'bg-muted text-muted-foreground'
                        : 'bg-background'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium whitespace-nowrap">{step.title}</span>
                </div>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreements.terms || !formData.agreements.privacy || !formData.agreements.creator}
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorApplication;
