export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Register Your SHG",
      description: "Create your group's digital identity on the blockchain"
    },
    {
      number: "02",
      title: "Connect & Verify",
      description: "Complete the verification process and connect with other SHGs"
    },
    {
      number: "03",
      title: "Access DeFi Services",
      description: "Explore and utilize decentralized financial services"
    },
    {
      number: "04",
      title: "Grow Together",
      description: "Participate in the ecosystem and grow your community"
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          How <span className="gradient-text">DeHelp</span> Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="text-6xl font-bold text-primary/10 mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}