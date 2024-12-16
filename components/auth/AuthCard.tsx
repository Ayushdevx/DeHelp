import React, { ReactNode } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  description: string;
  linkHref?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({ 
  children, 
  title, 
  description,
  linkHref = "/"
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <Card className="bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <div className="flex justify-center">
            <Link href={linkHref} className="flex flex-col items-center space-y-2">
              <Image
                src="/logo.png"
                alt="DeHElp Logo"
                width={64}
                height={64}
                className="h-16 w-auto"
              />
              <span className="brand-text gradient-text text-xl tracking-widest">
                DeHelp
              </span>
            </Link>
          </div>
          <CardDescription className="text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};