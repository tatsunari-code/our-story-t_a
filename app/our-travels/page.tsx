import type { Metadata } from "next";
import Link from "next/link";
import OurTravels from "@/components/OurTravels";

export const metadata: Metadata = {
  title: "Our Travels | Tatsuya & Ayumi",
  description: "ふたりの海外渡航歴",
};

export default function OurTravelsPage() {
  return (
    <main className="min-h-screen bg-[#f8f7f3] text-[#172a3a]">
      <OurTravels />

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
