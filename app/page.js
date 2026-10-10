"use client";
import { getProducts } from "@/lib/api";
import { useData } from "@/components/useData";
import { Grid } from "@/components/ProductCard";

export default function Home() {
  const { data, loading, error } = useData(getProducts);
  const all = data || [];
  const risers = [...all].filter((p) => p.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...all].filter((p) => p.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-6 items-center bg-green-50 rounded-2xl p-6 md:p-10">
        <div>
          <p className="text-green-700 text-sm font-semibold">আজকের বাজার দর</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2 leading-tight">নিত্যপ্রয়োজনীয় পণ্যের দাম জানুন সহজেই</h1>
          <p className="mt-3 text-gray-600">চাল, ডাল, সবজি, মাছ ও মাংসের সর্বশেষ দাম ও ওঠানামা এক জায়গায়।</p>
          <a href="#সব-পণ্য" className="btn btn-success mt-5">সব পণ্য দেখুন</a>
        </div>
        <div className="text-center text-8xl md:text-9xl select-none" aria-hidden>🛒🥬🍚</div>
      </section>

      {error && <div className="alert alert-error">ডাটা লোড করা যায়নি: {error.message}</div>}

      <section>
        <h2 className="text-2xl font-bold mb-4 text-green-700">আজ দাম বেড়েছে ▲</h2>
        <Grid items={risers} loading={loading} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-red-600">আজ দাম কমেছে ▼</h2>
        <Grid items={fallers} loading={loading} />
      </section>
      <section id="সব-পণ্য" className="scroll-mt-32">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="text-gray-500 mb-4">সকল পণ্যের আজকের দাম ও পরিবর্তন</p>
        <Grid items={all} loading={loading} />
      </section>
    </div>
  );
}
