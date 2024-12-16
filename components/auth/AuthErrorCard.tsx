"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/AuthCard";

interface AuthErrorCardProps {
  errorMessage?: string;
  onTryAgain?: string;
}

export const AuthErrorCard: React.FC<AuthErrorCardProps> = ({
  errorMessage = "Authentication methods don't match",
  onTryAgain = "/auth/login"
}) => {
  return (
    <AuthCard 
      title="Sign In Mismatch" 
      description="Looks like you're trying to sign in differently from how you originally registered"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-center text-destructive">
          <AlertTriangle className="h-12 w-12 mr-4" />
          <p className="text-lg font-semibold dark:text-white">Login Restricted</p>
        </div>
        
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 p-4 rounded-lg text-red-700 dark:text-red-300">
          <p className="text-sm text-center">
            {errorMessage}
          </p>
          <p className="text-xs text-center mt-2 text-red-500 dark:text-red-400">
            You must use the same method you used when creating your account.
          </p>
        </div>
        
        <div className="space-y-2">
          <Button asChild className="w-full bg-[#8A2BE2] hover:bg-[#7B27CC] dark:bg-[#9D4EDD] dark:hover:bg-[#8A2BE2]">
            <Link href={onTryAgain}>
              Try Different Sign In
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </AuthCard>
  );
};