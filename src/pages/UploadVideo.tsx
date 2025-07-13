
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, 
  Video,
  Play,
  Pause,
  Volume2,
  Scissors,
  Sparkles
} from 'lucide-react';
import { VideoUploadArea } from '@/components/upload/VideoUploadArea';
import { VideoEditor } from '@/components/upload/VideoEditor';
import { ContentMetadata } from '@/components/upload/ContentMetadata';

const UploadVideo = () => {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState<'public' | 'followers' | 'private'>('public');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');

  const handleVideoSelect = (file: File) => {
    setSelectedVideo(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setVideoPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePublish = () => {
    console.log('Publishing video with:', {
      video: selectedVideo,
      title,
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
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-foreground">Upload Video</h1>
          </div>
          <Button 
            onClick={handlePublish}
            disabled={!selectedVideo}
            className="bg-primary hover:bg-primary/90"
          >
            Publish
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload and Preview Section */}
          <div className="lg:col-span-2 space-y-4">
            {!selectedVideo ? (
              <VideoUploadArea onVideoSelect={handleVideoSelect} />
            ) : (
              <VideoEditor 
                videoUrl={videoPreview}
                onVideoUpdate={setVideoPreview}
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
              showTitle={true}
              title={title}
              setTitle={setTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
