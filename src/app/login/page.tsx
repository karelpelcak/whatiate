"use client";
import { signIn } from "next-auth/react";
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-blue-950 dark:via-gray-950 dark:to-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center gap-8 max-w-md w-full animate-fade-in">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight drop-shadow">🍽️</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center">Sign in to <span className="text-blue-600 dark:text-blue-400">what i eat</span></h1>
          </div>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    </div>
  );
} 