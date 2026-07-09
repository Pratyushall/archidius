import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { ProjectGrid } from "@/components/project-grid";
import { ProjectFilters } from "@/components/project-filters";

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const supabase = await getSupabaseServerClient();

  let query = supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false });

  if (params.category && params.category !== "all") {
    query = query.eq("category", params.category);
  }

  const { data: projects } = await query;

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">
            Our Work
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl text-pretty leading-relaxed">
            Explore our portfolio of transformative projects that push the
            boundaries of sustainable architecture and self-sufficient design.
          </p>
        </div>
      </section>

      {/* Filters & Projects */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <ProjectFilters currentCategory={params.category} />
          <ProjectGrid projects={projects || []} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
