"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const routerRef = useRef(router);
  const hasRedirected = useRef(false);
  const [user, setUser] = useState<User | null>(null);
  const [checked, setChecked] = useState(false);

  // Auth check — runs once on mount only.
  // hasRedirected ref guards against React 18 Strict Mode double-invocation
  // which would otherwise call replace() twice and trigger Chrome's
  // "Throttling navigation" warning.
  useEffect(() => {
    if (hasRedirected.current) return;
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");
    if (!token || !stored) {
      hasRedirected.current = true;
      routerRef.current.replace("/auth/login");
      return;
    }
    try {
      setUser(JSON.parse(stored) as User);
      setChecked(true);
    } catch {
      hasRedirected.current = true;
      routerRef.current.replace("/auth/login");
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/auth/login");
  }

  // Show loading until auth check resolves
  if (!checked || !user) {
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
