"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700"
        >
          ← Back to Home
        </Link>

        <form
          onSubmit={handleLogin}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-xl"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h1>

            <p className="mt-2 text-slate-500">
              Sign in to continue your reading challenge.
            </p>
          </div>

          <input
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
            type="submit"
          >
            Login
          </button>

          <p className="text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}