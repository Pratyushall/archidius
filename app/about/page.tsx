import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Users, Award, Globe, Target } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & Lead Architect",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Visionary architect with 20+ years pioneering sustainable design solutions.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Director of Innovation",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Leading research in self-sufficient building systems and renewable energy integration.",
    },
    {
      name: "Elena Volkov",
      role: "Senior Designer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Award-winning designer specializing in adaptive architecture and miniature modeling.",
    },
    {
      name: "James Okonkwo",
      role: "Sustainability Consultant",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Expert in environmental systems and carbon-neutral construction methodologies.",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "Every project advances our mission to create a sustainable, self-sufficient future for all.",
    },
    {
      icon: Globe,
      title: "Globally Minded",
      description:
        "We design for diverse cultures, climates, and communities across the world.",
    },
    {
      icon: Award,
      title: "Excellence First",
      description:
        "Uncompromising quality and innovation in every detail of our work.",
    },
    {
      icon: Users,
      title: "Collaborative",
      description:
        "We partner closely with clients, communities, and experts to achieve shared visions.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">
            About ArchiDius
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl text-pretty leading-relaxed">
            We're not just architects—we're pioneers of a sustainable future,
            crafting spaces that empower people and regenerate the planet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2015, ArchiDius emerged from a simple yet powerful
                  question: What if buildings could give back more than they
                  take?
                </p>
                <p>
                  Our founder, Dr. Sarah Chen, assembled a team of visionary
                  architects, engineers, and sustainability experts united by a
                  shared belief that architecture should be a force for positive
                  change.
                </p>
                <p>
                  Today, we've completed over 50 projects across 12 countries,
                  each one pushing the boundaries of what's possible in
                  self-sufficient, sustainable design. From compact urban
                  residences to sprawling commercial complexes, our work proves
                  that environmental responsibility and architectural excellence
                  are not just compatible—they're inseparable.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=600&width=800"
                alt="ArchiDius Studio"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The brilliant minds behind ArchiDius
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-6 overflow-hidden rounded-2xl aspect-square">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-display text-xl font-bold mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
