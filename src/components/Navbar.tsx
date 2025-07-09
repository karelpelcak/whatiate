"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-md border-b border-gray-200 dark:border-gray-800 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
            what i eat
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-2 md:gap-4">
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Dashboard</Link>
            <Link href="/upload" className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition">Upload</Link>
          </div>
          <button className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {session?.user ? (
            <div className="flex items-center gap-2">
              {session.user.image && (
                <img src={session.user.image} alt="profile" className="w-8 h-8 rounded-full border shadow" />
              )}
              <span className="hidden sm:block text-gray-800 dark:text-gray-100 font-medium max-w-[120px] truncate">{session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="ml-2 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 flex flex-col gap-2 animate-fade-in">
          <Link href="/dashboard" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link href="/upload" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition" onClick={() => setMenuOpen(false)}>Upload</Link>
        </div>
      )}
    </nav>
  );
}
