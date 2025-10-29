"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Zap,
  Droplets,
  Wind,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ProjectDialog } from "./project-dialog";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data /*, error*/ } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("year", { ascending: false })
        .limit(3);

      if (data && data.length > 0) {
        setProjects(data);
        return;
      }

      // Fallback seed
      setProjects([
        {
          id: "1",
          title: "Urban Hub",
          location: "Singapore",
          year: 2023,
          category: "Urban Development",
          hero_image: "/futuristic-sustainable-urban-development-with-gree.jpg",
          description:
            "A self-sufficient urban ecosystem integrating residential, commercial, and green spaces.",
          slug: "urban-hub",
          sustainability_metrics: {
            energy_generated_kwh: 100000,
            water_recycled_percent: 85,
            carbon_offset_tons: 40,
          },
          images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        },
        {
          id: "2",
          title: "Compact Catalyst",
          location: "Tokyo, Japan",
          year: 2024,
          category: "Residential",
          hero_image: "/compact-modern-sustainable-apartment-building.jpg",
          description:
            "Innovative compact living that maximizes space efficiency and sustainability.",
          slug: "compact-catalyst",
          sustainability_metrics: {
            energy_generated_kwh: 95000,
            water_recycled_percent: 90,
            carbon_offset_tons: 35,
          },
          images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        },
        {
          id: "3",
          title: "Universal Blueprint",
          location: "Multiple Locations",
          year: 2024,
          category: "Research",
          hero_image: "/modular-sustainable-housing-system-blueprint.jpg",
          description:
            "Revolutionary adaptable housing system for diverse climates and cultures.",
          slug: "universal-blueprint",
          sustainability_metrics: {
            energy_generated_kwh: 100000,
            water_recycled_percent: 80,
            carbon_offset_tons: 50,
          },
          images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
        },
      ]);
    };

    void run();
  }, []);

  if (projects.length === 0) return null;

  const activeProject = projects[activeIndex];
  const metrics = activeProject.sustainability_metrics || {};

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  return (
    <>
      <section className="py-32 bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-6 text-white">
              Featured Projects
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              Transforming visions into reality, one sustainable structure at a
              time
            </p>
          </div>

          <div className="relative mb-16">
            <div className="relative h-[600px] mb-12 perspective-[2000px]">
              <div className="absolute inset-0 flex items-center justify-center">
                {projects.map((project, index) => {
                  const isActive = index === activeIndex;
                  const offset = (index - activeIndex) * 400;
                  const scale = isActive ? 1 : 0.8;
                  const opacity = isActive ? 1 : 0.3;
                  const rotateY = (index - activeIndex) * 25;

                  return (
                    <div
                      key={project.id}
                      className="absolute w-full max-w-3xl transition-all duration-700 ease-out cursor-pointer"
                      style={{
                        transform: `translateX(${offset}px) scale(${scale}) rotateY(${rotateY}deg)`,
                        opacity,
                        zIndex: isActive
                          ? 10
                          : 5 - Math.abs(index - activeIndex),
                        pointerEvents: "auto",
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="block group">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                          <div className="relative h-[500px] overflow-hidden">
                            <img
                              src={project.hero_image || "/placeholder.svg"}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            {isActive && (
                              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 mix-blend-overlay" />
                            )}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center gap-3 mb-4">
                              <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/20">
                                {project.category}
                              </span>
                            </div>
                            <h3 className="font-display text-4xl font-bold text-white mb-3">
                              {project.title}
                            </h3>
                            <p className="text-white/80 text-lg mb-4 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-6 text-white/70 text-sm">
                              <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {project.location}
                              </span>
                              <span className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {project.year}
                              </span>
                            </div>
                          </div>
                          {isActive && (
                            <div className="absolute top-1/2 right-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                <ArrowRight className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-3 px-6 py-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {metrics.energy_generated_kwh
                      ? `${(metrics.energy_generated_kwh / 1000).toFixed(0)}k`
                      : "N/A"}
                  </div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">
                    Energy kWh
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <Droplets className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {metrics.water_recycled_percent
                      ? `${metrics.water_recycled_percent}%`
                      : "N/A"}
                  </div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">
                    Water
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-4 bg-neutral-900 rounded-xl border border-neutral-800">
                <Wind className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {metrics.carbon_offset_tons
                      ? `-${metrics.carbon_offset_tons}`
                      : "N/A"}
                  </div>
                  <div className="text-xs text-neutral-400 uppercase tracking-wider">
                    Carbon Tons
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeIndex
                      ? "w-12 h-3 bg-primary"
                      : "w-3 h-3 bg-neutral-700 hover:bg-neutral-600"
                  }`}
                  aria-label={`View project ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full"
            >
              <Link href="/work" className="flex items-center gap-3">
                Explore All Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {selectedProject && (
        <ProjectDialog
          project={selectedProject}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}
