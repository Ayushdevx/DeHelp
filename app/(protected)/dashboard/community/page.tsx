"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, CardFooter 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, MessageCircle, Globe, Coins, 
  TrendingUp, Target, Award, Zap, 
  CheckCircle, XCircle, BarChart, Vote,
  PlusCircle, Share2, Filter, Search
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { toast, Toaster } from 'sonner';

// Enhanced Interfaces with More Depth
interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  reputation: number;
  walletAddress: string;
  contributionScore: number;
  skills: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  fundingGoal: number;
  currentFunding: number;
  supporterCount: number;
  status: 'funding' | 'in-progress' | 'completed' | 'failed';
  proposer: User;
  milestones: Milestone[];
  comments: Comment[];
  mediaUrls?: string[];
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  fundingRequired: number;
  isCompleted: boolean;
  completionDate?: Date;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: User;
  votesFor: number;
  votesAgainst: number;
  totalVoters: number;
  status: 'active' | 'passed' | 'rejected';
  endDate: Date;
  category: string;
  requiredQuorum: number;
}

interface Comment {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

interface Contribution {
  id: string;
  user: User;
  project: Project;
  amount: number;
  timestamp: Date;
  rewardTokens: number;
}

// Mock Data Generation Functions
const generateMockUser = (id: string): User => ({
  id,
  username: `User${id}`,
  email: `user${id}@example.com`,
  avatarUrl: `/api/placeholder/80/80?seed=${id}`,
  reputation: Math.floor(Math.random() * 100),
  walletAddress: `0x${Math.random().toString(36).substring(7)}`,
  contributionScore: Math.floor(Math.random() * 100),
  skills: ['Web3', 'React', 'Blockchain', 'Fundraising'],
  socialLinks: {
    twitter: `https://twitter.com/user${id}`,
    github: `https://github.com/user${id}`
  }
});

const generateMockProject = (id: string, proposer: User): Project => ({
  id,
  title: `Community Project ${id}`,
  description: `An innovative project to solve real-world challenges in ${['Technology', 'Environment', 'Education'][Math.floor(Math.random() * 3)]}`,
  category: ['Technology', 'Environment', 'Social Impact'][Math.floor(Math.random() * 3)],
  tags: ['Blockchain', 'Innovation', 'Sustainability'],
  fundingGoal: 100000,
  currentFunding: Math.floor(Math.random() * 50000),
  supporterCount: Math.floor(Math.random() * 500),
  status: 'funding',
  proposer,
  milestones: [
    {
      id: '1',
      title: 'Research Phase',
      description: 'Comprehensive research and feasibility study',
      fundingRequired: 25000,
      isCompleted: false
    },
    {
      id: '2',
      title: 'Prototype Development',
      description: 'Create initial prototype and proof of concept',
      fundingRequired: 50000,
      isCompleted: false
    }
  ],
  comments: [],
  mediaUrls: ['/api/placeholder/400/300']
});

const DecentralizedCommunityPlatform: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  // Initialize Mock Data
  useEffect(() => {
    const mockCurrentUser = generateMockUser('1');
    setCurrentUser(mockCurrentUser);

    const generatedProjects = Array.from({ length: 5 }, (_, i) => 
      generateMockProject(`project-${i+1}`, mockCurrentUser)
    );
    setProjects(generatedProjects);
  }, []);

  // Advanced Project Contribution
  const contributeToProject = useCallback((project: Project, amount: number) => {
    if (!currentUser) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (amount <= 0) {
      toast.error('Contribution amount must be positive');
      return;
    }

    const newContribution: Contribution = {
      id: `contribution-${Date.now()}`,
      user: currentUser,
      project,
      amount,
      timestamp: new Date(),
      rewardTokens: Math.floor(amount / 10) // Basic reward mechanism
    };

    // Update project funding
    const updatedProjects = projects.map(p => 
      p.id === project.id 
        ? { 
            ...p, 
            currentFunding: p.currentFunding + amount,
            supporterCount: p.supporterCount + 1
          } 
        : p
    );

    setContributions(prev => [...prev, newContribution]);
    setProjects(updatedProjects);

    toast.success(`Successfully contributed ${amount} to ${project.title}`);
  }, [currentUser, projects]);

  // Advanced Proposal Creation and Voting
  const createProposal = useCallback((proposalData: Partial<Proposal>) => {
    if (!currentUser) {
      toast.error('Please connect your wallet to create a proposal');
      return;
    }

    const newProposal: Proposal = {
      id: `proposal-${Date.now()}`,
      title: proposalData.title || 'Untitled Proposal',
      description: proposalData.description || '',
      proposer: currentUser,
      votesFor: 0,
      votesAgainst: 0,
      totalVoters: 0,
      status: 'active',
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      category: proposalData.category || 'General',
      requiredQuorum: 50 // 50% participation required
    };

    setProposals(prev => [...prev, newProposal]);
    toast.success('Proposal created successfully');
  }, [currentUser]);

  const voteOnProposal = useCallback((proposalId: string, vote: 'for' | 'against') => {
    if (!currentUser) {
      toast.error('Please connect your wallet to vote');
      return;
    }

    const updatedProposals = proposals.map(proposal => {
      if (proposal.id === proposalId) {
        const totalVoters = proposal.totalVoters + 1;
        return vote === 'for' 
          ? { 
              ...proposal, 
              votesFor: proposal.votesFor + 1,
              totalVoters 
            }
          : { 
              ...proposal, 
              votesAgainst: proposal.votesAgainst + 1,
              totalVoters 
            };
      }
      return proposal;
    });

    setProposals(updatedProposals);
    toast.success('Vote recorded successfully');
  }, [currentUser, proposals]);

  // Render
  return (
    <div className="container mx-auto p-6 space-y-8">
      <Toaster richColors />
      
      {/* Top Section: User Stats and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6" />
                <span>My Profile</span>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentUser && (
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-4">
                  <AvatarImage src={currentUser.avatarUrl} />
                  <AvatarFallback>{currentUser.username.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h3 className="text-xl font-bold">{currentUser.username}</h3>
                  <div className="flex justify-center space-x-2 mt-2">
                    <Badge variant="secondary">
                      <Zap className="mr-1 h-4 w-4" /> Reputation: {currentUser.reputation}
                    </Badge>
                    <Badge variant="outline">
                      <Coins className="mr-1 h-4 w-4" /> Contribution: {currentUser.contributionScore}
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Projects Overview */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className="h-6 w-6" />
                <span>Active Projects</span>
              </div>
              <div className="flex items-center space-x-2">
                <Input 
                  placeholder="Search projects" 
                  className="w-48"
                  icon={<Search className="h-4 w-4" />}
                />
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Project
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projects.map(project => (
              <Card key={project.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex space-x-2 mt-2">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                    <Badge 
                      variant={
                        project.status === 'funding' ? 'secondary' :
                        project.status === 'in-progress' ? 'outline' :
                        project.status === 'completed' ? 'default' : 'destructive'
                      }
                    >
                      {project.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <Progress 
                      value={(project.currentFunding / project.fundingGoal) * 100} 
                      className="h-2" 
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>Raised: ${project.currentFunding.toLocaleString()}</span>
                      <span>Goal: ${project.fundingGoal.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{project.supporterCount} Supporters</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Contribute</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Contribute to {project.title}</DialogTitle>
                          <DialogDescription>
                            Support this project and help make a difference
                          </DialogDescription>
                        </DialogHeader>
                        {/* Contribution form would go here */}
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Governance Section */}
      <Tabs defaultValue="proposals" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="proposals">
            <Vote className="mr-2 h-4 w-4" /> Community Proposals
          </TabsTrigger>
          <TabsTrigger value="discussions">
            <MessageCircle className="mr-2 h-4 w-4" /> Discussions
          </TabsTrigger>
          <TabsTrigger value="leaderboard">
            <Award className="mr-2 h-4 w-4" /> Contribution Leaderboard
          </TabsTrigger>
        </TabsList>
        
        {/* Additional sections for proposals, discussions, etc. */}
      </Tabs>
    </div>
  );
};

export default DecentralizedCommunityPlatform;