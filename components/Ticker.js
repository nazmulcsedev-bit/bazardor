"use client";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { useData } from "./useData";

export default function Ticker() {
  const { data } = useData(getProducts);
  if (!data?.length) return <div className="h-9 bg-green-700" />;
  const row = [...data, ...data];
  return (
    <div className="bg-green-700 text-white text-sm overflow-hidden py-2">
      <div className="marquee gap-8">
        {row.map((p, i) => (
          <span key={i} className="mx-4 whitespace-nowrap">
            {p.emoji} {p.name} {toBn(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}{" "}
            <b className={p.change >= 0 ? "text-green-200" : "text-red-200"}>
              {p.change > 0 ? "▲" : p.change < 0 ? "▼" : "—"} {toBn(Math.abs(p.change))}%
            </b>
          </span>
        ))}
      </div>
    </div>
  );
}
