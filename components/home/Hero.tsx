"use client";

import { ArrowRight, Shield, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface HeroProps {
  onLearnMoreClick: () => void; // Explicit type for the prop
}

export default function Hero({ onLearnMoreClick }: HeroProps) {
  const router = useRouter();

  return (
    <div className="hero-gradient min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="gradient-text">Empowering Women</span>
          <br />
          Through Blockchain Technology
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600">
          Connecting Self Help Groups to the future of finance through decentralized solutions
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Button
            onClick={() => router.push("/auth/signup")}
            size="lg"
            className="bg-[#8A2BE2] hover:bg-[#7B27CC]"
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
          <Button size="lg" variant="outline" onClick={onLearnMoreClick}>
            Learn More
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Users, title: "10,000+", desc: "SHGs Empowered" },
            { icon: Wallet, title: "$5M+", desc: "Total Value Locked" },
            { icon: Shield, title: "100%", desc: "Secure & Transparent" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="inline-block p-4 rounded-full bg-white/10 mb-4">
                <item.icon className="w-8 h-8 text-[#FF1493]" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
