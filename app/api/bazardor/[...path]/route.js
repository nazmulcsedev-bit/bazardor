import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];
const TTL = 5 * 60 * 1000;
const cache = globalThis._bzCache ?? (globalThis._bzCache = new Map());

// data/products.json thakle fallback hishebe use hobe, na thakle problem nei
function loadProducts() {
  try {
    const file = path.join(process.cwd(), "data", "products.json");
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function fallback(parts, url) {
  const products = loadProducts();
  if (!products) return null;
  const [a, id] = parts;
  if (a !== "products") return null;
  if (id) return products.find((p) => String(p.id) === id || p.slug === id);
  const cat = new URL(url).searchParams.get("category");
  return cat ? products.filter((p) => p.category === cat) : products;
}

export async function GET(req, { params }) {
  const key = params.path.join("/") + new URL(req.url).search;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.t < TTL) return Response.json(hit.data);

  for (const b of BASES) {
    try {
      const r = await fetch(`${b}/${key}`, { cache: "no-store" });
      if (r.ok) {
        const data = await r.json();
        cache.set(key, { t: Date.now(), data });
        return Response.json(data);
      }
    } catch {}
  }
  if (hit) return Response.json(hit.data);
  const fb = fallback(params.path, req.url);
  return fb ? Response.json(fb) : Response.json({ error: "API unavailable" }, { status: 502 });
}