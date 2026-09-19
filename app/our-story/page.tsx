import type { Metadata } from "next";
import Link from "next/link";
import OurStory from "@/components/OurStory";

export const metadata: Metadata = {
  title: "Our Story | Tatsuya & Ayumi",
  description: "ふたりの歩み",
};

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f3] text-[#172a3a]">
      <OurStory />

      <div className="flex justify-center px-6 pb-20">
        <Link
          href="/"
          className="text-xs tracking-[0.3em] text-[#6b7f8d] transition hover:text-[#172a3a]"
        >
          ← BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
