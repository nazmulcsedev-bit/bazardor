import Link from "next/link";
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <div className="text-7xl">🛒</div>
      <h1 className="text-4xl font-bold mt-4">৪০৪ — পাতাটি পাওয়া যায়নি</h1>
      <p className="mt-2 text-gray-500">আপনি যে পাতাটি খুঁজছেন তা নেই।</p>
      <Link href="/" className="btn btn-success mt-6">হোম পেজে ফিরে যান</Link>
    </div>
  );
}
