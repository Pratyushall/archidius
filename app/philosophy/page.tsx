import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Leaf, Target, Zap, Building2, Users, Lightbulb } from "lucide-react";

export default function PhilosophyPage() {
  const principles = [
    {
      icon: Leaf,
      title: "Self-Sufficient Living",
      description:
        "We design buildings as living ecosystems that generate their own energy, manage water sustainably, and create healthy environments for inhabitants.",
      details: [
        "Integrated renewable energy systems (solar, wind, geothermal)",
        "Advanced water recycling and rainwater harvesting",
        "Natural ventilation and passive climate control",
        "On-site food production capabilities where applicable",
      ],
    },
    {
      icon: Target,
      title: "Universal Excellence",
      description:
        "Our designs transcend borders, adapting seamlessly to different cultures, climates, and contexts while maintaining uncompromising quality.",
      details: [
        "Modular, adaptable design systems",
        "Climate-responsive architecture",
        "Culturally sensitive spatial planning",
        "Accessible design for all abilities",
      ],
    },
    {
      icon: Zap,
      title: "Future-Proof Design",
      description:
        "We anticipate tomorrow's challenges today, creating structures that remain relevant, efficient, and beautiful for generations.",
      details: [
        "Flexible spaces that adapt to changing needs",
        "Durable, low-maintenance materials",
        "Smart building systems with upgrade pathways",
        "Circular economy principles in material selection",
      ],
    },
  ];

  const approach = [
    {
      icon: Building2,
      title: "Holistic Integration",
      description:
        "Every system works in harmony—energy, water, materials, and human experience.",
    },
    {
      icon: Users,
      title: "Human-Centered",
      description:
        "Technology serves people, not the other way around. Comfort and wellbeing come first.",
    },
    {
      icon: Lightbulb,
      title: "Continuous Innovation",
      description:
        "We constantly research, test, and refine new approaches to sustainable design.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">
            Our Philosophy
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl text-pretty leading-relaxed">
            Architecture that doesn't just exist in the future—it creates it.
            Our three core principles guide every project we undertake.
          </p>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-24">
            {principles.map((principle, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <principle.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h2 className="font-display text-4xl font-bold mb-6">
                    {principle.title}
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    {principle.description}
                  </p>
                  <ul className="space-y-3">
                    {principle.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt={principle.title}
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Our Approach
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              How we bring our philosophy to life in every project
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {approach.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <blockquote className="max-w-4xl mx-auto">
            <p className="font-display text-3xl md:text-4xl font-bold mb-8 text-balance leading-tight">
              "We don't design buildings. We design futures—sustainable,
              self-sufficient, and universally accessible futures that empower
              every person who inhabits them."
            </p>
            <footer className="text-slate-300">
              <cite className="not-italic">
                — Dr. Sarah Chen, Founder & Lead Architect
              </cite>
            </footer>
          </blockquote>
        </div>
      </section>

      <Footer />
    </main>
  );
}
