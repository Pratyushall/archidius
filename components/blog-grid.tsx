import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  featured_image: string;
  published_at: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-muted-foreground">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        >
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={post.featured_image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm font-medium capitalize">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDistanceToNow(new Date(post.published_at), {
                  addSuffix: true,
                })}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
              Read More
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
