import Link from "next/link";
import { MapPin, Calendar, TrendingUp } from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  location: string;
  year: number;
  hero_image: string;
  area_sqm: number;
  status: string;
}

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/work/${project.slug}`}
          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={project.hero_image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm font-medium capitalize">
                {project.category}
              </span>
            </div>
            {project.status === "in-progress" && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-full text-sm font-medium">
                  <TrendingUp className="w-3 h-3" />
                  In Progress
                </span>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {project.year}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
