"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getCategories } from "@/lib/api";
import { bnDate } from "@/lib/bn";
import { useSession, signOut } from "@/lib/auth-client";
import { useData } from "./useData";
import Ticker from "./Ticker";

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { data: cats } = useData(getCategories);
  const link = (href) => `px-3 py-1 rounded-full text-sm whitespace-nowrap ${path === href ? "bg-green-600 text-white" : "hover:bg-green-100"}`;

  const out = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
  };

  return (
    <header className="bg-base-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <Link href="/" className="leading-tight">
          <div className="text-xl font-bold text-green-700">🛒 বাজার দর</div>
          <div className="text-xs text-gray-500" suppressHydrationWarning>{bnDate()}</div>
        </Link>
        <div className="flex items-center gap-2">
          {isPending ? <div className="skeleton h-8 w-24" /> : session ? (
            <>
              <Link href="/profile" className="btn btn-sm btn-ghost gap-2">
                {session.user.image ? <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" /> : "👤"}
                <span className="hidden sm:inline">{session.user.name}</span>
              </Link>
              <button onClick={out} className="btn btn-sm btn-outline btn-error">সাইন আউট</button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-outline btn-success">সাইন ইন</Link>
              <Link href="/signup" className="btn btn-sm btn-success">সাইন আপ</Link>
            </>
          )}
        </div>
        <nav className="w-full flex gap-2 overflow-x-auto pb-1">
          <Link href="/" className={link("/")}>সব</Link>
          {cats?.map((c) => (
            <Link key={c.slug} href={`/category/${c.slug}`} className={link(`/category/${c.slug}`)}>{c.icon} {c.name}</Link>
          ))}
        </nav>
      </div>
      <Ticker />
    </header>
  );
}
