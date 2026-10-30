import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <Link
          href="/"
          className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          CineStream
        </Link>
        <p className="mt-10 text-8xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </p>
        <h1 className="mt-4 text-2xl font-semibold">This scene didn&apos;t make the cut</h1>
        <p className="mt-3 text-gray-300">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Back to home
          </Link>
          <Link
            href="/movies"
            className="bg-white/10 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            Browse movies
          </Link>
          <Link
            href="/series"
            className="bg-white/10 px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            Browse TV shows
          </Link>
        </div>
      </div>
    </main>
  );
}
