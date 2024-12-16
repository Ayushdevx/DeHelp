"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    PlusCircle, 
    Globe, 
    ArrowRight,
    Sparkles,
    Users2,
    Trophy,
    Activity
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

type CommunityMode = 'create' | 'join';
type CommunitySize = 'small' | 'medium' | 'large';

interface CommunityStats {
    members: number;
    active: number;
    trending: boolean;
}

const ChooseCommunity: React.FC = () => {
    const [selectedMode, setSelectedMode] = useState<CommunityMode | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const communityOptions = [
        {
            mode: 'join' as CommunityMode,
            title: 'Join Community',
            description: 'Discover and become part of exciting communities. Connect with like-minded people and engage in meaningful discussions.',
            icon: Globe,
            gradient: 'from-blue-500 to-purple-500',
            buttonText: 'Explore Communities',
            stats: {
                members: 15000,
                active: 8500,
                trending: true
            },
            features: ['Browse Popular Communities', 'Quick Join Process', 'Community Recommendations']
        },
        {
            mode: 'create' as CommunityMode,
            title: 'Create Community',
            description: 'Build and nurture your own unique community. Set your rules, customize the experience, and watch your community grow.',
            icon: PlusCircle,
            gradient: 'from-green-500 to-teal-500',
            buttonText: 'Start a Community',
            stats: {
                members: 0,
                active: 0,
                trending: false
            },
            features: ['Custom Branding', 'Moderation Tools', 'Analytics Dashboard']
        }
    ];

    const handleModeSelection = async (mode: CommunityMode) => {
        setIsLoading(true);
        setSelectedMode(mode);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsLoading(false);
        setShowSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    const formatNumber = (num: number): string => {
        return num > 999 ? `${(num/1000).toFixed(1)}k` : num.toString();
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-background">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h1 className="text-4xl font-bold mb-2">Choose Your Path</h1>
                <p className="text-gray-600">Start your community journey</p>
            </motion.div>

            {showSuccess && (
                <Alert className="mb-6 w-full max-w-4xl bg-green-50">
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription>
                        Successfully selected {selectedMode} mode! Redirecting...
                    </AlertDescription>
                </Alert>
            )}

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl"
            >
                <AnimatePresence>
                    {communityOptions.map((option) => (
                        <motion.div
                            key={option.mode}
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 opacity-5">
                                <option.icon 
                                    className="w-full h-full"
                                    strokeWidth={1} 
                                />
                            </div>
                            
                            <Card className="h-full border-2 hover:border-primary/50 transition-colors">
                                <CardHeader className="relative z-10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-full bg-gradient-to-br ${option.gradient} text-white`}>
                                            <option.icon className="w-6 h-6" />
                                        </div>
                                        {option.stats.trending && (
                                            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                                                <Activity className="w-3 h-3 mr-1" /> Trending
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${option.gradient}">
                                        {option.title}
                                    </CardTitle>
                                    <CardDescription className="mt-2 text-gray-600">
                                        {option.description}
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="relative z-10 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Users2 className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {formatNumber(option.stats.members)} Members
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Trophy className="w-4 h-4 text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                {formatNumber(option.stats.active)} Active
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {option.features.map((feature, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                <span className="text-sm text-gray-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter>
                                    <Button 
                                        variant="default"
                                        size="lg"
                                        className={`w-full flex items-center justify-center space-x-2 
                                            bg-gradient-to-r ${option.gradient} text-white
                                            hover:opacity-90 transition-opacity`}
                                        onClick={() => handleModeSelection(option.mode)}
                                        disabled={isLoading}
                                    >
                                        {isLoading && selectedMode === option.mode ? (
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                        ) : (
                                            <>
                                                <span>{option.buttonText}</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ChooseCommunity;