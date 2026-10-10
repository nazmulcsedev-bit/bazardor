"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfile() {
  const { data: s, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!isPending && !s) router.replace("/signin");
    if (s) setName(s.user.name);
  }, [isPending, s, router]);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("নাম লিখুন");
    setBusy(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setBusy(false);
    if (error) return toast.error(error.message || "আপডেট ব্যর্থ হয়েছে");
    toast.success("তথ্য আপডেট হয়েছে");
    router.push("/profile");
  };
  return (
    <form onSubmit={submit} className="max-w-md mx-auto card bg-base-100 shadow p-6 space-y-3">
      <h1 className="text-2xl font-bold text-center">তথ্য আপডেট</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="নাম" className="input input-bordered w-full" />
      <button disabled={busy} className="btn btn-success w-full">
        {busy ? <span className="loading loading-spinner" /> : "Update Information"}
      </button>
    </form>
  );
}
