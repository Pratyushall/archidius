-- Insert featured projects
INSERT INTO projects (title, slug, description, category, location, year, featured, hero_image, images, sustainability_metrics, area_sqm, status) VALUES
(
  'Urban Hub',
  'urban-hub',
  'A self-sufficient urban development integrating residential, commercial, and green spaces with advanced energy systems and water recycling infrastructure.',
  'urban',
  'Singapore',
  2023,
  true,
  '/placeholder.svg?height=800&width=1200',
  ARRAY[
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900'
  ],
  '{"energy_generated_kwh": 2500000, "water_recycled_percent": 85, "carbon_offset_tons": 1200, "green_space_sqm": 15000}'::jsonb,
  45000,
  'completed'
),
(
  'Compact Catalyst',
  'compact-catalyst',
  'An innovative compact living solution that maximizes space efficiency while maintaining luxury and sustainability. Features modular design and smart home integration.',
  'residential',
  'Tokyo, Japan',
  2024,
  true,
  '/placeholder.svg?height=800&width=1200',
  ARRAY[
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900'
  ],
  '{"energy_generated_kwh": 180000, "water_recycled_percent": 75, "carbon_offset_tons": 95, "solar_panels": 120}'::jsonb,
  3500,
  'completed'
),
(
  'Universal Blueprint',
  'universal-blueprint',
  'A revolutionary adaptable housing system designed for diverse climates and cultures. Modular components allow for customization while maintaining core sustainability principles.',
  'research',
  'Multiple Locations',
  2024,
  true,
  '/placeholder.svg?height=800&width=1200',
  ARRAY[
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900'
  ],
  '{"adaptable_climates": 12, "construction_time_days": 45, "cost_reduction_percent": 40, "energy_efficiency_rating": "A+++"}'::jsonb,
  2200,
  'in-progress'
),
(
  'Green Horizon Office Complex',
  'green-horizon-office',
  'A net-positive commercial building that generates more energy than it consumes. Features living walls, rainwater harvesting, and advanced climate control.',
  'commercial',
  'Copenhagen, Denmark',
  2023,
  false,
  '/placeholder.svg?height=800&width=1200',
  ARRAY[
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900',
    '/placeholder.svg?height=600&width=900'
  ],
  '{"energy_generated_kwh": 850000, "water_recycled_percent": 90, "carbon_offset_tons": 450, "living_wall_sqm": 2800}'::jsonb,
  12000,
  'completed'
);
