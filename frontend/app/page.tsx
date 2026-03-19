import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
        <p className="text-gray-500 mb-8">Sign in or create an account to get started.</p>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Log In
          </Link>
          <Link
            href="/auth/signup"
            className="w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
