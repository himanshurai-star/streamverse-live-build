
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft } from 'lucide-react';
import { StreamConfigForm } from '@/components/creator/StreamConfigForm';
import { AudienceSettings } from '@/components/creator/AudienceSettings';
import { TechnicalSettings } from '@/components/creator/TechnicalSettings';
import { StreamPreview } from '@/components/creator/StreamPreview';

type SetupStep = 'config' | 'audience' | 'technical' | 'preview';

const GoLiveSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<SetupStep>('config');
  const [streamData, setStreamData] = useState({
    title: '',
    category: '',
    thumbnail: null as File | null,
    tags: [] as string[],
    privacy: 'public',
    chatEnabled: true,
    giftsEnabled: true,
    adsEnabled: false,
    payPerView: false,
    price: 0,
    quality: 'auto'
  });

  const steps = [
    { id: 'config', label: 'Stream Details', number: 1 },
    { id: 'audience', label: 'Audience Settings', number: 2 },
    { id: 'technical', label: 'Technical Setup', number: 3 },
    { id: 'preview', label: 'Preview & Go Live', number: 4 }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as SetupStep);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as SetupStep);
    }
  };

  const handleGoLive = () => {
    navigate('/creator/live');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/creator/dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Set Up Your Live Stream</h1>
              <p className="text-sm text-muted-foreground">
                Configure your stream settings before going live
              </p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>
        
        <div className="px-4 pb-4">
          <Progress value={progress} className="h-1" />
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    currentStep === step.id
                      ? 'bg-primary/10 border border-primary/20'
                      : index < currentStepIndex
                      ? 'bg-muted/50'
                      : 'bg-muted/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : index < currentStepIndex
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < currentStepIndex ? '✓' : step.number}
                  </div>
                  <span className={`font-medium ${
                    currentStep === step.id ? 'text-primary' : ''
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {currentStep === 'config' && (
                <StreamConfigForm
                  data={streamData}
                  onChange={setStreamData}
                />
              )}
              
              {currentStep === 'audience' && (
                <AudienceSettings
                  data={streamData}
                  onChange={setStreamData}
                />
              )}
              
              {currentStep === 'technical' && (
                <TechnicalSettings
                  data={streamData}
                  onChange={setStreamData}
                />
              )}
              
              {currentStep === 'preview' && (
                <StreamPreview
                  data={streamData}
                  onGoLive={handleGoLive}
                />
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>
                
                {currentStep !== 'preview' ? (
                  <Button onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button onClick={handleGoLive} className="bg-primary hover:bg-primary/90">
                    Go Live
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoLiveSetup;
