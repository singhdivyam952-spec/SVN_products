export type ProductCategory =
  | "1-pin"
  | "multi-pin"
  | "tape-hook"
  | "kesari-heavy"
  | "kitchen";

export type PackingDetails = {
  retailLabel: string;
  retailNote: string;
  wholesaleLabel: string;
  wholesaleNote: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  design?: string;
  tagline: string;
  features: string[];
  packing: PackingDetails;
  image: string;
  weightCapacity?: string;
  featured?: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  "1-pin": "1 Pin Hooks",
  "multi-pin": "Multi-Pin Hooks",
  "tape-hook": "Tape Hooks",
  "kesari-heavy": "Kesari Heavy",
  kitchen: "Kitchen Essentials",
};

const pinPacking: PackingDetails = {
  retailLabel: "12 Pieces Per Card",
  retailNote: "Each card contains 12 pieces.",
  wholesaleLabel: "16 Boxes Wholesaler Pack",
  wholesaleNote:
    "Each box contains 12 cards. A wholesale package has 16 boxes — 192 cards total for wholesalers.",
};

const kesariPacking: PackingDetails = {
  retailLabel: "12 Pieces Per Box",
  retailNote: "Each box contains 12 pieces.",
  wholesaleLabel: "20 Boxes Wholesale Package",
  wholesaleNote: "Wholesale package includes 20 boxes of the above product.",
};

const defaultFeatures = [
  "Strong Grip",
  "Durable Build",
  "Easy to Use",
  "Safe & Reliable",
];

export const products: Product[] = [
  {
    slug: "1-pin-s-design",
    name: "1 Pin",
    category: "1-pin",
    design: "S Design",
    tagline: "Strong • Durable • Space Saver",
    features: defaultFeatures,
    packing: pinPacking,
    image: "/products/1-pin-s-design.png",
    featured: true,
  },
  {
    slug: "1-pin-umbrella",
    name: "1 Pin",
    category: "1-pin",
    design: "Umbrella Design",
    tagline: "Strong • Durable • Space Saver",
    features: defaultFeatures,
    packing: pinPacking,
    image: "/products/1-pin-umbrella.png",
  },
  {
    slug: "1-pin-jalebi",
    name: "1 Pin",
    category: "1-pin",
    design: "Jalebi Design",
    tagline: "Strong • Durable • Space Saver",
    features: defaultFeatures,
    packing: pinPacking,
    image: "/products/1-pin-jalebi.png",
  },
  {
    slug: "1-pin-lotus",
    name: "1 Pin",
    category: "1-pin",
    design: "Lotus Design",
    tagline: "Strong • Durable • Stylish",
    features: defaultFeatures,
    packing: pinPacking,
    image: "/products/1-pin-lotus.png",
    featured: true,
  },
  {
    slug: "1-pin-smiley",
    name: "1 Pin",
    category: "1-pin",
    design: "Smiley Design",
    tagline: "Strong • Durable • Stylish",
    features: defaultFeatures,
    packing: pinPacking,
    image: "/products/1-pin-smiley.png",
  },
  {
    slug: "1-pin-teddy",
    name: "1 Pin",
    category: "1-pin",
    design: "Teddy Design",
    tagline: "Strong • Durable • Stylish",
    features: ["Food Grade Safe", "Easy Grip", "Daily Use", "Multipurpose"],
    packing: pinPacking,
    image: "/products/1-pin-teddy.png",
  },
  {
    slug: "2-pin",
    name: "2 Pin",
    category: "multi-pin",
    tagline: "Strong • Durable • Space Saver",
    features: defaultFeatures,
    packing: pinPacking,
    image: "/products/2-pin.png",
    featured: true,
  },
  {
    slug: "3-pin",
    name: "3 Pin",
    category: "multi-pin",
    tagline: "Strong • Durable • Space Saver",
    features: defaultFeatures,
    packing: {
      ...pinPacking,
      retailNote: "Each card contains 8 pieces.",
    },
    image: "/products/3-pin.png",
  },
  {
    slug: "5-pin",
    name: "5 Pin",
    category: "multi-pin",
    tagline: "Strong • Durable • Space Saver",
    features: defaultFeatures,
    packing: {
      ...pinPacking,
      retailNote: "Each card contains 4 pieces.",
    },
    image: "/products/5-pin.png",
    featured: true,
  },
  {
    slug: "tape-hook",
    name: "Lion Tape Hook",
    category: "tape-hook",
    tagline: "Strong Hold • Easy Install • No Drilling",
    features: [
      "Strongest Hold for Everyday Essentials",
      "No Drilling Required",
      "Easy Install",
      "Adhesive Grip",
    ],
    packing: {
      retailLabel: "6 Pieces Per Pack",
      retailNote: "Retail blister card with 6 tape hooks.",
      wholesaleLabel: "Wholesale Available",
      wholesaleNote: "Contact us for wholesale carton quantities and pricing.",
    },
    image: "/products/tape-hook.png",
    weightCapacity: "Holds up to 3 kg with strong adhesive grip",
    featured: true,
  },
  {
    slug: "kesari-4-pin",
    name: "Kesari 4 Pin",
    category: "kesari-heavy",
    design: "Heavy Wall Hook",
    tagline: "Bigger • Better • Beautiful",
    features: [
      "Premium Quality",
      "Strong & Durable",
      "Easy to Install",
      "Perfect for Every Space",
    ],
    packing: kesariPacking,
    image: "/products/kesari-4-pin.png",
    featured: true,
  },
  {
    slug: "kesari-6-pin",
    name: "Kesari 6 Pin",
    category: "kesari-heavy",
    design: "Heavy Wall Hook",
    tagline: "Bigger • Better • Beautiful",
    features: [
      "Premium Quality",
      "Strong & Durable",
      "Easy to Install",
      "Perfect for Every Space",
    ],
    packing: kesariPacking,
    image: "/products/kesari-6-pin.png",
  },
  {
    slug: "potato-masher",
    name: "Potato Masher",
    category: "kitchen",
    tagline: "Strong • Durable • Rust Resistant",
    features: [
      "Premium Quality",
      "Best Choice",
      "Rust Resistant Steel",
      "Comfortable Grip Handle",
    ],
    packing: {
      retailLabel: "Assorted Colors",
      retailNote: "Available in orange, magenta, and sky blue handles.",
      wholesaleLabel: "Wholesale Available",
      wholesaleNote: "Contact us for carton quantities and dealer pricing.",
    },
    image: "/products/potato-masher.png",
  },
  {
    slug: "vessel-gripper",
    name: "Vessel Gripper",
    category: "kitchen",
    tagline: "Strong • Durable • Safe to Use",
    features: defaultFeatures,
    packing: {
      retailLabel: "Unit Pack",
      retailNote: "Premium stainless steel vessel gripper.",
      wholesaleLabel: "Wholesale Pack",
      wholesaleNote: "Contact us for wholesale carton quantities and pricing.",
    },
    image: "/products/vessel-gripper.png",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category?: ProductCategory | "all") {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
