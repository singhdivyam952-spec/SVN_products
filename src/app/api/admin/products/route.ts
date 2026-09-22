import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { isAdminAuthenticated } from "@/lib/auth";
import {
  deleteProduct,
  getProductById,
  listProducts,
  saveProduct,
  slugify,
} from "@/lib/store";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const products = await listProducts({ includeUnpublished: true });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const category = String(form.get("category") || "").trim();
  const design = String(form.get("design") || "").trim();
  const tagline = String(form.get("tagline") || "").trim();
  const featuresRaw = String(form.get("features") || "");
  const retailLabel = String(form.get("retailLabel") || "").trim();
  const retailNote = String(form.get("retailNote") || "").trim();
  const wholesaleLabel = String(form.get("wholesaleLabel") || "").trim();
  const wholesaleNote = String(form.get("wholesaleNote") || "").trim();
  const weightCapacity = String(form.get("weightCapacity") || "").trim();
  const featured =
    form.get("featured") === "on" || form.get("featured") === "true";
  const published =
    form.get("published") === "on" ||
    form.get("published") === "true" ||
    form.get("published") === null ||
    form.get("published") === undefined;
  const id = String(form.get("id") || "").trim() || undefined;
  let slug = String(form.get("slug") || "").trim() || slugify(`${name}-${design}`);
  const existingImage = String(form.get("existingImage") || "").trim();
  const file = form.get("image");

  if (!name || !category || !tagline) {
    return NextResponse.json(
      { error: "Name, category, and tagline are required" },
      { status: 400 },
    );
  }

  let image = existingImage || "/products/cover.png";
  if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const ext = path.extname(file.name || "") || ".png";
    const filename = `${slug}-${Date.now()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(uploadDir, filename), buffer);
    image = `/uploads/${filename}`;
  }

  const features = featuresRaw
    .split(/\n|,/)
    .map((f) => f.trim())
    .filter(Boolean);

  // Ensure unique slug when creating
  if (!id) {
    const all = await listProducts({ includeUnpublished: true });
    let candidate = slug;
    let n = 2;
    while (all.some((p) => p.slug === candidate)) {
      candidate = `${slug}-${n++}`;
    }
    slug = candidate;
  }

  const sortOrder = id
    ? (await getProductById(id))?.sortOrder ?? 0
    : (await listProducts({ includeUnpublished: true })).length;

  await saveProduct({
    id,
    slug,
    name,
    category,
    design: design || undefined,
    tagline,
    features,
    retailLabel: retailLabel || "Packing details",
    retailNote: retailNote || "",
    wholesaleLabel: wholesaleLabel || "Wholesale available",
    wholesaleNote: wholesaleNote || "Contact us for wholesale pricing.",
    image,
    weightCapacity: weightCapacity || undefined,
    featured,
    published: form.get("published") === "false" ? false : Boolean(published),
    sortOrder,
  });

  return NextResponse.json({ ok: true, slug });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }
  await deleteProduct(id);
  return NextResponse.json({ ok: true });
}
