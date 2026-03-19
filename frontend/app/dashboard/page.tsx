"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Mount guard — prevents hydration mismatch from localStorage reads during SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth check — only runs after mount (client-side only)
  useEffect(() => {
    if (!mounted) return;
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");
    if (!token || !stored) {
      router.replace("/auth/login");
      return;
    }
    try {
      setUser(JSON.parse(stored) as User);
    } catch {
      router.replace("/auth/login");
    }
  }, [mounted, router]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  }

  // Show nothing until mounted, then show loading until user is resolved
  if (!mounted || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold text-gray-900">Dashboard</span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
      <div className="max-w-2xl mx-auto mt-16 px-4">
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-blue-600">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>
    </main>
  );
}
