
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Play, Clock } from 'lucide-react';

interface ProfileContentTabsProps {
  user: {
    isCreator: boolean;
  };
}

const ProfileContentTabs = ({ user }: ProfileContentTabsProps) => {
  // Mock content data
  const posts = [
    { id: 1, type: 'photo', thumbnail: '/placeholder.svg', title: 'Gaming Setup' },
    { id: 2, type: 'video', thumbnail: '/placeholder.svg', title: 'Epic Gameplay', duration: '5:32' },
    { id: 3, type: 'photo', thumbnail: '/placeholder.svg', title: 'Behind the Scenes' },
  ];

  const streams = [
    { id: 1, title: 'Late Night Gaming Session', thumbnail: '/placeholder.svg', duration: '2:45:30', views: '1.2K', date: '2 days ago' },
    { id: 2, title: 'Music Production Stream', thumbnail: '/placeholder.svg', duration: '1:30:15', views: '856', date: '1 week ago' },
  ];

  const highlights = [
    { id: 1, title: 'Epic Win Moment', thumbnail: '/placeholder.svg', duration: '0:45', views: '5.2K' },
    { id: 2, title: 'Funny Reaction', thumbnail: '/placeholder.svg', duration: '1:12', views: '3.8K' },
  ];

  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="grid w-full grid-cols-3 md:grid-cols-4">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        {user.isCreator && <TabsTrigger value="streams">Live Streams</TabsTrigger>}
        {user.isCreator && <TabsTrigger value="highlights">Highlights</TabsTrigger>}
      </TabsList>

      <TabsContent value="posts">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {posts.map((post) => (
            <Card key={post.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  {post.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  )}
                  {post.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {post.duration}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium truncate">{post.title}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {user.isCreator && (
        <TabsContent value="streams">
          <div className="space-y-4 mt-6">
            {streams.map((stream) => (
              <Card key={stream.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-48 h-28 flex-shrink-0">
                      <img
                        src={stream.thumbnail}
                        alt={stream.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {stream.duration}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium text-lg">{stream.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{stream.views} views</span>
                        <span>•</span>
                        <span>{stream.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-secondary rounded-full text-xs">Ended</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      )}

      {user.isCreator && (
        <TabsContent value="highlights">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {highlights.map((highlight) => (
              <Card key={highlight.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-video">
                    <img
                      src={highlight.thumbnail}
                      alt={highlight.title}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {highlight.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium truncate">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.views} views</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
};

export default ProfileContentTabs;
