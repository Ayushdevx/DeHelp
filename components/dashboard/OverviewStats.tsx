"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Users, ArrowUpRight, Coins } from "lucide-react";

const stats = [
  {
    title: "Total Balance",
    value: "2.5 ETH",
    change: "+20%",
    icon: Wallet,
  },
  {
    title: "Active Members",
    value: "2,345",
    change: "+15%",
    icon: Users,
  },
  {
    title: "Total Loans",
    value: "12.8 ETH",
    change: "+10%",
    icon: Coins,
  },
  {
    title: "Governance Power",
    value: "8,234",
    change: "+25%",
    icon: ArrowUpRight,
  },
];

export function OverviewStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
              {stat.change}
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}