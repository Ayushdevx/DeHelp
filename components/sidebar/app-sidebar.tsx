"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Wallet,
  Vote,
  MessageSquare,
  ChevronDown,
  User as UserIcon,   // Identity icon
  ArrowRight  // Trading icon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Governance",
    href: "/dashboard/governance",
    icon: Vote,
  },
  {
    title: "Community",
    href: "/dashboard/community",
    icon: MessageSquare,
  },
  {
    title: "Documents",
    href: "/dashboard/documents",
    icon: FileText,
  },
  {
    title: "Decentralized Identity",
    href: "/dashboard/identity",
    icon: UserIcon,
  },
  {
    title: "Trading",
    href: "/dashboard/trading",
    icon: ArrowRight,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  session: Session | null;
}

export function AppSidebar({ session }: AppSidebarProps) {
  const pathname = usePathname();
  
  const profileImage = session?.user?.image || "/profile.png";
  const userName = session?.user?.name || "User";

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "/auth/login" 
    });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {/* Logo Section */}
        <div className="h-20 border-b flex items-center justify-center px-4 group-data-[collapsible=icon]:p-2">
          <div className="relative flex items-center">
            <Image
              src="/logo.png"
              alt="DeHelp Logo"
              width={128}
              height={128}
              style={{ 
                objectFit: 'contain', 
                width: 'auto', 
                height: '40px',
                transition: 'all 200ms',
              }}
              className="
                group-data-[collapsible=icon]:h-8 
                group-data-[collapsible=icon]:w-auto"
            />
            <span className="brand-text gradient-text text-xl tracking-widest ml-4 
              transition-all duration-200 
              group-data-[collapsible=icon]:hidden">
              DeHelp
            </span>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarNavItems.map((item) => (
                <SidebarMenuItem 
                  key={item.href} 
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Image 
                        src={profileImage} 
                        alt="Profile" 
                        width={24} 
                        height={24} 
                        className="mr-2 rounded-full"
                      />
                      {userName}
                      <ChevronDown className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    className="w-[--radix-popper-anchor-width]"
                  >
                    <DropdownMenuItem>
                      <span>Account</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Billing</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}