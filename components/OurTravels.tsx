"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { Feature, FeatureCollection, Geometry } from "geojson";

type TravelType = "together" | "groom" | "bride" | "separate";

type Visit = {
  date: string;
  person: "together" | "groom" | "bride";
  text?: string;
};

type Travel = {
  country: string;
  countryCode: string;
  type: TravelType;
  visits: Visit[];
};

type CountryProperties = {
  [key: string]: unknown;
};

type CountryFeature = Feature<Geometry, CountryProperties>;

type CountryFeatureCollection = FeatureCollection<Geometry, CountryProperties>;

const travels: Travel[] = [
  {
    country: "Japan",
    countryCode: "JPN",
    type: "together",
    visits: [
      {
        date: "",
        person: "together",
        text: "ふたりで訪れた場所。",
      },
    ],
  },
  {
    country: "Singapore",
    countryCode: "SGP",
    type: "together",
    visits: [
      {
        date: "2024.12.28 — 2025.01.03",
        person: "together",
        text: "ふたりで初めての海外旅行。",
      },
    ],
  },
  {
    country: "Hong Kong",
    countryCode: "HKG",
    type: "together",
    visits: [
      {
        date: "2025.05.02 — 05.06",
        person: "together",
        text: "2か国目は香港へ。",
      },
    ],
  },
  {
    country: "China",
    countryCode: "CHN",
    type: "together",
    visits: [
      {
        date: "2025.11.22 — 11.25",
        person: "together",
        text: "上海へ。",
      },
    ],
  },
  {
    country: "United Kingdom",
    countryCode: "GBR",
    type: "groom",
    visits: [
      {
        date: "",
        person: "groom",
      },
    ],
  },
  {
    country: "France",
    countryCode: "FRA",
    type: "groom",
    visits: [
      {
        date: "",
        person: "groom",
      },
    ],
  },
  {
    country: "United States",
    countryCode: "USA",
    type: "groom",
    visits: [
      {
        date: "",
        person: "groom",
      },
    ],
  },
  {
    country: "South Korea",
    countryCode: "KOR",
    type: "groom",
    visits: [
      {
        date: "",
        person: "groom",
      },
    ],
  },
  {
    country: "Sweden",
    countryCode: "SWE",
    type: "bride",
    visits: [
      {
        date: "",
        person: "bride",
      },
    ],
  },
  {
    country: "Finland",
    countryCode: "FIN",
    type: "bride",
    visits: [
      {
        date: "",
        person: "bride",
      },
    ],
  },
  {
    country: "Australia",
    countryCode: "AUS",
    type: "separate",
    visits: [
      {
        date: "2024.10",
        person: "bride",
        text: "あゆみが留学で渡航。",
      },
    ],
  },
];

const surveyResults = [
  {
    votes: 5,
    destinations: ["ハワイ"],
  },
  {
    votes: 3,
    destinations: ["シンガポール"],
  },
  {
    votes: 2,
    destinations: ["イギリス", "フランス", "カンクン", "モルディブ"],
  },
  {
    votes: 1,
    destinations: [
      "イタリア",
      "ヴェネチア",
      "カナダ",
      "グアム",
      "宮古島",
      "温泉",
      "七福の湯",
      "西浦和駅（あきよの家）",
      "リゾート系",
      "カッパドキア",
      "小笠原諸島・父島",
      "チェコ",
      "北海道",
      "カリフォルニア（カリフォルニアディズニー）",
      "沖縄",
      "ヨーロッパのどこか",
      "北欧",
      "ニューヨーク",
      "シカゴ",
      "オーランド（フロリダ）",
      "スペイン",
      "マヨルカ島",
      "デンマーク",
      "オーストラリア",
      "どこか珍しい国",
      "エモい場所",
      "火星",
    ],
  },
];

const colors: Record<TravelType, string> = {
  together: "#73bda0",
  groom: "#8fa9c0",
  bride: "#c89b9b",
  separate: "#9d8fb0",
};

const labels: Record<TravelType, string> = {
  together: "ふたりで行った",
  groom: "たつやが行った",
  bride: "あゆみが行った",
  separate: "ふたりとも行ったが別々",
};

/*
 * ISO A3コードを持つGeoJSON
 */
const worldUrl =
  "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

export default function OurTravels() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const zoomBehaviorRef = useRef<d3.ZoomBehavior<
    SVGSVGElement,
    unknown
  > | null>(null);

  const svgSelectionRef = useRef<d3.Selection<
    SVGSVGElement,
    unknown,
    null,
    undefined
  > | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const selectedTravel = travels.find(
    (travel) => travel.countryCode === selectedCountry,
  );

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) {
      return;
    }

    let destroyed = false;

    const load = async () => {
      try {
        const response = await fetch(worldUrl);

        if (!response.ok) {
          throw new Error("Failed to load world map data.");
        }

        const world = (await response.json()) as CountryFeatureCollection;

        if (destroyed || !svgRef.current || !containerRef.current) {
          return;
        }

        const container = containerRef.current;
        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove();

        const width = container.clientWidth;
        const height = width * 0.52;

        svg
          .attr("viewBox", `0 0 ${width} ${height}`)
          .attr("width", width)
          .attr("height", height);

        /*
         * メルカトル図法
         */
        const projection = d3
          .geoMercator()
          .translate([width / 2, height / 2])
          .scale(width / 6.4)
          .center([0, 15]);

        const path = d3.geoPath(projection);

        /*
         * 国コードを取得する。
         *
         * データセットによってプロパティ名が違うため、
         * 複数候補を確認する。
         */
        const getCountryCode = (
          country: CountryFeature,
        ): string | undefined => {
          const properties = country.properties;

          const candidates = [
            properties["ISO3166-1-Alpha-3"],
            properties["ISO_A3"],
            properties["ADM0_A3"],
            properties["iso_a3"],
            properties["ISO3"],
            properties["iso3"],
          ];

          // ISOコードは「英大文字3文字」のものだけ採用
          for (const value of candidates) {
            if (typeof value === "string" && /^[A-Z]{3}$/.test(value)) {
              return value;
            }
          }

          // ISOコードが取得できない場合は国名から判定
          const name = properties["name"];

          if (typeof name === "string") {
            const nameMap: Record<string, string> = {
              France: "FRA",
              "United Kingdom": "GBR",
              "United States of America": "USA",
              "United States": "USA",
              "South Korea": "KOR",
              "Korea, Republic of": "KOR",
              Sweden: "SWE",
              Finland: "FIN",
              Australia: "AUS",
              Singapore: "SGP",
              China: "CHN",
              Japan: "JPN",
              "Hong Kong": "HKG",
            };

            return nameMap[name];
          }

          return undefined;
        };

        /*
         * 国から旅行データを取得
         */
        const getTravel = (country: CountryFeature) => {
          const countryCode = getCountryCode(country);

          if (!countryCode) {
            return undefined;
          }

          return travels.find((travel) => travel.countryCode === countryCode);
        };

        /*
         * 地図本体
         */
        const mapGroup = svg.append("g");

        /*
         * 海
         */
        const sphere = mapGroup
          .append("path")
          .datum({
            type: "Sphere",
          } as d3.GeoSphere)
          .attr("class", "sphere")
          .attr("fill", "#eef3f4")
          .attr("stroke", "#c8d1d5")
          .attr("stroke-width", 1)
          .attr("d", path);

        /*
         * 国
         */
        const countryPaths = mapGroup
          .selectAll<SVGPathElement, CountryFeature>("path.country")
          .data(world.features)
          .join("path")
          .attr("class", "country")
          .attr("d", path)
          .attr("fill", (d) => {
            const travel = getTravel(d);

            /*
             * travelsに登録されている国だけ色を付ける。
             *
             * それ以外は必ずグレー。
             */
            if (!travel) {
              return "#dfe4e3";
            }

            return colors[travel.type];
          })
          .attr("stroke", "#ffffff")
          .attr("stroke-width", 0.5)
          .style("cursor", (d) => {
            return getTravel(d) ? "pointer" : "default";
          })
          .on("click", (event, d) => {
            event.stopPropagation();

            const travel = getTravel(d);

            if (travel) {
              setSelectedCountry(travel.countryCode);
            }
          });

        /*
         * 緯度・経度の線
         */
        const graticule = d3.geoGraticule();

        const graticulePath = mapGroup
          .append("path")
          .datum(graticule())
          .attr("class", "graticule")
          .attr("fill", "none")
          .attr("stroke", "#cbd5d6")
          .attr("stroke-width", 0.35)
          .attr("opacity", 0.5)
          .attr("d", path);

        /*
         * 再描画
         */
        const redraw = () => {
          countryPaths.attr("d", path);
          graticulePath.attr("d", path);
          sphere.attr("d", path);
        };

        /*
         * ズーム
         */
        const zoomBehavior = d3
          .zoom<SVGSVGElement, unknown>()
          .scaleExtent([1, 4])
          .translateExtent([
            [-width, -height],
            [width * 2, height * 2],
          ])
          .on("zoom", (event) => {
            mapGroup.attr("transform", event.transform.toString());
          });

        zoomBehaviorRef.current = zoomBehavior;
        svgSelectionRef.current = svg;

        svg.call(zoomBehavior);

        /*
         * 初期状態
         */
        svg.call(zoomBehavior.transform, d3.zoomIdentity);

        redraw();
      } catch (error) {
        console.error("Failed to load travel map:", error);
      }
    };

    void load();

    return () => {
      destroyed = true;

      zoomBehaviorRef.current = null;
      svgSelectionRef.current = null;
    };
  }, []);

  /*
   * ズーム
   */
  const zoomMap = (direction: number) => {
    const svg = svgSelectionRef.current;
    const zoomBehavior = zoomBehaviorRef.current;

    if (!svg || !zoomBehavior) {
      return;
    }

    if (direction > 0) {
      svg.transition().duration(250).call(zoomBehavior.scaleBy, 1.4);
    } else {
      svg
        .transition()
        .duration(250)
        .call(zoomBehavior.scaleBy, 1 / 1.4);
    }
  };

  /*
   * リセット
   */
  const resetMap = () => {
    const svg = svgSelectionRef.current;
    const zoomBehavior = zoomBehaviorRef.current;

    if (!svg || !zoomBehavior) {
      return;
    }

    svg
      .transition()
      .duration(400)
      .call(zoomBehavior.transform, d3.zoomIdentity);
  };

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-4 text-xs tracking-[0.35em] text-[#6b7f8d]">
            OUR TRAVELS
          </p>

          <h1 className="font-serif text-3xl tracking-[0.08em] sm:text-4xl">
            ふたりの海外渡航歴
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 tracking-[0.08em] text-[#526774]">
            これまでにふたりが訪れた国。
            <br />
            一緒に行った場所も、別々に訪れた場所も。
            <br />
            全部塗りつぶせたらいいなぁ
          </p>
        </div>

        {/* Map */}
        <div ref={containerRef} className="relative mx-auto w-full">
          <svg ref={svgRef} className="h-auto w-full touch-none select-none" />

          {/* Zoom controls */}
          <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-sm border border-[#c8d1d5] bg-[#f8f7f3]/95 shadow-sm backdrop-blur-sm">
            <button
              type="button"
              onClick={() => zoomMap(1)}
              className="flex h-10 w-10 items-center justify-center text-lg text-[#526774] transition hover:bg-[#eef3f4]"
              aria-label="地図を拡大"
            >
              +
            </button>

            <div className="h-px bg-[#c8d1d5]" />

            <button
              type="button"
              onClick={() => zoomMap(-1)}
              className="flex h-10 w-10 items-center justify-center text-lg text-[#526774] transition hover:bg-[#eef3f4]"
              aria-label="地図を縮小"
            >
              −
            </button>

            <div className="h-px bg-[#c8d1d5]" />

            <button
              type="button"
              onClick={resetMap}
              className="flex h-10 w-10 items-center justify-center text-xs tracking-[0.05em] text-[#526774] transition hover:bg-[#eef3f4]"
              aria-label="地図をリセット"
            >
              ↺
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-[10px] tracking-[0.2em] text-[#87969e]">
          DRAG TO EXPLORE　·　SCROLL TO ZOOM
        </p>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
          {(Object.keys(colors) as TravelType[]).map((type) => (
            <div
              key={type}
              className="flex items-center gap-2 text-xs tracking-[0.05em] text-[#526774]"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: colors[type],
                }}
              />

              {labels[type]}
            </div>
          ))}
        </div>

        {/* Selected country */}
        {selectedTravel && (
          <div className="mx-auto mt-16 max-w-2xl border-t border-[#c8d1d5] pt-10">
            <div className="text-center">
              <p className="text-xs tracking-[0.3em] text-[#6b7f8d]">
                {selectedTravel.country.toUpperCase()}
              </p>

              <h2 className="mt-3 font-serif text-2xl tracking-[0.08em]">
                {labels[selectedTravel.type]}
              </h2>
            </div>

            <div className="mt-8 space-y-6">
              {selectedTravel.visits.map((visit, index) => (
                <div
                  key={`${visit.date}-${index}`}
                  className="border-b border-[#e0e4e3] pb-6 last:border-b-0"
                >
                  {visit.date && (
                    <p className="text-xs tracking-[0.15em] text-[#6b7f8d]">
                      {visit.date}
                    </p>
                  )}

                  {visit.text && (
                    <p className="mt-3 text-sm leading-7 tracking-[0.05em] text-[#526774]">
                      {visit.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GUEST SURVEY */}
        <div className="mt-24">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-[0.3em] text-[#6b7f8d]">
              GUEST SURVEY
            </p>

            <h2 className="mt-3 font-serif text-2xl tracking-[0.08em]">
              みんなが選んだ行き先
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-xs leading-7 tracking-[0.08em] text-[#87969e]">
              結婚式の招待状にて、 皆さまにおすすめの旅先を聞いてみました。
              <br />
              頂いたおすすめを、ランキング形式でご紹介します。
              <br />
              皆さまのおすすめ、全部行ってみせます。
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-8">
            {surveyResults.map((result) => (
              <div
                key={result.votes}
                className="border-t border-[#c8d1d5] pt-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-xs tracking-[0.25em] text-[#6b7f8d]">
                    {result.votes} {result.votes === 1 ? "VOTE" : "VOTES"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {result.destinations.map((destination) => (
                    <span
                      key={destination}
                      className="border border-[#c8d1d5] px-4 py-3 text-sm tracking-[0.05em] text-[#526774]"
                    >
                      {destination}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
