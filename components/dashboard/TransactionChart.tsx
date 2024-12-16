"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 2.4 },
  { name: 'Feb', value: 3.1 },
  { name: 'Mar', value: 2.8 },
  { name: 'Apr', value: 3.5 },
  { name: 'May', value: 4.2 },
  { name: 'Jun', value: 3.9 },
];

export function TransactionChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Transaction Volume (ETH)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}