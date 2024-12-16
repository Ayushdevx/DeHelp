import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Shield, Bell, Settings } from "lucide-react";

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  coverImage: string;
  avatarUrl: string;
  isAdmin: boolean;
  category: string;
  joinDate: string;
  lastActive: string;
  pendingInvites: number;
  recentActivity: {
    posts: number;
    comments: number;
    newMembers: number;
  };
}

const myCommunity: Community = {
  id: '1',
  name: 'Tech Innovators',
  description: 'A vibrant community connecting technology enthusiasts, professionals, and innovators worldwide. Share ideas, collaborate on projects, and stay updated with the latest tech trends.',
  memberCount: 1245,
  coverImage: '/community-covers/tech.jpg',
  avatarUrl: '/community-avatars/tech-innovators.png',
  isAdmin: true,
  category: 'Technology',
  joinDate: 'May 15, 2023',
  lastActive: '2 hours ago',
  pendingInvites: 3,
  recentActivity: {
    posts: 12,
    comments: 45,
    newMembers: 6
  }
};

const MyCommunities: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-3">
            <Users className="h-6 w-6" />
            <span>My Community</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="mr-2 h-4 w-4" /> Manage
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <div 
            className="h-32 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${myCommunity.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <Avatar className="absolute bottom-4 left-4 border-4 border-white h-20 w-20">
              <AvatarImage src={myCommunity.avatarUrl} alt={myCommunity.name} />
              <AvatarFallback>{myCommunity.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="p-4 pt-16">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">{myCommunity.name}</h2>
                  {myCommunity.isAdmin && (
                    <Badge variant="default" className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" /> Admin
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{myCommunity.description}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{myCommunity.memberCount} Members</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Joined: {myCommunity.joinDate}
                </p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4 border-t pt-4">
              <div className="text-center">
                <h4 className="text-sm font-semibold text-muted-foreground">Posts</h4>
                <p className="text-lg font-bold">{myCommunity.recentActivity.posts}</p>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-semibold text-muted-foreground">Comments</h4>
                <p className="text-lg font-bold">{myCommunity.recentActivity.comments}</p>
              </div>
              <div className="text-center">
                <h4 className="text-sm font-semibold text-muted-foreground">New Members</h4>
                <p className="text-lg font-bold">{myCommunity.recentActivity.newMembers}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <Badge variant="secondary">
                  Category: {myCommunity.category}
                </Badge>
                {myCommunity.pendingInvites > 0 && (
                  <Badge variant="destructive">
                    {myCommunity.pendingInvites} Pending Invites
                  </Badge>
                )}
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  size="sm"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Discussions
                </Button>
                <Button 
                  className="bg-gradient-to-r from-primary-start via-primary-mid to-primary-end hover:opacity-50 transition-opacity"
                  size="sm"
                >
                  View Community
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyCommunities;