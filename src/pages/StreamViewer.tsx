
import React, { useState } from 'react';
import { StreamViewerHeader } from '@/components/stream-viewer/StreamViewerHeader';
import { VideoPlayer } from '@/components/stream-viewer/VideoPlayer';
import { StreamInfo } from '@/components/stream-viewer/StreamInfo';
import { EnhancedLiveChat } from '@/components/stream-viewer/EnhancedLiveChat';
import { ViewerEngagement } from '@/components/stream-viewer/ViewerEngagement';
import { RelatedStreams } from '@/components/stream-viewer/RelatedStreams';
import { useParams } from 'react-router-dom';

const StreamViewer = () => {
  const { streamId } = useParams();
  const [theaterMode, setTheaterMode] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

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
    description: 'Join me as we build the most amazing city in this city builder game! We\'re going for a modern metropolitan vibe with lots of skyscrapers and efficient transport systems. Don\'t forget to hit that subscribe button and turn on notifications for more epic gaming content!',
    tags: ['Gaming', 'City Builder', 'Strategy', 'Live']
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleSendGift = (gift: any) => {
    console.log('Sending gift:', gift);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log('Stream shared!');
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
          <div className={`flex-1 ${theaterMode ? 'lg:w-[70%]' : 'lg:w-[60%]'}`}>
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
          <div className={`${theaterMode ? 'lg:w-[30%]' : 'lg:w-[40%]'} min-w-0 space-y-4`}>
            {/* Enhanced Live Chat */}
            <div className={`${theaterMode ? 'h-[600px]' : 'h-[400px] lg:h-[500px]'}`}>
              <EnhancedLiveChat 
                streamId={streamData.id}
                viewerCount={streamData.viewers}
                onSendGift={handleSendGift}
              />
            </div>
            
            {/* Viewer Engagement - Only show when not in theater mode */}
            {!theaterMode && (
              <ViewerEngagement
                streamId={streamData.id}
                isFollowing={isFollowing}
                onFollow={handleFollow}
                onSendGift={handleSendGift}
                onShare={handleShare}
              />
            )}
            
            {/* Related Streams - Hidden in theater mode */}
            {!theaterMode && (
              <RelatedStreams 
                currentStreamId={streamData.id}
                category={streamData.category}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamViewer;
