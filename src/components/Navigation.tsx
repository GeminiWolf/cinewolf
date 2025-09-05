import React, { useEffect, useState } from "react";
import { Menu, X, Search, Bell, User } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-black/90 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                CineStream
              </div>
              <div className="hidden md:flex space-x-6">
                <Link
                  href="/"
                  className="hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/movies"
                  className="hover:text-purple-400 transition-colors"
                >
                  Movies
                </Link>
                <Link
                  href="/series"
                  className="hover:text-purple-400 transition-colors"
                >
                  TV Shows
                </Link>
                {/* <Link
                  href="/originals"
                  className="hover:text-purple-400 transition-colors"
                >
                  Originals
                </Link> */}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Search className="w-5 h-5 cursor-pointer hover:text-purple-400 transition-colors" /> */}
              {/* <Bell className="w-5 h-5 cursor-pointer hover:text-purple-400 transition-colors" /> */}
              {/* <User className="w-5 h-5 cursor-pointer hover:text-purple-400 transition-colors" /> */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
            <Link href="/" className="hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link
              href="/movies"
              className="hover:text-purple-400 transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/series"
              className="hover:text-purple-400 transition-colors"
            >
              TV Shows
            </Link>
            {/* <Link
              href="/originals"
              className="hover:text-purple-400 transition-colors"
            >
              Originals
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
