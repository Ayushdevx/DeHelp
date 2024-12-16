"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Plus, Vote, FileText } from "lucide-react";

const actions = [
  {
    label: "Send Funds",
    icon: Send,
    onClick: () => console.log("Send funds"),
  },
  {
    label: "Create Proposal",
    icon: Plus,
    onClick: () => console.log("Create proposal"),
  },
  {
    label: "Vote",
    icon: Vote,
    onClick: () => console.log("Vote"),
  },
  {
    label: "View Reports",
    icon: FileText,
    onClick: () => console.log("View reports"),
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={action.onClick}
            >
              <action.icon className="h-5 w-5" />
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}