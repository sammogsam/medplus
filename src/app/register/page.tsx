"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
  const { data: inserted, error: participantError } = await supabase
    .from("participants")
    .insert({
      id: data.user.id,
      full_name: name,
      email,
    })
    .select();

  console.log("Inserted:", inserted);
  console.log("Participant error:", participantError);

  if (participantError) {
    alert(participantError.message);
    return;
  }
}

    alert("Registration successful. Please login.");
    router.push("/login");
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
          onSubmit={handleRegister}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-xl"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Create Account
            </h1>

            <p className="mt-2 text-slate-500">
              Join the MED+ Reading Challenge.
            </p>
          </div>

          <input
            className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Create Account
          </button>

          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}