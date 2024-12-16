import { CheckCircle } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    "Access to Decentralized Finance",
    "Transparent Fund Management",
    "Secure Digital Identity",
    "Community-Driven Governance",
    "Financial Inclusion",
    "Cross-SHG Collaboration"
  ];

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Benefits for <span className="gradient-text">SHGs</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center space-x-3 text-card-foreground">
              <CheckCircle className="w-6 h-6 text-[#FF1493]" />
              <span className="text-lg">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}