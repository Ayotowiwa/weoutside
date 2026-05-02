"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">WeOutside</h1>
          </Link>

          {/* Center: Search Bar (Always visible) */}
          <div className="flex-grow mx-4 md:mx-8">
            <input
              type="text"
              placeholder="Search events, places..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-black"
            />
          </div>

          {/* Right: Menu Items (Hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Discover
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Sign In
            </button>
          </div>

          {/* Mobile: Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              Home
            </Link>
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              Discover
            </Link>
            <Link href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
              About
            </Link>
            <button className="w-full text-left px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 mt-2">
              Sign In
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
