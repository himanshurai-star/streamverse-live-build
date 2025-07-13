
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Smile, 
  Settings, 
  Users, 
  ChevronDown,
  Crown,
  Shield,
  CheckCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatMessage {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  badges: ('subscriber' | 'moderator' | 'verified' | 'creator')[];
  type: 'regular' | 'system' | 'highlighted';
}

interface LiveChatProps {
  streamId: string;
  viewerCount: number;
}

// Mock chat messages
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    username: 'GamerPro123',
    avatar: '/placeholder.svg',
    message: 'Welcome to my stream everyone! 🎮',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    badges: ['creator'],
    type: 'regular'
  },
  {
    id: '2',
    username: 'ChatModerator',
    avatar: '/placeholder.svg',
    message: 'Remember to follow the chat rules and be respectful!',
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    badges: ['moderator'],
    type: 'system'
  },
  {
    id: '3',
    username: 'SuperFan2023',
    avatar: '/placeholder.svg',
    message: 'This game looks amazing! Been waiting for this stream 😍',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
    badges: ['subscriber', 'verified'],
    type: 'regular'
  },
  {
    id: '4',
    username: 'NewViewer',
    avatar: '/placeholder.svg',
    message: 'Just followed! Love the content',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    badges: [],
    type: 'regular'
  },
  {
    id: '5',
    username: 'PowerUser',
    avatar: '/placeholder.svg',
    message: 'Thanks for the amazing stream! Here\'s a donation 💰',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
    badges: ['subscriber'],
    type: 'highlighted'
  }
];

export const LiveChat = ({ streamId, viewerCount }: LiveChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate new messages arriving
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        'Great stream!',
        'Love this game',
        'Hello everyone!',
        'Amazing gameplay 🔥',
        'New follower here!',
        'This is so cool',
        'Keep it up!'
      ];
      
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        username: `Viewer${Math.floor(Math.random() * 1000)}`,
        avatar: '/placeholder.svg',
        message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
        timestamp: new Date(),
        badges: Math.random() > 0.7 ? ['subscriber'] : [],
        type: 'regular'
      };
      
      setMessages(prev => [...prev.slice(-50), newMsg]); // Keep only last 50 messages
    }, 8000 + Math.random() * 12000); // Random interval between 8-20 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      username: 'You',
      avatar: '/placeholder.svg',
      message: newMessage,
      timestamp: new Date(),
      badges: [],
      type: 'regular'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'creator':
        return <Crown className="w-3 h-3 text-yellow-500" />;
      case 'moderator':
        return <Shield className="w-3 h-3 text-blue-500" />;
      case 'verified':
        return <CheckCircle className="w-3 h-3 text-blue-500" />;
      case 'subscriber':
        return <div className="w-3 h-3 bg-primary rounded-sm" />;
      default:
        return null;
    }
  };

  const getUsernameColor = (badges: string[]) => {
    if (badges.includes('creator')) return 'text-yellow-500';
    if (badges.includes('moderator')) return 'text-blue-500';
    if (badges.includes('subscriber')) return 'text-primary';
    return 'text-muted-foreground';
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground">Live Chat</h3>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="text-sm">{viewerCount.toLocaleString()}</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Font Size</DropdownMenuItem>
            <DropdownMenuItem>Chat Delay</DropdownMenuItem>
            <DropdownMenuItem>Hide Chat</DropdownMenuItem>
            <DropdownMenuItem>Report Issue</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-2" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-2 ${
                message.type === 'system' ? 'opacity-80' : ''
              } ${
                message.type === 'highlighted' ? 'bg-primary/10 p-2 rounded-md' : ''
              }`}
            >
              <Avatar className="w-6 h-6 mt-1">
                <AvatarImage src={message.avatar} alt={message.username} />
                <AvatarFallback className="text-xs">
                  {message.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 mb-1">
                  {/* Badges */}
                  <div className="flex items-center space-x-1">
                    {message.badges.map((badge, index) => (
                      <div key={index} className="flex items-center">
                        {getBadgeIcon(badge)}
                      </div>
                    ))}
                  </div>
                  
                  {/* Username */}
                  <span className={`text-sm font-medium ${getUsernameColor(message.badges)}`}>
                    {message.username}
                  </span>
                  
                  {/* Timestamp */}
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                
                {/* Message */}
                <p className="text-sm text-foreground break-words">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Connection Status */}
      {!isConnected && (
        <div className="px-4 py-2 bg-destructive/10 border-t border-border">
          <p className="text-sm text-destructive">
            Connection lost. Attempting to reconnect...
          </p>
        </div>
      )}

      {/* Chat Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Say something..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={200}
              className="pr-20"
            />
            
            {/* Emote Picker */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-10 top-1/2 -translate-y-1/2 w-8 h-8"
            >
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Send Button */}
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="w-10 h-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Character Count */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-muted-foreground">
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          <div className="text-xs text-muted-foreground">
            {newMessage.length}/200
          </div>
        </div>
      </div>
    </div>
  );
};
