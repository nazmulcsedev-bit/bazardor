import Link from "next/link";
import { toBn } from "@/lib/bn";

export function Badge({ v }) {
  const cls = v > 0 ? "text-green-600 bg-green-100" : v < 0 ? "text-red-600 bg-red-100" : "text-gray-500 bg-gray-100";
  const sym = v > 0 ? "▲ " : v < 0 ? "▼ " : "— ";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{sym}{toBn(Math.abs(v))}%</span>;
}

export default function ProductCard({ p }) {
  return (
    <Link href={`/product/${p.id}`} className="card bg-base-100 shadow hover:shadow-lg transition p-4">
      <div className="text-5xl">{p.emoji}</div>
      <h3 className="font-bold text-lg mt-2">{p.name}</h3>
      <p className="text-sm text-gray-500">{p.unit}</p>
      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="font-bold text-red-600">{toBn(p.price)} টাকা</p>
        </div>
        <Badge v={p.change} />
      </div>
    </Link>
  );
}

export function Grid({ items, loading }) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-40 w-full" />)
        : items.map((p) => <ProductCard key={p.id} p={p} />)}
    </div>
  );
}
