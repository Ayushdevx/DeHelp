import { Lightbulb, Shield, Coins, Users } from 'lucide-react';

const features = [
  {
    icon: Lightbulb,
    title: "Smart Contract Integration",
    description: "Automate financial processes with secure and transparent smart contracts"
  },
  {
    icon: Shield,
    title: "Decentralized Security",
    description: "Your assets are protected by advanced blockchain technology"
  },
  {
    icon: Coins,
    title: "DeFi Solutions",
    description: "Access to decentralized financial services and opportunities"
  },
  {
    icon: Users,
    title: "Community Governance",
    description: "Participate in decision-making through our DAO structure"
  }
];

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="gradient-text">Empowering Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="feature-card p-6 rounded-xl">
              <div className="inline-block p-3 rounded-full bg-[#9D4EDD]/10 mb-4">
                <feature.icon className="w-6 h-6 text-[#9D4EDD]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}