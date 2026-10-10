"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn, signUp } from "@/lib/auth-client";

export default function AuthForm({ mode }) {
  const up = mode === "signup";
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const fail = (m) => {
    setErr(m);
    toast.error(m);
    setBusy(false);
  };
  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const f = new FormData(e.currentTarget);
    const name = f.get("name"), email = f.get("email"), password = f.get("password");

    if (up && !name?.trim()) return fail("নাম লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return fail("সঠিক ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setBusy(true);
    let error;
    try {
      ({ error } = up
        ? await signUp.email({ name, email, password })
        : await signIn.email({ email, password }));
    } catch {
      return fail("সার্ভারে সংযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।");
    }
    if (error) return fail(error.message || "কিছু ভুল হয়েছে");
    if (up) {
      toast.success("রেজিস্ট্রেশন সফল! এবার সাইন ইন করুন");
      router.push("/signin");
    } else {
      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
      router.refresh();
    }
  };
  const social = (provider) =>
    signIn.social({ provider, callbackURL: "/" }).catch(() => toast.error("সোশ্যাল লগইন ব্যর্থ হয়েছে"));

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        {up ? "নতুন অ্যাকাউন্ট খুলুন" : "সাইন ইন করুন"}
      </h1>
      <form onSubmit={submit} className="space-y-3">
        {up && <input name="name" placeholder="নাম" className="input input-bordered w-full" />}
        <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
        <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
        {err && <p className="text-error text-sm">{err}</p>}
        <button disabled={busy} className="btn btn-success w-full">
          {busy ? <span className="loading loading-spinner" /> : up ? "রেজিস্টার" : "লগইন"}
        </button>
      </form>
      <div className="divider text-xs">অথবা</div>
      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => social("google")} className="btn btn-outline">Google</button>
        <button onClick={() => social("github")} className="btn btn-outline">GitHub</button>
      </div>
      <p className="text-sm text-center mt-4">
        {up ? "আগে থেকেই অ্যাকাউন্ট আছে? " : "অ্যাকাউন্ট নেই? "}
        <Link href={up ? "/signin" : "/signup"} className="link link-success">
          {up ? "সাইন ইন" : "সাইন আপ"}
        </Link>
      </p>
    </div>
  );
}