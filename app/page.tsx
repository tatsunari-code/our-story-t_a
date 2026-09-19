import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import MenuLink from "@/components/MenuLink";

export default function Home() {
  return (
    <main id="top" className="min-h-screen bg-[#f8f7f3] text-[#172a3a]">
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
        {/* Decorative circles */}
        <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-[#dcecf0] opacity-60 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-[#e5eef1] opacity-70 blur-3xl" />

        <div className="relative z-10 text-center">
          <p className="mb-6 text-xs tracking-[0.4em] text-[#6b7f8d]">
            OUR PROFILE
          </p>

          <h1 className="font-serif text-5xl tracking-[0.12em] sm:text-7xl">
            T & A
          </h1>

          <div className="mx-auto my-8 h-px w-16 bg-[#9aabb3]" />

          <p className="text-sm tracking-[0.25em] text-[#526774]">
            Tatsuya & Ayumi
          </p>

          <p className="mt-4 text-xs tracking-[0.2em] text-[#87969e]">
            A LITTLE STORY ABOUT US
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] text-[#87969e]">
              SCROLL
            </span>
            <div className="h-10 w-px bg-[#9aabb3]" />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section id="about" className="px-6 py-24 sm:py-32">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs tracking-[0.35em] text-[#6b7f8d]">
              ABOUT US
            </p>

            <h2 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
              私たちについて
            </h2>

            <p className="mt-8 text-sm leading-8 tracking-[0.08em] text-[#526774]">
              私たちのことを、もう少し知ってもらえるように。
              <br />
              出会いや好きなもの、日々のこと。
              <br />
              ここでは、プロフィールブックには載せきれなかった
              <br className="hidden sm:block" />
              ふたりのことを紹介します。
              <br />
              今後も気が向いたら更新する...かも？
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Menu */}
      <section className="px-6 py-20">
        <FadeIn>
          <div className="mx-auto max-w-md">
            <div className="mb-12 text-center">
              <p className="text-xs tracking-[0.35em] text-[#6b7f8d]">
                CONTENTS
              </p>
            </div>

            <div className="space-y-4">
              <MenuLink href="/our-story" en="OUR STORY" ja="ふたりの歩み" />

              <MenuLink
                href="/our-travels"
                en="OUR TRAVELS"
                ja="ふたりの海外渡航歴"
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 pt-24 sm:pt-32">
        <FadeIn>
          <div className="mx-auto max-w-2xl border-t border-[#c8d1d5] pt-12 text-center">
            <p className="text-[10px] tracking-[0.4em] text-[#87969e]">
              WITH LOVE
            </p>

            <p className="mt-5 font-serif text-3xl tracking-[0.15em] text-[#526774]">
              T & A
            </p>

            <div className="mx-auto my-6 h-px w-10 bg-[#9aabb3]" />

            <p className="text-[11px] tracking-[0.18em] text-[#87969e]">
              THANK YOU FOR BEING PART OF OUR STORY
            </p>

            <Link
              href="#top"
              className="mt-10 inline-block text-[10px] tracking-[0.3em] text-[#6b7f8d] transition hover:text-[#172a3a]"
            >
              ↑ BACK TO TOP
            </Link>

            <p className="mt-12 text-[9px] tracking-[0.18em] text-[#a5b0b5]">
              TATSUYA & AYUMI
            </p>
          </div>
        </FadeIn>
      </footer>
    </main>
  );
}
