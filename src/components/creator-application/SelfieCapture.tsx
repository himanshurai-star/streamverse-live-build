
import React, { useState, useRef } from 'react';
import { Camera, RotateCcw, Check } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface SelfieCaptureProps {
  formData: any;
  setFormData: (data: any) => void;
}

const SelfieCapture = ({ formData, setFormData }: SelfieCaptureProps) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        
        // Stop camera
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        setIsCapturing(false);

        // Update form data
        setFormData(prev => ({
          ...prev,
          documents: { ...prev.documents, selfiePhoto: imageData }
        }));
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, selfiePhoto: null }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification</CardTitle>
        <CardDescription>Take a selfie to verify your identity matches your ID</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="max-w-md mx-auto">
          {!isCapturing && !capturedImage && (
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <Camera className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="font-medium">Ready to take your selfie?</p>
                <p className="text-sm text-muted-foreground">
                  Make sure you're in good lighting and looking directly at the camera
                </p>
              </div>
              <Button onClick={startCamera}>
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            </div>
          )}

          {isCapturing && (
            <div className="text-center space-y-4">
              <div className="relative w-64 h-64 mx-auto rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-primary rounded-lg pointer-events-none opacity-50" />
              </div>
              <div className="space-y-2">
                <p className="font-medium">Position your face in the circle</p>
                <p className="text-sm text-muted-foreground">
                  Look directly at the camera and ensure good lighting
                </p>
              </div>
              <Button onClick={capturePhoto}>
                <Camera className="w-4 h-4 mr-2" />
                Capture Photo
              </Button>
            </div>
          )}

          {capturedImage && (
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto rounded-lg overflow-hidden">
                <img
                  src={capturedImage}
                  alt="Captured selfie"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Photo captured successfully!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your selfie looks good and is ready for verification
                </p>
              </div>
              <Button variant="outline" onClick={retakePhoto}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Photo
              </Button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Privacy Note:</strong> Your selfie is used only for identity verification and is securely stored and processed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfieCapture;
