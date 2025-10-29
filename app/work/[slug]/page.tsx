import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import {
  MapPin,
  Calendar,
  Maximize2,
  TrendingUp,
  Leaf,
  Droplet,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await getSupabaseServerClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  const metrics = (project.sustainability_metrics as Record<string, any>) || {};

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Image */}
      <section className="pt-20">
        <div className="relative h-[60vh] md:h-[70vh]">
          <img
            src={project.hero_image || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 pb-12">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-medium mb-4 capitalize">
                {project.category}
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {project.location}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {project.year}
                </span>
                {project.area_sqm && (
                  <span className="flex items-center gap-2">
                    <Maximize2 className="w-5 h-5" />
                    {project.area_sqm.toLocaleString()} m²
                  </span>
                )}
                {project.status === "in-progress" && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-yellow-500 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    In Progress
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl font-bold mb-6">
                Project Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {project.description}
              </p>

              {project.client_name && (
                <div className="mb-8">
                  <h3 className="font-display text-xl font-bold mb-2">
                    Client
                  </h3>
                  <p className="text-muted-foreground">{project.client_name}</p>
                </div>
              )}

              {/* Image Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-display text-2xl font-bold mb-6">
                    Gallery
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Sustainability Metrics */}
            <div>
              <div className="bg-slate-50 rounded-2xl p-8 sticky top-24">
                <h3 className="font-display text-2xl font-bold mb-6">
                  Sustainability Impact
                </h3>

                <div className="space-y-6">
                  {metrics.energy_generated_kwh && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {(
                            metrics.energy_generated_kwh / 1000
                          ).toLocaleString()}
                          k
                        </div>
                        <div className="text-sm text-muted-foreground">
                          kWh Generated Annually
                        </div>
                      </div>
                    </div>
                  )}

                  {metrics.water_recycled_percent && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Droplet className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {metrics.water_recycled_percent}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Water Recycled
                        </div>
                      </div>
                    </div>
                  )}

                  {metrics.carbon_offset_tons && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {metrics.carbon_offset_tons.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Tons CO₂ Offset/Year
                        </div>
                      </div>
                    </div>
                  )}

                  {metrics.green_space_sqm && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {metrics.green_space_sqm.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          m² Green Space
                        </div>
                      </div>
                    </div>
                  )}

                  {Object.keys(metrics).length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      Sustainability metrics coming soon.
                    </p>
                  )}
                </div>

                <Button
                  asChild
                  className="w-full mt-8 bg-primary hover:bg-primary/90"
                >
                  <Link href="/contact">Start Your Project</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
