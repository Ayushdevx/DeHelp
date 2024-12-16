"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, MessageSquare, Vote } from "lucide-react";

const notifications = [
  {
    icon: Bell,
    title: "New Proposal",
    description: "A new governance proposal needs your attention",
    time: "10m ago",
  },
  {
    icon: MessageSquare,
    title: "Message",
    description: "You received a new message from the community",
    time: "1h ago",
  },
  {
    icon: Vote,
    title: "Voting Period",
    description: "Voting period for Proposal #123 ends in 2 days",
    time: "2h ago",
  },
];

export function NotificationsCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {notifications.map((notification, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b pb-4 last:border-0"
              >
                <div className="rounded-full bg-primary/10 p-2">
                  <notification.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}