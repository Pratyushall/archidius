"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  X,
  MapPin,
  Calendar,
  Maximize2,
  TrendingUp,
  Leaf,
  Droplet,
  Zap,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

interface ProjectDialogProps {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    location: string;
    year: number;
    area_sqm?: number;
    status?: string;
    client_name?: string;
    hero_image?: string;
    images?: string[];
    video_url?: string;
    sustainability_metrics?: Record<string, any>;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDialogProps) {
  const [playingVideo, setPlayingVideo] = useState(false);
  const metrics = (project.sustainability_metrics as Record<string, any>) || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[95vh] p-0 gap-0 bg-neutral-950 border-neutral-800 overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/70 transition-all group"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
          {/* Hero section with video/image */}
          <div className="relative h-[65vh] bg-black">
            {project.video_url && !playingVideo ? (
              <div
                className="relative w-full h-full group cursor-pointer"
                onClick={() => setPlayingVideo(true)}
              >
                <img
                  src={project.hero_image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            ) : project.video_url && playingVideo ? (
              <video
                src={project.video_url}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.hero_image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none" />

            {/* Project header info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="inline-block px-4 py-2 bg-primary/90 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 capitalize border border-primary/20">
                {project.category}
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <span className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5" />
                  {project.location}
                </span>
                <span className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5" />
                  {project.year}
                </span>
                {project.area_sqm && (
                  <span className="flex items-center gap-2 text-lg">
                    <Maximize2 className="w-5 h-5" />
                    {project.area_sqm.toLocaleString()} m²
                  </span>
                )}
                {project.status === "in-progress" && (
                  <span className="flex items-center gap-2 px-4 py-2 bg-yellow-500/90 backdrop-blur-sm rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    In Progress
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="bg-gradient-to-b from-neutral-950 to-neutral-900">
            <div className="container mx-auto px-12 md:px-16 py-20">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Description */}
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">
                      Project Overview
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {project.client_name && (
                    <div>
                      <h3 className="font-display text-2xl font-bold mb-3 text-white">
                        Client
                      </h3>
                      <p className="text-lg text-neutral-400">
                        {project.client_name}
                      </p>
                    </div>
                  )}

                  {/* Image gallery - 3 images */}
                  {project.images && project.images.length > 0 && (
                    <div>
                      <h3 className="font-display text-3xl font-bold mb-8 text-white">
                        Gallery
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        {project.images
                          .slice(0, 3)
                          .map((image: string, index: number) => (
                            <div
                              key={index}
                              className={`relative rounded-2xl overflow-hidden group ${
                                index === 0
                                  ? "md:col-span-2 aspect-[21/9]"
                                  : "aspect-[4/3]"
                              }`}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${project.title} - Image ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar - Sustainability metrics */}
                <div>
                  <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 border border-neutral-700 sticky top-8">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 text-white">
                      Sustainability Impact
                    </h3>

                    <div className="space-y-6">
                      {metrics.energy_generated_kwh && (
                        <div className="flex items-start gap-4 p-4 bg-neutral-950/50 rounded-xl border border-neutral-700">
                          <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Zap className="w-7 h-7 text-primary" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-primary">
                              {(
                                metrics.energy_generated_kwh / 1000
                              ).toLocaleString()}
                              k
                            </div>
                            <div className="text-sm text-neutral-400 mt-1">
                              kWh Generated Annually
                            </div>
                          </div>
                        </div>
                      )}

                      {metrics.water_recycled_percent && (
                        <div className="flex items-start gap-4 p-4 bg-neutral-950/50 rounded-xl border border-neutral-700">
                          <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Droplet className="w-7 h-7 text-blue-400" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-blue-400">
                              {metrics.water_recycled_percent}%
                            </div>
                            <div className="text-sm text-neutral-400 mt-1">
                              Water Recycled
                            </div>
                          </div>
                        </div>
                      )}

                      {metrics.carbon_offset_tons && (
                        <div className="flex items-start gap-4 p-4 bg-neutral-950/50 rounded-xl border border-neutral-700">
                          <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-7 h-7 text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-emerald-400">
                              {metrics.carbon_offset_tons.toLocaleString()}
                            </div>
                            <div className="text-sm text-neutral-400 mt-1">
                              Tons CO₂ Offset/Year
                            </div>
                          </div>
                        </div>
                      )}

                      {metrics.green_space_sqm && (
                        <div className="flex items-start gap-4 p-4 bg-neutral-950/50 rounded-xl border border-neutral-700">
                          <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Leaf className="w-7 h-7 text-green-400" />
                          </div>
                          <div>
                            <div className="text-3xl font-bold text-green-400">
                              {metrics.green_space_sqm.toLocaleString()}
                            </div>
                            <div className="text-sm text-neutral-400 mt-1">
                              m² Green Space
                            </div>
                          </div>
                        </div>
                      )}

                      {Object.keys(metrics).length === 0 && (
                        <p className="text-neutral-400 text-sm">
                          Sustainability metrics coming soon.
                        </p>
                      )}
                    </div>

                    <Button
                      asChild
                      className="w-full mt-8 bg-primary hover:bg-primary/90 text-white py-6 text-lg rounded-xl"
                    >
                      <Link href="/contact">Start Your Project</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating bubble button */}
        <div className="absolute bottom-8 right-8 z-50">
          <Button
            asChild
            size="lg"
            className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/50 hover:scale-110 transition-transform duration-300"
          >
            <Link href={`/work/${project.slug}`}>
              <Maximize2 className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
