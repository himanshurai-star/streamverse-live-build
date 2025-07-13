
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveStreamControls } from '@/components/creator/LiveStreamControls';
import { LiveStreamOverlays } from '@/components/creator/LiveStreamOverlays';
import { CreatorChatPanel } from '@/components/creator/CreatorChatPanel';

const LiveStreaming = () => {
  const navigate = useNavigate();
  const [isLive, setIsLive] = useState(true);
  const [streamDuration, setStreamDuration] = useState(0);
  const [viewerCount, setViewerCount] = useState(1247);
  const [earnings, setEarnings] = useState(45.67);
  const [showControls, setShowControls] = useState(true);

  // Update stream duration every second
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Simulate viewer count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Auto-hide controls after inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  const handleEndStream = () => {
    setIsLive(false);
    navigate('/creator/dashboard');
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="min-h-screen bg-black relative overflow-hidden"
      onMouseMove={() => setShowControls(true)}
      onTouchStart={() => setShowControls(true)}
    >
      {/* Main Stream Area */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl font-medium mb-2">Live Stream Active</p>
          <p className="text-lg text-gray-400">Creator view - Stream implementation in progress</p>
        </div>
      </div>

      {/* Stream Overlays */}
      <LiveStreamOverlays
        isVisible={showControls}
        streamDuration={formatDuration(streamDuration)}
        viewerCount={viewerCount}
        earnings={earnings}
        isLive={isLive}
      />

      {/* Stream Controls */}
      <LiveStreamControls
        isVisible={showControls}
        onEndStream={handleEndStream}
        onToggleChat={() => {}}
        onToggleCamera={() => {}}
        onToggleMicrophone={() => {}}
      />

      {/* Creator Chat Panel */}
      <CreatorChatPanel
        viewerCount={viewerCount}
        onModerateMessage={() => {}}
        onPinMessage={() => {}}
      />
    </div>
  );
};

export default LiveStreaming;
