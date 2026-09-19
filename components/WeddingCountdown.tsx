"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-11-08T16:00:00+09:00");

type ElapsedTime = {
  years: number;
  months: number;
  days: number;
  minutes: number;
  seconds: number;
};

function getElapsedTime(start: Date): ElapsedTime {
  const now = new Date();

  // 結婚式開始前はすべて0
  if (now < start) {
    return {
      years: 0,
      months: 0,
      days: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  let years = now.getFullYear() - start.getFullYear();

  let cursor = new Date(start);
  cursor.setFullYear(start.getFullYear() + years);

  if (cursor > now) {
    years -= 1;
    cursor = new Date(start);
    cursor.setFullYear(start.getFullYear() + years);
  }

  let months =
    (now.getFullYear() - cursor.getFullYear()) * 12 +
    (now.getMonth() - cursor.getMonth());

  const monthCursor = new Date(cursor);
  monthCursor.setMonth(monthCursor.getMonth() + months);

  if (monthCursor > now) {
    months -= 1;
  }

  cursor = new Date(cursor);
  cursor.setMonth(cursor.getMonth() + months);

  const remainingMilliseconds = now.getTime() - cursor.getTime();

  // 残りの日数
  const days = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));

  // 日数を引いた残り
  const remainingAfterDays = remainingMilliseconds - days * 1000 * 60 * 60 * 24;

  // 時間を取り出す
  const hours = Math.floor(remainingAfterDays / (1000 * 60 * 60));

  // 時間を引いた残りから分を計算
  const remainingAfterHours = remainingAfterDays - hours * 1000 * 60 * 60;

  const minutes = Math.floor(remainingAfterHours / (1000 * 60));

  const seconds = Math.floor((remainingAfterHours % (1000 * 60)) / 1000);

  return {
    years,
    months,
    days,
    minutes,
    seconds,
  };
}

export default function WeddingCountdown() {
  const [time, setTime] = useState<ElapsedTime>({
    years: 0,
    months: 0,
    days: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      setTime(getElapsedTime(WEDDING_DATE));
    };

    update();

    const interval = window.setInterval(update, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const items = [
    { value: time.years, label: "YEARS" },
    { value: time.months, label: "MONTHS" },
    { value: time.days, label: "DAYS" },
    { value: time.minutes, label: "MINUTES" },
    { value: time.seconds, label: "SECONDS" },
  ];

  return (
    <div className="mt-14 text-center">
      <p className="text-xs tracking-[0.35em] text-[#6b7f8d]">
        SINCE WE SAID "I DO"
      </p>

      <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="border border-[#c8d1d5]/80 bg-[#f8f7f3]/50 px-1 py-4 backdrop-blur-sm sm:px-4 sm:py-6"
          >
            <p className="font-serif text-2xl tracking-[0.05em] text-[#526774] sm:text-4xl">
              {String(item.value).padStart(2, "0")}
            </p>

            <p className="mt-2 text-[7px] tracking-[0.15em] text-[#87969e] sm:mt-3 sm:text-[9px] sm:tracking-[0.3em]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
