import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { useState } from "preact/hooks";

import { Menu, X } from "lucide-preact"

export default function Navigator() {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-blue-800">
          🧠 A&P Study
        </a>

        {/* Desktop Menu */}
        <nav class="hidden sm:flex gap-6 text-sm sm:text-base">
          <a href="/muscles" class="text-gray-700 hover:text-blue-600 transition">Muscles</a>
          <a href="/terminologies" class="text-gray-700 hover:text-blue-600 transition">Terminology</a>
          <a href="/about" class="text-gray-700 hover:text-blue-600 transition">About</a>
        </nav>

        {/* Mobile Menu Button */}
        <button class="sm:hidden text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X class="w-7 h-7" /> : <Menu class="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div class="sm:hidden px-4 pb-4">
          <a href="/muscle/list" class="block py-2 text-gray-700 hover:text-blue-600">Muscles</a>
          <a href="/terminology/list" class="block py-2 text-gray-700 hover:text-blue-600">Terminology</a>
          <a href="/about" class="block py-2 text-gray-700 hover:text-blue-600">About</a>
        </div>
      )}
    </header>
  );
}
