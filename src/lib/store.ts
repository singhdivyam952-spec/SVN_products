import { promises as fs } from "fs";
import path from "path";
import { products as seedProducts, type ProductCategory } from "@/data/products";
import { siteConfig } from "@/lib/site";

export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory | string;
  design?: string;
  tagline: string;
  features: string[];
  retailLabel: string;
  retailNote: string;
  wholesaleLabel: string;
  wholesaleNote: string;
  image: string;
  weightCapacity?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type StoreInquiry = {
  id: string;
  name: string;
  business: string;
  phone: string;
  whatsapp?: string;
  city: string;
  quantity?: string;
  message: string;
  interests: string[];
  read: boolean;
  createdAt: string;
};

export type StoreSettings = {
  brand: string;
  company: string;
  tagline: string;
  subtitle: string;
  location: string;
  partnerName: string;
  partnerRole: string;
  email: string;
  whatsapp: string;
  description: string;
  catalogueYear: string;
};

export type Store = {
  products: StoreProduct[];
  inquiries: StoreInquiry[];
  settings: StoreSettings;
};

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

function now() {
  return new Date().toISOString();
}

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

function defaultSettings(): StoreSettings {
  return {
    brand: siteConfig.brand,
    company: siteConfig.company,
    tagline: siteConfig.tagline,
    subtitle: siteConfig.subtitle,
    location: siteConfig.location,
    partnerName: siteConfig.partner.name,
    partnerRole: siteConfig.partner.role,
    email: siteConfig.email,
    whatsapp: siteConfig.whatsapp || "",
    description: siteConfig.description,
    catalogueYear: siteConfig.catalogueYear,
  };
}

function seedStore(): Store {
  const products: StoreProduct[] = seedProducts.map((p, index) => ({
    id: id("prod"),
    slug: p.slug,
    name: p.name,
    category: p.category,
    design: p.design,
    tagline: p.tagline,
    features: p.features,
    retailLabel: p.packing.retailLabel,
    retailNote: p.packing.retailNote,
    wholesaleLabel: p.packing.wholesaleLabel,
    wholesaleNote: p.packing.wholesaleNote,
    image: p.image,
    weightCapacity: p.weightCapacity,
    featured: Boolean(p.featured),
    published: true,
    sortOrder: index,
    createdAt: now(),
    updatedAt: now(),
  }));

  return {
    products,
    inquiries: [],
    settings: defaultSettings(),
  };
}

async function ensureStore(): Promise<Store> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as Store;
  } catch {
    const seeded = seedStore();
    await fs.writeFile(STORE_PATH, JSON.stringify(seeded, null, 2), "utf8");
    return seeded;
  }
}

async function writeStore(store: Store) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function getStore() {
  return ensureStore();
}

export async function updateStore(mutator: (store: Store) => void | Promise<void>) {
  const store = await ensureStore();
  await mutator(store);
  await writeStore(store);
  return store;
}

export async function listProducts(opts?: {
  includeUnpublished?: boolean;
  category?: string;
  featuredOnly?: boolean;
}) {
  const store = await ensureStore();
  let list = [...store.products].sort((a, b) => a.sortOrder - b.sortOrder);
  if (!opts?.includeUnpublished) {
    list = list.filter((p) => p.published);
  }
  if (opts?.category && opts.category !== "all") {
    list = list.filter((p) => p.category === opts.category);
  }
  if (opts?.featuredOnly) {
    list = list.filter((p) => p.featured);
  }
  return list;
}

export async function getProductBySlug(slug: string, includeUnpublished = false) {
  const store = await ensureStore();
  const product = store.products.find((p) => p.slug === slug);
  if (!product) return null;
  if (!includeUnpublished && !product.published) return null;
  return product;
}

export async function getProductById(idValue: string) {
  const store = await ensureStore();
  return store.products.find((p) => p.id === idValue) || null;
}

export async function saveProduct(
  input: Omit<StoreProduct, "id" | "createdAt" | "updatedAt"> & {
    id?: string;
  },
) {
  return updateStore((store) => {
    const stamp = now();
    if (input.id) {
      const idx = store.products.findIndex((p) => p.id === input.id);
      if (idx === -1) throw new Error("Product not found");
      store.products[idx] = {
        ...store.products[idx],
        ...input,
        id: store.products[idx].id,
        createdAt: store.products[idx].createdAt,
        updatedAt: stamp,
      };
    } else {
      store.products.push({
        ...input,
        id: id("prod"),
        createdAt: stamp,
        updatedAt: stamp,
      });
    }
  });
}

export async function deleteProduct(idValue: string) {
  return updateStore((store) => {
    store.products = store.products.filter((p) => p.id !== idValue);
  });
}

export async function listInquiries() {
  const store = await ensureStore();
  return [...store.inquiries].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
  );
}

export async function createInquiry(
  data: Omit<StoreInquiry, "id" | "read" | "createdAt">,
) {
  const inquiry: StoreInquiry = {
    ...data,
    id: id("inq"),
    read: false,
    createdAt: now(),
  };
  await updateStore((store) => {
    store.inquiries.unshift(inquiry);
  });
  return inquiry;
}

export async function markInquiryRead(idValue: string, read = true) {
  return updateStore((store) => {
    const item = store.inquiries.find((i) => i.id === idValue);
    if (item) item.read = read;
  });
}

export async function deleteInquiry(idValue: string) {
  return updateStore((store) => {
    store.inquiries = store.inquiries.filter((i) => i.id !== idValue);
  });
}

export async function getSettings() {
  const store = await ensureStore();
  return store.settings;
}

export async function saveSettings(settings: StoreSettings) {
  return updateStore((store) => {
    store.settings = settings;
  });
}

export function toPublicProduct(p: StoreProduct) {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category as ProductCategory,
    design: p.design,
    tagline: p.tagline,
    features: p.features,
    packing: {
      retailLabel: p.retailLabel,
      retailNote: p.retailNote,
      wholesaleLabel: p.wholesaleLabel,
      wholesaleNote: p.wholesaleNote,
    },
    image: p.image,
    weightCapacity: p.weightCapacity,
    featured: p.featured,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
