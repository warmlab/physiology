import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { useState, useEffect } from "preact/hooks";

import { Menu, X, User, LogOut } from "lucide-preact"

type UserData = {
  name: string;
  avatar?: string;
}

export default function Navigator() {
  const [currentPath, setCurrentPath] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(globalThis.location.pathname);
  }, []);

  const isActive = (path: string) =>
    currentPath.startsWith(path) ? "text-blue-700 font-semibold" : "text-gray-700";
  const desktopLink = "block px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition"
  const mobileLink = "block px-4 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition";

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const parsed = JSON.parse(userJson);
        setUser(parsed);
      } catch (_) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    globalThis.location.href = '/';  // or redirect to login
  };

  return (
    <header class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <a href="/" class="text-2xl font-bold text-blue-800">
          🧠 A&P Study
        </a>

        {/* Desktop Menu */}
        <nav class="hidden sm:flex gap-6 text-sm sm:text-base">
          <a href="/muscle/list" class={`${desktopLink} ${isActive("/muscle")}`}>Muscles</a>
          <a href="/terminology/list" class={`${desktopLink} ${isActive("/terminology")}`}>Terminology</a>
          <a href="/about" class={`${desktopLink} ${isActive("/about")}`}>About</a>
          {!user ? (
            <a href="/auth" class={`${desktopLink} ${isActive("/auth")}`}>Login</a>
          ) : (
            <div class="relative ml-4">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} class="flex items-center space-x-2 focus:outline-none">
                <img src={user.avatar || "/default-avatar.png"} alt="avatar" class="w-8 h-8 rounded-full border" />
                <span class="text-gray-700">{user.name}</span>
              </button>
              {dropdownOpen && (
                <div class="absolute right-0 mt-2 bg-white border shadow rounded w-40 z-10">
                  {/*<a href="/profile" class={`${desktopLink} ${isActive("/profile")}`}>Profile</a>*/}
                  <a href="/my/muscles" class={`${desktopLink} ${isActive("/my/muscles")}`}>My Muscles</a>
                  <a href="/my/terminologies" class={`${desktopLink} ${isActive("/my/terminologies")}`}>My Terminology</a>
                  <button type="button" onClick={logout}
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button type="button" class="sm:hidden text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X class="w-7 h-7" /> : <Menu class="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div class="sm:hidden p-4 space-y-2 bg-white border-t text-right">
          <a href="/muscle/list" class={`${mobileLink} ${isActive("/muscle")}`}>Muscles</a>
          <a href="/terminology/list" class={`${mobileLink} ${isActive("/terminology")}`}>Terminology</a>
          <a href="/about" class={`${mobileLink} ${isActive("/about")}`}>About</a>
          {!user ? (
            <a href="/auth" class={`${mobileLink} ${isActive("/auth")}`}>Login</a>
          ) : (
            <>
              {/*<a href="/profile" class={`${mobileLink} ${isActive("/profile")}`}>👤 {user.name}</a> */}
              <a href="/my/muscles" class={`${mobileLink} ${isActive("/my/muscles")}`}>My Muscles</a>
              <a href="/my/terminology" class={`${mobileLink} ${isActive("/my/terminology")}`}>My Terminology</a>
              <button type="button" onClick={logout} class="w-full text-left py-2 text-red-600 hover:text-red-800">Logout</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
