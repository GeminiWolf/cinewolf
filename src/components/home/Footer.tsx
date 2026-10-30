import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        <div className="max-w-sm">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            CineStream
          </Link>
          <p className="mt-3 text-gray-300 text-sm">
            Discover trending, popular and top rated movies and TV shows.
          </p>
        </div>
        <nav aria-label="Footer">
          <h3 className="font-semibold mb-4">Browse</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" className="hover:text-white transition-colors">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/series" className="hover:text-white transition-colors">
                TV Shows
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between gap-2 text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} CineStream. All rights reserved.</p>
        <p>
          Data and images from{" "}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            TMDB
          </a>
          . This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
