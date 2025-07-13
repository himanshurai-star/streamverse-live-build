
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Smile, 
  Gift,
  Heart,
  Crown,
  Shield,
  CheckCircle,
  Pin,
  Flag,
  MoreVertical
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
  type: 'regular' | 'system' | 'highlighted' | 'gift';
  giftInfo?: {
    giftName: string;
    giftIcon: string;
    amount: number;
  };
  isPinned?: boolean;
}

interface EnhancedLiveChatProps {
  streamId: string;
  viewerCount: number;
  onSendGift: (gift: any) => void;
}

export const EnhancedLiveChat = ({ streamId, viewerCount, onSendGift }: EnhancedLiveChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pinnedMessage, setPinnedMessage] = useState<ChatMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Mock messages with enhanced features
  const mockMessages: ChatMessage[] = [
    {
      id: '1',
      username: 'StreamerPro',
      avatar: '/placeholder.svg',
      message: 'Welcome everyone! Thanks for joining my stream! 🎉',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      badges: ['creator'],
      type: 'regular'
    },
    {
      id: '2',
      username: 'SuperFan2023',
      avatar: '/placeholder.svg',
      message: 'This is amazing content! Keep it up! 🔥',
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      badges: ['subscriber', 'verified'],
      type: 'regular'
    },
    {
      id: '3',
      username: 'GiftMaster',
      avatar: '/placeholder.svg',
      message: 'sent a Rainbow Star!',
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      badges: ['subscriber'],
      type: 'gift',
      giftInfo: {
        giftName: 'Rainbow Star',
        giftIcon: '⭐',
        amount: 100
      }
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate real-time messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessages = [
        'Great stream! 🎮',
        'Love this game!',
        'Hello everyone! 👋',
        'Amazing gameplay 🔥',
        'First time watching, loving it!',
        'Can you play my request?',
        'This is so entertaining! 😄'
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
      
      setMessages(prev => [...prev.slice(-49), newMsg]);
    }, Math.random() * 10000 + 5000);

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

  const handlePinMessage = (message: ChatMessage) => {
    setPinnedMessage(message);
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

  const emojis = ['😀', '😂', '❤️', '🔥', '👏', '🎉', '😍', '🤔', '👍', '💯'];

  return (
    <div className="flex flex-col h-full bg-card border border-border rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-foreground">Live Chat</h3>
          <Badge variant="outline" className="text-xs">
            {viewerCount.toLocaleString()} watching
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSendGift({})}
            className="w-8 h-8 text-primary hover:bg-primary/10"
          >
            <Gift className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Pinned Message */}
      {pinnedMessage && (
        <div className="p-3 bg-primary/10 border-b border-border">
          <div className="flex items-start space-x-2">
            <Pin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-sm font-medium text-primary">
                  {pinnedMessage.username}
                </span>
                <span className="text-xs text-muted-foreground">pinned</span>
              </div>
              <p className="text-sm text-foreground">{pinnedMessage.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-2" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex space-x-2 group hover:bg-muted/50 p-2 rounded-md transition-colors ${
                message.type === 'gift' ? 'bg-primary/5 border border-primary/20' : ''
              }`}
            >
              <Avatar className="w-6 h-6 mt-1 flex-shrink-0">
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
                
                {/* Message Content */}
                {message.type === 'gift' && message.giftInfo ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{message.giftInfo.giftIcon}</span>
                    <div>
                      <p className="text-sm text-primary font-medium">
                        {message.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Value: {message.giftInfo.amount} coins
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-foreground break-words">
                    {message.message}
                  </p>
                )}
              </div>

              {/* Message Actions */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-6 h-6">
                      <MoreVertical className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handlePinMessage(message)}>
                      <Pin className="w-4 h-4 mr-2" />
                      Pin Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Flag className="w-4 h-4 mr-2" />
                      Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="p-3 border-t border-border">
          <div className="grid grid-cols-10 gap-1">
            {emojis.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-base"
                onClick={() => {
                  setNewMessage(prev => prev + emoji);
                  setShowEmojiPicker(false);
                }}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Say something nice..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={200}
              className="pr-16"
            />
            
            {/* Emoji Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-8 top-1/2 -translate-y-1/2 w-8 h-8"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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
            Press Enter to send
          </div>
          <div className="text-xs text-muted-foreground">
            {newMessage.length}/200
          </div>
        </div>
      </div>
    </div>
  );
};
