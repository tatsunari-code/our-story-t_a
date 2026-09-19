import type { Metadata } from "next";
import Link from "next/link";
import OurStory from "@/components/OurStory";
import PageBackground from "@/components/PageBackground";

export const metadata: Metadata = {
  title: "Our Story | Tatsuya & Ayumi",
  description: "ふたりの歩み",
};

export default function OurStoryPage() {
  return (
    <main className="relative min-h-screen text-[#172a3a]">
      <PageBackground />

      <OurStory />

      <div className="relative flex justify-center px-6 pb-20">
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
