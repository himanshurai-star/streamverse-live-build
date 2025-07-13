
import React, { useState } from 'react';
import { StreamViewerHeader } from '@/components/stream-viewer/StreamViewerHeader';
import { VideoPlayer } from '@/components/stream-viewer/VideoPlayer';
import { StreamInfo } from '@/components/stream-viewer/StreamInfo';
import { useParams } from 'react-router-dom';

const StreamViewer = () => {
  const { streamId } = useParams();
  const [theaterMode, setTheaterMode] = useState(false);

  // Mock stream data - in real app, this would come from API
  const streamData = {
    id: streamId || '1',
    title: 'Epic Gaming Session - Building the Ultimate City!',
    creator: {
      name: 'GamerPro123',
      avatar: '/placeholder.svg',
      subscribers: '125K',
      verified: true,
      online: true
    },
    category: 'Gaming',
    viewers: 1247,
    startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isLive: true,
    description: 'Join me as we build the most amazing city in this city builder game! We\'re going for a modern metropolitan vibe with lots of skyscrapers and efficient transport systems.',
    tags: ['Gaming', 'City Builder', 'Strategy', 'Live']
  };

  return (
    <div className="min-h-screen bg-background">
      <StreamViewerHeader 
        streamTitle={streamData.title}
        theaterMode={theaterMode}
        onTheaterModeToggle={() => setTheaterMode(!theaterMode)}
      />
      
      <div className="pt-16">
        <div className={`flex flex-col lg:flex-row gap-4 p-4 transition-all duration-300 ${
          theaterMode ? 'lg:gap-2' : 'lg:gap-6'
        }`}>
          {/* Main Content */}
          <div className={`flex-1 ${theaterMode ? 'lg:w-[85%]' : 'lg:w-[70%]'}`}>
            <VideoPlayer 
              streamData={streamData}
              theaterMode={theaterMode}
            />
            
            {!theaterMode && (
              <div className="mt-4">
                <StreamInfo streamData={streamData} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className={`${theaterMode ? 'lg:w-[15%]' : 'lg:w-[30%]'} min-w-0`}>
            {/* Chat will go here */}
            <div className="bg-card border border-border rounded-lg p-4 h-[400px] lg:h-[600px]">
              <h3 className="font-semibold text-foreground mb-4">Live Chat</h3>
              <div className="text-muted-foreground text-sm">
                Chat will be implemented in the next phase
              </div>
            </div>
            
            {/* Related Streams */}
            {!theaterMode && (
              <div className="mt-4 bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4">Related Streams</h3>
                <div className="text-muted-foreground text-sm">
                  Related streams will be implemented in the next phase
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamViewer;
