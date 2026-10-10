"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function Profile() {
  const { data: s, isPending } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!isPending && !s) { toast.error("প্রোফাইল দেখতে সাইন ইন করুন"); router.replace("/signin"); }
  }, [isPending, s, router]);
  if (isPending || !s) return <div className="skeleton h-48 max-w-md mx-auto" />;
  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow p-6 text-center">
      {s.user.image ? <img src={s.user.image} alt="" className="w-24 h-24 rounded-full mx-auto" /> : <div className="text-7xl">👤</div>}
      <h1 className="text-2xl font-bold mt-3">{s.user.name}</h1>
      <p className="text-gray-500">{s.user.email}</p>
      <Link href="/profile/update" className="btn btn-success mt-5">তথ্য আপডেট করুন</Link>
    </div>
  );
}
