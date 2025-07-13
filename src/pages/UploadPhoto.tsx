
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Camera, 
  Crop,
  Sliders,
  Type,
  Globe,
  Users,
  Lock,
  MapPin
} from 'lucide-react';
import { PhotoUploadArea } from '@/components/upload/PhotoUploadArea';
import { ImageEditor } from '@/components/upload/ImageEditor';
import { ContentMetadata } from '@/components/upload/ContentMetadata';

const UploadPhoto = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<'public' | 'followers' | 'private'>('public');
  const [location, setLocation] = useState('');

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    // Implementation for publishing photo
    console.log('Publishing photo with:', {
      image: selectedImage,
      caption,
      hashtags,
      privacy,
      location
    });
    navigate('/creator/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-foreground">Upload Photo</h1>
          </div>
          <Button 
            onClick={handlePublish}
            disabled={!selectedImage}
            className="bg-primary hover:bg-primary/90"
          >
            Publish
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload and Preview Section */}
          <div className="space-y-4">
            {!selectedImage ? (
              <PhotoUploadArea onImageSelect={handleImageSelect} />
            ) : (
              <ImageEditor 
                imageUrl={imagePreview}
                onImageUpdate={setImagePreview}
              />
            )}
          </div>

          {/* Content Details Section */}
          <div className="space-y-4">
            <ContentMetadata
              caption={caption}
              setCaption={setCaption}
              hashtags={hashtags}
              setHashtags={setHashtags}
              privacy={privacy}
              setPrivacy={setPrivacy}
              location={location}
              setLocation={setLocation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
