"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const activities = [
  {
    type: "Transaction",
    description: "Loan repayment received",
    amount: "0.5 ETH",
    timestamp: "2 hours ago",
  },
  {
    type: "Governance",
    description: "Voted on proposal #123",
    amount: "",
    timestamp: "5 hours ago",
  },
  {
    type: "Member",
    description: "New member joined",
    amount: "",
    timestamp: "1 day ago",
  },
  // Add more activities as needed
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="font-medium">{activity.amount}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {activity.timestamp}
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