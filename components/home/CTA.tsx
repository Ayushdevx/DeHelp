"use client";

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="py-20 px-4 hero-gradient">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Join the <span className="gradient-text">Revolution</span>
        </h2>
        <p className="text-xl mb-8 text-gray-600">
          Be part of India&apos;s largest blockchain-powered SHG network
        </p>
        <Button size="lg" className="bg-[#8A2BE2] hover:bg-[#7B27CC]">
          Get Started Now <ArrowRight className="ml-2" />
        </Button>
      </div>
    </section>
  );
}