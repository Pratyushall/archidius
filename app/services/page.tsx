import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Home,
  Building2,
  Map,
  Leaf,
  Box,
  FlaskConical,
  ArrowRight,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Home,
      title: "Residential Design",
      description:
        "Custom homes that blend luxury with sustainability. From compact urban dwellings to expansive estates, we create living spaces that generate their own energy and adapt to your lifestyle.",
      features: [
        "Net-positive energy homes",
        "Smart home integration",
        "Passive climate control",
        "Water recycling systems",
      ],
    },
    {
      icon: Building2,
      title: "Commercial Projects",
      description:
        "Office buildings, retail spaces, and mixed-use developments that reduce operating costs while enhancing occupant wellbeing and productivity.",
      features: [
        "LEED Platinum certification support",
        "Biophilic design elements",
        "Advanced HVAC optimization",
        "Flexible workspace planning",
      ],
    },
    {
      icon: Map,
      title: "Urban Planning",
      description:
        "Master planning for sustainable communities that integrate residential, commercial, and green spaces into cohesive, self-sufficient ecosystems.",
      features: [
        "Mixed-use development planning",
        "Green infrastructure design",
        "Community energy systems",
        "Transit-oriented design",
      ],
    },
    {
      icon: Leaf,
      title: "Sustainability Consulting",
      description:
        "Expert guidance on achieving your environmental goals, from energy audits to full building retrofits and certification support.",
      features: [
        "Energy efficiency audits",
        "Carbon footprint analysis",
        "Green building certification",
        "Retrofit planning",
      ],
    },
    {
      icon: Box,
      title: "Miniature Models",
      description:
        "Precision architectural models that bring designs to life. Perfect for client presentations, exhibitions, and design refinement.",
      features: [
        "Scale models (1:50 to 1:200)",
        "3D-printed components",
        "Detailed interior modeling",
        "Exhibition-quality finish",
      ],
    },
    {
      icon: FlaskConical,
      title: "Research & Development",
      description:
        "Collaborative research partnerships exploring cutting-edge sustainable technologies and building methodologies.",
      features: [
        "Material innovation",
        "Energy system optimization",
        "Climate adaptation strategies",
        "Smart building technologies",
      ],
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">
            Our Services
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl text-pretty leading-relaxed">
            Comprehensive architectural solutions that transform visions into
            sustainable, self-sufficient realities.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A collaborative journey from concept to completion
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "We listen, learn, and understand your vision, needs, and constraints.",
              },
              {
                step: "02",
                title: "Design",
                description:
                  "Collaborative design development with sustainability at the core.",
              },
              {
                step: "03",
                title: "Development",
                description:
                  "Detailed documentation, engineering, and permit coordination.",
              },
              {
                step: "04",
                title: "Delivery",
                description:
                  "Construction oversight and post-occupancy support.",
              },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {phase.step}
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-balance">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with sustainable,
            innovative design.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
          >
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
