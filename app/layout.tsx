import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogs Shada",
  description: "Catatan milik Shada",
    keywords: [
    "blog pribadi",
    "personal blog",
    "Bintang Shada",
    "Bintang Shada Kawibya Putra",
    "mahasiswa informatika",
    "UPN Veteran Yogyakarta", 
    "software engineering",
    "programming blog",
    "teknologi",
    "coding",
    "web development",
    "student blog",
    "portfolio",
    "SMKN 1 Bantul",
    "software engineer",
    "blog mahasiswa",
    "next js blog",
    "react blog",
    "typescript",
    "javascript",
    "web developer",
    "blog indonesia"
  ],
  icons: {
    icon: '/note.svg',
  },
  verification: {
    google: 'U7eRSN3suk2UAh-OM1fM874CeZoWbvbNTT06NiOdC2Y',
  },
  authors: [{ name: 'Bintang Shada Kawibya Putra' }],
  creator: 'Bintang Shada Kawibya Putra',
  publisher: 'Bintang Shada Kawibya Putra',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen min-w-screen">
          <main className="flex flex-col row-start-2  sm:items-start">
            <div className="container lg:w-4xl w-screen">
              <p className="p-4"><Link href="/">Home</Link> | <Link href="/about">About</Link> | <Link href="/articles">Articles</Link> | <Link href="/contact">Contact</Link> </p>
              <div className="px-4">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
