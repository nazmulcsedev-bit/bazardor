import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "বাজার দর — BazarDor", description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।" };

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-theme="light">
      <body className="min-h-screen flex flex-col bg-base-200">
        <Navbar />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
