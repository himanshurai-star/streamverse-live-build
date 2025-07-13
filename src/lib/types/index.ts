
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  displayName: string;
  bio?: string;
  createdAt: string;
  followerCount: number;
  followingCount: number;
  isVerified: boolean;
}

export interface Stream {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  streamKey: string;
  isLive: boolean;
  viewerCount: number;
  category: string;
  tags: string[];
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  creator: User;
  chatEnabled: boolean;
  recordingEnabled: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  user: User;
  timestamp: string;
  type: 'message' | 'donation' | 'follow' | 'subscribe';
  amount?: number;
}

export interface Notification {
  id: string;
  type: 'follow' | 'donation' | 'subscribe' | 'stream_start';
  message: string;
  read: boolean;
  createdAt: string;
  userId: string;
}

export interface StreamSettings {
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail?: File;
  chatEnabled: boolean;
  recordingEnabled: boolean;
  quality: '720p' | '1080p' | '4k';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface StreamState {
  currentStream: Stream | null;
  streams: Stream[];
  liveStreams: Stream[];
  isLoading: boolean;
  error: string | null;
}

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Stat {
  icon: string;
  number: string;
  label: string;
  description: string;
}

export interface Creator {
  id: number;
  name: string;
  category: string;
  followers: string;
  quote: string;
  avatar: string;
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  rating: number;
  quote: string;
  verified?: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}
