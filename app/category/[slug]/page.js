"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/api";
import { fromBn, toBn } from "@/lib/bn";
import { useData } from "@/components/useData";
import { Grid } from "@/components/ProductCard";

export default function Category() {
  const { slug } = useParams();
  const [sort, setSort] = useState("default");
  const { data, loading } = useData(() => getProducts(slug), [slug]);
  const { data: cats } = useData(getCategories);
  const cat = cats?.find((c) => c.slug === slug);

  const items = [...(data || [])];
  // sort by numeric value (Bengali digits converted), never by string
  const val = (p) => fromBn(String(p.price));
  if (sort === "asc") items.sort((a, b) => val(a) - val(b));
  if (sort === "desc") items.sort((a, b) => val(b) - val(a));

  if (!loading && items.length === 0)
    return (
      <div className="text-center py-20">
        <div className="text-7xl">🔍</div>
        <h1 className="text-3xl font-bold mt-4">৪০৪ — কোনো পণ্য পাওয়া যায়নি</h1>
        <Link href="/" className="btn btn-success mt-6">হোম পেজে ফিরে যান</Link>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">{cat?.icon} {cat?.name || slug} {!loading && <span className="text-base text-gray-500">({toBn(items.length)})</span>}</h1>
        <label className="flex items-center gap-2 text-sm">
          সাজান:
          <select className="select select-bordered select-sm" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>
      <Grid items={items} loading={loading} />
    </div>
  );
}
