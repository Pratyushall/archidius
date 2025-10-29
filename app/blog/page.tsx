import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { BlogGrid } from "@/components/blog-grid";
import { BlogFilters } from "@/components/blog-filters";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const supabase = await getSupabaseServerClient();

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (params.category && params.category !== "all") {
    query = query.eq("category", params.category);
  }

  const { data: posts } = await query;

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">
            Blog & Insights
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl text-pretty leading-relaxed">
            Thought leadership on sustainable architecture, design innovation,
            and the future of self-sufficient living.
          </p>
        </div>
      </section>

      {/* Filters & Posts */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <BlogFilters currentCategory={params.category} />
          <BlogGrid posts={posts || []} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
