import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "T & A",
    template: "%s | T & A",
  },

  description: "Tatsuya & Ayumi の思い出と軌跡を綴ったウェディングサイトです。",

  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "T & A OUR-STORY",
    description: "Tatsuya & Ayumi の思い出",
    url: "https://our-story-t-a.vercel.app/", // 実際の公開URLに書き換えてください
    siteName: "T & A OUR-STORY",
    images: [
      {
        url: "https://our-story-t-a.vercel.app/favicon.png",
        width: 800,
        height: 800,
        alt: "T & A OUR-STORY アイコン",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
