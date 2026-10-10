export const dynamic = "force-dynamic";

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];
const TTL = 5 * 60 * 1000; // 5 minute cache
const cache = globalThis._bzCache ?? (globalThis._bzCache = new Map());

export async function GET(req, { params }) {
  const key = params.path.join("/") + new URL(req.url).search;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.t < TTL) return Response.json(hit.data);

  const errs = [];
  for (const b of BASES) {
    try {
      const r = await fetch(`${b}/${key}`, { cache: "no-store" });
      if (r.ok) {
        const data = await r.json();
        cache.set(key, { t: Date.now(), data });
        return Response.json(data);
      }
      errs.push(`${new URL(b).host} HTTP ${r.status}`);
    } catch (e) {
      errs.push(`${new URL(b).host} ${e.cause?.code || e.message}`);
    }
  }
  // rate limit hole purono cache thakle seta-i dao
  if (hit) return Response.json(hit.data);
  return Response.json({ error: errs.join(" | ") }, { status: 502 });
}