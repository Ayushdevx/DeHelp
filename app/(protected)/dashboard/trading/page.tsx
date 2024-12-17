// src/components/Trading/TradingDashboard.tsx

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Settings, Shield, Bell, UserCheck } from "lucide-react";

interface Trade {
  id: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  volume: number;
  marketCap: number;
  logoUrl: string;
  category: string;
}

const trades: Trade[] = [
  {
    id: '1',
    name: 'Bitcoin',
    currentPrice: 44000,
    priceChange: 2.5,
    volume: 30000000,
    marketCap: 800000000,
    logoUrl: '/bitcoin.jpg',
    category: 'Cryptocurrency',
  },
  {
    id: '2',
    name: 'Ethereum',
    currentPrice: 3100,
    priceChange: 1.7,
    volume: 25000000,
    marketCap: 370000000,
    logoUrl: '/ethereum.jpg',
    category: 'Cryptocurrency',
  },
  {
    id: '3',
    name: 'Cardano',
    currentPrice: 1.50,
    priceChange: 5.6,
    volume: 15000000,
    marketCap: 50000000,
    logoUrl: '/cardano.jpg',
    category: 'Cryptocurrency',
  },
  {
    id: '4',
    name: 'Polkadot',
    currentPrice: 25.00,
    priceChange: -1.2,
    volume: 12000000,
    marketCap: 25000000,
    logoUrl: '/polkadot.jpg',
    category: 'Cryptocurrency',
  },
  {
    id: '5',
    name: 'Ripple',
    currentPrice: 0.75,
    priceChange: 2.1,
    volume: 18000000,
    marketCap: 35000000,
    logoUrl: '/ripple.jpg',
    category: 'Cryptocurrency',
  },
  {
    id: '6',
    name: 'Litecoin',
    currentPrice: 150,
    priceChange: 0.5,
    volume: 10000000,
    marketCap: 10000000,
    logoUrl: '/litecoin.jpg',
    category: 'Cryptocurrency',
  },
];
const TradingDashboard: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-3">
            <DollarSign className="h-6 w-6" />
            <span>Trading Dashboard</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="mr-2 h-4 w-4" /> Manage
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trades.map((trade) => (
            <div key={trade.id} className="border rounded-lg overflow-hidden shadow-lg relative transition-transform transform hover:scale-105">
              <div
                className="h-32 bg-cover bg-center"
                style={{ backgroundImage: `url(${trade.logoUrl})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold">{trade.name}</h2>
                <p className="text-muted-foreground">
                  Current Price: ${trade.currentPrice.toFixed(2)}
                </p>
                <p className={`text-sm ${trade.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  Price Change: {trade.priceChange}%
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Badge variant="secondary">Volume: {trade.volume.toLocaleString()}</Badge>
                  <Badge variant="default">Market Cap: ${trade.marketCap.toLocaleString()}</Badge>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm">
                    <UserCheck className="mr-2 h-4 w-4" /> Trade
                  </Button>
                  <a href="https://dehelptrading.vercel.app/" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-blue-500 to-green-500 text-white animate-pulse transition-transform hover:scale-105" size="sm">
                      View Details
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradingDashboard;