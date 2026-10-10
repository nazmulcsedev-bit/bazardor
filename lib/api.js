// ---------- fetch (server route diye, 60 sec cache) ----------
const memo = new Map();
function get(path) {
  const hit = memo.get(path);
  if (hit && Date.now() - hit.t < 60000) return hit.p;
  const p = fetch("/api/bazardor" + path)
    .then(async (r) => {
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
      return d;
    })
    .catch((e) => {
      memo.delete(path);
      throw e;
    });
  memo.set(path, { t: Date.now(), p });
  return p;
}

const list = (d) =>
  Array.isArray(d) ? d : d?.data || d?.products || d?.categories || d?.items || [];

const UNITS = { kg: "প্রতি কেজি", litre: "প্রতি লিটার", dozen: "প্রতি ডজন", piece: "প্রতি পিস" };

export function normalize(p) {
  const markets = (p.markets || []).map((m) => ({
    name: m.market,
    division: m.division,
    min: m.min,
    max: m.max,
    price: Math.round((m.min + m.max) / 2),
  }));
  const mins = markets.map((m) => m.min);
  const maxs = markets.map((m) => m.max);
  const mids = markets.map((m) => m.price);
  return {
    id: p.id,
    slug: p.slug,
    name: p.nameBn,
    emoji: p.image || p.categoryIcon || "🛒",
    unit: UNITS[p.unit] || p.unit,
    category: p.category,
    tags: [p.categoryNameBn].filter(Boolean),
    description: `${p.categoryNameBn || ""} — সারাদেশের বাজারভিত্তিক গড় দাম`,
    price: p.today,
    yesterday: p.yesterday,
    lastWeek: p.lastWeek,
    lastMonth: p.lastMonth,
    change: p.change?.dir === "flat" ? 0 : Number(p.change?.pct) || 0,
    min: mins.length ? Math.min(...mins) : p.today,
    max: maxs.length ? Math.max(...maxs) : p.today,
    avg: mids.length ? Math.round(mids.reduce((a, b) => a + b, 0) / mids.length) : p.today,
    markets,
  };
}

export const getProducts = async (category) =>
  list(await get("/products" + (category ? `?category=${encodeURIComponent(category)}` : ""))).map(normalize);

export const getProduct = async (id) => {
  const d = await get(`/products/${id}`);
  return normalize(d?.data || d?.product || d);
};
export const getCategories = async () => {
  try {
    const cats = list(await get("/categories")).map((c) => ({
      slug: String(c.slug ?? c.id),
      name: c.nameBn || c.name || c.title || c.slug,
      icon: c.icon || c.categoryIcon || "🛒",
    }));
    if (cats.length) return cats;
  } catch {}
  const seen = new Map();
  for (const p of list(await get("/products"))) {
    if (!seen.has(p.category))
      seen.set(p.category, { slug: p.category, name: p.categoryNameBn || p.category, icon: p.categoryIcon || "🛒" });
  }
  return [...seen.values()];
};