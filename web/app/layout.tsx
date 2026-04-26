import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scout AI",
  description: "Soccer player performance analysis",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <nav className="border-b border-zinc-200 bg-white px-6 py-4 flex gap-6 text-sm font-medium">
          <a href="/" className="text-zinc-900 hover:text-zinc-600">Scout AI</a>
          <a href="/players" className="text-zinc-500 hover:text-zinc-900">Players</a>
          <a href="/matches" className="text-zinc-500 hover:text-zinc-900">Matches</a>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
