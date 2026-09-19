import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PageBackground from "@/components/PageBackground";
import WeddingCountdown from "@/components/WeddingCountdown";

export const metadata: Metadata = {
  title: "Our Wedding | Tatsuya & Ayumi",
  description: "結婚式のこれから。",
};

export default function OurWeddingPage() {
  return (
    <main className="relative min-h-screen text-[#172a3a]">
      <PageBackground />

      <section className="relative px-6 py-24 sm:py-32">
        <FadeIn>
          <div className="mx-auto max-w-3xl">
            {/* Heading */}
            <div className="text-center">
              <p className="mb-4 text-xs tracking-[0.35em] text-[#6b7f8d]">
                OUR WEDDING
              </p>

              <h1 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
                私たちの結婚式
              </h1>

              <div className="mx-auto my-8 h-px w-16 bg-[#9aabb3]" />
            </div>

            {/* Countdown */}
            <WeddingCountdown />

            {/* Message */}
            <div className="mx-auto mt-20 max-w-xl border-t border-[#c8d1d5] pt-10 text-center">
              <p className="text-sm leading-8 tracking-[0.08em] text-[#526774]">
                皆さまの前で誓ってからの時間を
                <br />
                ここに刻みます。
                <br />
                これからも皆さまと一緒に
                <br className="hidden sm:block" />
                たくさんの思い出を重ねていけたらと思っています。
              </p>
            </div>

            {/* Back */}
            <div className="mt-20 flex justify-center">
              <Link
                href="/"
                className="text-xs tracking-[0.3em] text-[#6b7f8d] transition hover:text-[#172a3a]"
              >
                ← BACK TO HOME
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
