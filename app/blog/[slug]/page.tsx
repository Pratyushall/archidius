import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await getSupabaseServerClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!post) {
    notFound();
  }

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("category", post.category)
    .eq("published", true)
    .neq("id", post.id)
    .limit(3);

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-medium mb-6 capitalize">
            {post.category}
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <span className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {format(new Date(post.published_at), "MMMM d, yyyy")}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.featured_image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
            <div className="text-foreground leading-relaxed whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-bold mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={relatedPost.featured_image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
