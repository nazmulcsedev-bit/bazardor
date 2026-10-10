"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { getProduct } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { useSession } from "@/lib/auth-client";
import { useData } from "@/components/useData";
import { Badge } from "@/components/ProductCard";

export default function Detail() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { data: p, loading, error } = useData(() => getProduct(slug), [slug]);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("এই পাতা দেখতে সাইন ইন করুন");
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending || !session || loading) return <div className="skeleton h-72 w-full" />;
  if (error || !p?.id)
    return (
      <div className="text-center py-20">
        <div className="text-7xl">🛒</div>
        <h1 className="text-3xl font-bold mt-4">৪০৪ — পণ্যটি পাওয়া যায়নি</h1>
        <Link href="/" className="btn btn-success mt-6">হোম পেজে ফিরে যান</Link>
      </div>
    );

  const stats = [["সর্বনিম্ন দাম", p.min], ["সর্বোচ্চ দাম", p.max], ["গড় দাম", p.avg]];
  return (
    <div className="space-y-6">
      <div className="card bg-base-100 shadow p-6 flex flex-col sm:flex-row gap-5 items-start">
        <div className="text-7xl">{p.emoji}</div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{p.name}</h1>
          {p.description && <p className="text-gray-600 mt-1">{p.description}</p>}
          <div className="flex flex-wrap gap-2 mt-3">
            {p.tags.map((t) => <span key={t} className="badge badge-success badge-outline">{t}</span>)}
            <span className="badge badge-ghost">{p.unit}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">আজকের দাম</p>
          <p className="text-2xl font-bold text-red-600">{toBn(p.price)} টাকা</p>
          <Badge v={p.change} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(([l, v]) => (
          <div key={l} className="card bg-base-100 shadow p-4 text-center">
            <p className="text-sm text-gray-500">{l}</p>
            <p className="text-2xl font-bold">{toBn(v)} টাকা</p>
          </div>
        ))}
      </div>

      <div className="card bg-base-100 shadow p-4">
        <h2 className="text-xl font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
        {p.markets.length === 0 ? <p className="text-gray-500">বাজারভিত্তিক তথ্য নেই।</p> : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead><tr><th>বাজার</th><th className="text-right">দাম ({p.unit})</th></tr></thead>
              <tbody>{p.markets.map((m, i) => (
                <tr key={i}><td>{m.name}</td><td className="text-right font-semibold">{toBn(m.price)} টাকা</td></tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
      <Link href="/" className="btn btn-outline btn-success">← ফিরে যান</Link>
    </div>
  );
}
