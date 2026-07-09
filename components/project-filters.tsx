"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectFiltersProps {
  currentCategory?: string;
}

export function ProjectFilters({
  currentCategory = "all",
}: ProjectFiltersProps) {
  const pathname = usePathname();

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "urban", label: "Urban Development" },
    { value: "research", label: "Research" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {categories.map((category) => {
        const isActive =
          currentCategory === category.value ||
          (!currentCategory && category.value === "all");

        return (
          <Link
            key={category.value}
            href={
              category.value === "all"
                ? pathname
                : `${pathname}?category=${category.value}`
            }
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              isActive
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-muted-foreground hover:bg-slate-100"
            }`}
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
}
