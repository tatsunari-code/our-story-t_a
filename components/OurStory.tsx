"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

type StoryPhoto = {
  src: string;
  comment?: string;
  fullSize?: boolean;
};

type Story = {
  date: string;
  title: string;
  text?: string;
  photos?: StoryPhoto[];
};

const IMAGE_PASS = "/images/story/";

const stories: Story[] = [
  {
    date: "2021.03.05",
    title: "THE BEGINNING",
    text: "ふたりが出会った日。",
  },
  {
    date: "2021.03.19",
    title: "START",
    text: "ふたりが付き合った日。",
    photos: [
      {
        src: IMAGE_PASS + "20210319_start_1.webp",
        comment: "富士急に行きました",
      },
    ],
  },
  {
    date: "2021.03.29",
    title: "HAMABE MINAMI EXPLORATION TEAM",
    text: "「浜辺美波探検隊」が結成。辺美波さんのロケ地を巡ることを目的とし、2026/11/08現在まで活動回数は1回。次回未定。",
    photos: [
      {
        src: IMAGE_PASS + "20210329_hamabe_jump_hamabe.webp",
        comment: "ドラマのワンシーン（「ウチの娘は、彼氏が出来ない!!」より）",
      },
      {
        src: IMAGE_PASS + "20210329_hamabe_jump_tatsuya.webp",
        comment: "再現ガチ勢",
      },
      {
        src: IMAGE_PASS + "20210329_hamabe_jump_ayumi.webp",
        comment: "やる気なし",
      },
    ],
  },
  {
    date: "2021.04.29",
    title: "FIRST DISNEY SEA",
    text: "ふたりで行く初めてのディズニーシー。",
    photos: [
      {
        src: IMAGE_PASS + "20210429_first_disney-sea_front.webp",
        comment: "前です",
      },
      {
        src: IMAGE_PASS + "20210429_first_disney-sea_back.webp",
        comment: "後ろです",
      },
    ],
  },
  {
    date: "2022.03.27",
    title: "1ST ANNIVERSARY",
    text: "1年記念はシュラスコ。",
    photos: [
      {
        src: IMAGE_PASS + "20220327_churrasco.webp",
        comment: "食べ過ぎ飲みすぎでグロッキー",
      },
    ],
  },
  {
    date: "2022.04.22 — 04.24",
    title: "USJ & STAGE",
    text: "USJ、そして千と千尋の舞台へ。",
    photos: [
      {
        src: IMAGE_PASS + "20220422_usj.webp",
      },
      {
        src: IMAGE_PASS + "20220422_sen_1.webp",
      },
      {
        src: IMAGE_PASS + "20220422_sen_2.webp",
        comment: "橋本環奈は実在していた",
      },
    ],
  },
  {
    date: "2022.06.25",
    title: "FIRST DISNEY LAND",
    text: "初めてのディズニーランド。",
    photos: [
      {
        src: IMAGE_PASS + "20220625_first_disney.webp",
        comment: "かーみーさーまー",
      },
    ],
  },
  {
    date: "2022.09.25",
    title: "HARRY POTTER",
    text: "舞台「ハリー・ポッター」鑑賞。",
    photos: [
      {
        src: IMAGE_PASS + "20220925_haripota_1.webp",
        fullSize: true,
      },
      {
        src: IMAGE_PASS + "20220925_haripota_2.webp",
        comment: "藤原さんの叫ぶシーンはカイジ過ぎました",
      },
    ],
  },
  {
    date: "2024.10.26",
    title: "STUDY ABROAD AYUMI",
    text: "あゆみ、意を決して海外留学（オーストラリア）へ",
    photos: [
      {
        src: IMAGE_PASS + "20241026_ayumi_study.webp",
        comment: "緊張してます",
      },
    ],
  },
  {
    date: "2024.12.28 — 2025.01.03",
    title: "SINGAPORE",
    text: "ふたりでの初海外旅行、シンガポールへ",
    photos: [
      {
        src: IMAGE_PASS + "20241228_ma-lion.webp",
      },
      {
        src: IMAGE_PASS + "20241228_casino.webp",
        comment: "左：カジノで負けた人　右：カジノで勝った人",
      },
    ],
  },
  {
    date: "2025.05.02 — 05.06",
    title: "HONG KONG",
    text: "2か国目は香港に行きました。",
    photos: [
      {
        src: IMAGE_PASS + "20250502_hongkong_breacfast.webp",
        comment: "自分たちのご飯のように見えますが、知らない人のご飯です",
      },
      {
        src: IMAGE_PASS + "20250502_hongkong_night-view.webp",
        comment: "2時間並んだあとなので、顔が疲れてます",
      },
      {
        src: IMAGE_PASS + "20250502_hongkong-disney.webp",
        comment: "なんか色々すごかった香港ディズニー",
      },
      {
        src: IMAGE_PASS + "20250502_ayumi_flight-mode.webp",
        comment: "帰りの飛行機で現れた、あゆみ完全防御形態",
      },
    ],
  },
  {
    date: "2025.09.15",
    title: "BATTLE SAP",
    text: "SAPであゆみを落とす",
    photos: [
      {
        src: IMAGE_PASS + "20250915_sap_1.webp",
      },
      {
        src: IMAGE_PASS + "20250915_sap_2.webp",
      },
      {
        src: IMAGE_PASS + "20250915_sap_3.webp",
      },
      {
        src: IMAGE_PASS + "20250915_sap_4.webp",
      },
    ],
  },
  {
    date: "2025.11.22 — 11.25",
    title: "SHANGHAI",
    text: "上海へ。少しずつ、ふたりの世界が広がっていきました。",
    photos: [
      {
        src: IMAGE_PASS + "20251122_starbucks.webp",
        comment:
          "購入した商品にオプションがついていることを知らず、思ったより高い買い物をしてしまった後の顔",
      },
      {
        src: IMAGE_PASS + "20251122_shanghai-disney.webp",
      },
      {
        src: IMAGE_PASS + "20251122_donald.webp",
        comment: "海外のドナルド怖い、食べられそう",
      },
      {
        src: IMAGE_PASS + "20251122_hotel.webp",
        comment: "ディズニーホテルデビューは上海でした",
      },
    ],
  },
  {
    date: "2026.03.19",
    title: "THE PROPOSAL",
    text: "5年記念日に下呂温泉旅行。そして、プロポーズ。",
    photos: [
      {
        src: IMAGE_PASS + "20260319_proposal.webp",
        comment: "かしこまったのは苦手なので、寝っ転がりながら、、、",
      },
    ],
  },
  {
    date: "2026.05.31 - 11.07",
    title: "WEDDING PREPARATION",
    text: "NEEDS代官山さんで式を挙げさせていただくことに決め、準備じゅんびJUNBIの毎日。。。",
    photos: [
      {
        src: IMAGE_PASS + "20260531_chapel.webp",
      },
      {
        src: IMAGE_PASS + "20260531_cicada.webp",
        comment: "僕たちのプランナーさんは、新婦をセミから守ってくれます",
        fullSize: true,
      },
    ],
  },
  {
    date: "2026.11.08",
    title: "NOW LOADING...",
    text: "後日更新する...かも",
  },
];

export default function OurStory() {
  return (
    <section id="story" className="px-6 py-24 sm:py-32">
      <FadeIn>
        <div className="mx-auto max-w-2xl">
          {/* Section heading */}
          <div className="mb-16 text-center">
            <p className="mb-4 text-xs tracking-[0.35em] text-[#6b7f8d]">
              OUR STORY
            </p>

            <h2 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
              ふたりの歩み
            </h2>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 h-full w-px bg-[#c8d4d8]" />

            <div className="space-y-12">
              {stories.map((story, index) => (
                <FadeIn key={`${story.date}-${index}`} delay={index * 0.05}>
                  <div className="relative pl-10">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1.5 h-7 w-7 rounded-full border border-[#9aabb3] bg-[#f8f7f3]" />

                    <p className="text-xs tracking-[0.2em] text-[#6b7f8d]">
                      {story.date}
                    </p>

                    <h3 className="mt-2 font-serif text-xl tracking-[0.08em] text-[#172a3a]">
                      {story.title}
                    </h3>

                    {story.text && (
                      <p className="mt-3 text-sm leading-7 tracking-[0.05em] text-[#526774]">
                        {story.text}
                      </p>
                    )}

                    {/* Photos */}
                    {story.photos && story.photos.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {story.photos.map((photo, photoIndex) => (
                          <div key={`${photo.src}-${photoIndex}`}>
                            {photo.fullSize ? (
                              <div className="overflow-hidden rounded-sm">
                                <Image
                                  src={photo.src}
                                  alt={`${story.title} ${photoIndex + 1}`}
                                  width={1200}
                                  height={900}
                                  sizes="(max-width: 768px) 50vw, 336px"
                                  className="h-auto w-full"
                                />
                              </div>
                            ) : (
                              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                                <Image
                                  src={photo.src}
                                  alt={`${story.title} ${photoIndex + 1}`}
                                  fill
                                  sizes="(max-width: 768px) 50vw, 336px"
                                  className="object-cover"
                                />
                              </div>
                            )}

                            {photo.comment && (
                              <p className="mt-2 text-xs leading-6 tracking-[0.05em] text-[#6b7f8d]">
                                {photo.comment}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
