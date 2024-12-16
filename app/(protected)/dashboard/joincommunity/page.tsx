import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Users,
  PlusCircle,
  Globe,
  BookOpen,
  Lightbulb,
  Shield,
  Filter,
  SlidersHorizontal,
  Share2,
  Heart,
  MessageCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  tags: string[];
  coverImage?: string;
  avatarUrl?: string;
  isJoined?: boolean;
  likes?: number;
  discussions?: number;
  lastActive?: string;
}

// Enhanced mock data
const mockCommunities: Community[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    description: 'Connecting tech enthusiasts and professionals worldwide',
    memberCount: 1245,
    category: 'Technology',
    tags: ['Coding', 'Innovation', 'Startups'],
    coverImage: '/api/placeholder/800/200',
    avatarUrl: '/api/placeholder/80/80',
    isJoined: false,
    likes: 324,
    discussions: 89,
    lastActive: '2024-12-16T10:30:00'
  },
  {
    id: '2',
    name: 'Green Future Collective',
    description: 'Building sustainable solutions for our planet',
    memberCount: 890,
    category: 'Environment',
    tags: ['Sustainability', 'Climate', 'Conservation'],
    coverImage: '/api/placeholder/800/200',
    avatarUrl: '/api/placeholder/80/80',
    isJoined: true,
    likes: 256,
    discussions: 45,
    lastActive: '2024-12-17T09:15:00'
  },
  // ... other communities remain the same
];

const categoryIcons: { [key: string]: React.ReactNode } = {
  'Technology': <Lightbulb className="h-5 w-5" />,
  'Environment': <Globe className="h-5 w-5" />,
  'Arts & Literature': <BookOpen className="h-5 w-5" />,
  'Business': <Shield className="h-5 w-5" />
};

const ExploreCommunities: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'active'>('popular');
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleJoinCommunity = (communityId: string) => {
    setCommunities(prevCommunities =>
      prevCommunities.map(community =>
        community.id === communityId
          ? { ...community, isJoined: !community.isJoined, memberCount: community.isJoined ? community.memberCount - 1 : community.memberCount + 1 }
          : community
      )
    );
  };

  const handleLikeCommunity = (communityId: string) => {
    setCommunities(prevCommunities =>
      prevCommunities.map(community =>
        community.id === communityId
          ? { ...community, likes: (community.likes || 0) + 1 }
          : community
      )
    );
  };

  const getSortedAndFilteredCommunities = () => {
    let filtered = communities.filter(community =>
      (searchTerm === '' ||
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === null || community.category === selectedCategory)
    );

    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => (b.memberCount || 0) - (a.memberCount || 0));
      case 'recent':
        return filtered.sort((a, b) => (b.lastActive || '').localeCompare(a.lastActive || ''));
      case 'active':
        return filtered.sort((a, b) => (b.discussions || 0) - (a.discussions || 0));
      default:
        return filtered;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-3">
            <Users className="h-6 w-6" />
            <span>Explore Communities</span>
          </CardTitle>
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search communities..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('popular')}>
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('recent')}>
                  Recently Active
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('active')}>
                  Most Active
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-4">
            <TabsTrigger
              value="all"
              onClick={() => setSelectedCategory(null)}
            >
              All Communities
            </TabsTrigger>
            {Array.from(new Set(communities.map(c => c.category))).map(category => (
              <TabsTrigger
                key={category}
                value={category.toLowerCase().replace(' ', '-')}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-2"
              >
                {categoryIcons[category]}
                <span>{category}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 gap-4' : 'grid-cols-1 gap-2'}`}>
              {getSortedAndFilteredCommunities().map(community => (
                <div
                  key={community.id}
                  className={`border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all ${
                    viewMode === 'list' ? 'flex items-center p-4' : ''
                  }`}
                >
                  {viewMode === 'grid' && (
                    <div
                      className="h-24 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${community.coverImage})` }}
                    >
                      <div className="absolute inset-0 bg-black/30" />
                      <Avatar className="absolute bottom-2 left-4 border-4 border-white">
                        <AvatarImage src={community.avatarUrl} alt={community.name} />
                        <AvatarFallback>{community.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                  )}

                  <div className={viewMode === 'list' ? 'flex-1 ml-4' : 'p-4 pt-12'}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{community.name}</h3>
                        <p className="text-sm text-muted-foreground">{community.description}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{community.memberCount} Members</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Active {formatDate(community.lastActive || '')}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        {community.tags.map(tag => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleLikeCommunity(community.id)}
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{community.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>{community.discussions}</span>
                        </Button>
                        <Button
                          size="sm"
                          variant={community.isJoined ? "outline" : "default"}
                          onClick={() => handleJoinCommunity(community.id)}
                          className={community.isJoined ? "" : "bg-gradient-to-r from-primary-start via-primary-mid to-primary-end hover:opacity-90"}
                        >
                          <PlusCircle className="mr-2 h-4 w-4" />
                          {community.isJoined ? 'Leave' : 'Join'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {getSortedAndFilteredCommunities().length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No communities found matching your search
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExploreCommunities;