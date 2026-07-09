-- Insert blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, author, category, featured_image, published, published_at) VALUES
(
  'The Future of Self-Sufficient Architecture',
  'future-self-sufficient-architecture',
  'Exploring how buildings can become independent ecosystems that generate their own energy, manage water, and create healthy living environments.',
  'The future of architecture lies not in buildings that consume resources, but in structures that generate them. Self-sufficient architecture represents a paradigm shift...',
  'Dr. Sarah Chen',
  'sustainability',
  '/placeholder.svg?height=600&width=1200',
  true,
  NOW() - INTERVAL '7 days'
),
(
  'Universal Design Principles for Global Impact',
  'universal-design-principles',
  'How adaptable design systems can address housing challenges across different cultures, climates, and economic contexts.',
  'Universal design is not about creating one-size-fits-all solutions, but rather developing flexible systems that can be adapted to local needs...',
  'Marcus Rodriguez',
  'design',
  '/placeholder.svg?height=600&width=1200',
  true,
  NOW() - INTERVAL '14 days'
),
(
  'Innovation in Miniature: The Power of Architectural Models',
  'innovation-miniature-models',
  'Why physical models remain essential in the digital age and how they enhance client communication and design refinement.',
  'In an era of virtual reality and 3D rendering, the tactile experience of architectural models continues to provide unique value...',
  'Elena Volkov',
  'innovation',
  '/placeholder.svg?height=600&width=1200',
  true,
  NOW() - INTERVAL '21 days'
);
