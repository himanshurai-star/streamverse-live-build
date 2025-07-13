
import React from 'react';
import { StreamCard } from './StreamCard';

interface StreamGridProps {
  category: string;
  searchQuery: string;
}

// Mock data for demonstration
const mockStreams = [
  {
    id: '1',
    title: 'Epic Gaming Session - Building the Ultimate City!',
    creator: 'GamerPro123',
    creatorAvatar: '/placeholder-avatar.jpg',
    thumbnail: '/placeholder-thumbnail.jpg',
    viewerCount: 1247,
    category: 'Gaming',
    duration: '2:34:45',
    isLive: true,
    isVerified: true
  },
  {
    id: '2',
    title: 'Digital Art Live - Character Design Process',
    creator: 'ArtistMaria',
    creatorAvatar: '/placeholder-avatar.jpg',
    thumbnail: '/placeholder-thumbnail.jpg',
    viewerCount: 856,
    category: 'Art',
    duration: '1:15:20',
    isLive: true,
    isVerified: false
  },
  {
    id: '3',
    title: 'Cooking Italian Pasta from Scratch',
    creator: 'ChefCarlos',
    creatorAvatar: '/placeholder-avatar.jpg',
    thumbnail: '/placeholder-thumbnail.jpg',
    viewerCount: 2341,
    category: 'Food',
    duration: '0:45:12',
    isLive: true,
    isVerified: true
  },
  {
    id: '4',
    title: 'React Tutorial - Building Modern Apps',
    creator: 'DevTutor',
    creatorAvatar: '/placeholder-avatar.jpg',
    thumbnail: '/placeholder-thumbnail.jpg',
    viewerCount: 623,
    category: 'Technology',
    duration: '3:12:08',
    isLive: true,
    isVerified: false
  },
  {
    id: '5',
    title: 'Morning Yoga Flow - Energize Your Day',
    creator: 'YogaZen',
    creatorAvatar: '/placeholder-avatar.jpg',
    thumbnail: '/placeholder-thumbnail.jpg',
    viewerCount: 189,
    category: 'Fitness',
    duration: '0:32:15',
    isLive: true,
    isVerified: true
  },
  {
    id: '6',
    title: 'Jazz Piano Improvisation Session',
    creator: 'JazzMaestro',
    creatorAvatar: '/placeholder-avatar.jpg',
    thumbnail: '/placeholder-thumbnail.jpg',
    viewerCount: 445,
    category: 'Music',
    duration: '1:28:33',
    isLive: true,
    isVerified: false
  }
];

export const StreamGrid = ({ category, searchQuery }: StreamGridProps) => {
  // Filter streams based on category and search query
  const filteredStreams = mockStreams.filter(stream => {
    const matchesCategory = category === 'All' || stream.category === category;
    const matchesSearch = searchQuery === '' || 
      stream.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stream.creator.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredStreams.map((stream) => (
        <StreamCard key={stream.id} stream={stream} />
      ))}
    </div>
  );
};
