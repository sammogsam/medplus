import Link from "next/link";
import { BookOpen, Trophy, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-br from-emerald-600 to-green-500 text-white">

        <div className="mx-auto max-w-7xl px-6 py-28 text-center">

          <h1 className="text-6xl font-black leading-tight">
            MED+ Reading Challenge
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/90">
            Build a daily habit of reading, reflecting and growing together.
            Stay accountable, track your progress and climb the leaderboard.
          </p>

          <div className="mt-12 flex justify-center gap-5">

            <Link
              href="/register"
              className="rounded-2xl bg-white px-8 py-4 text-lg font-bold text-emerald-600 shadow-lg transition hover:scale-105"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="rounded-2xl border border-white px-8 py-4 text-lg font-bold transition hover:bg-white hover:text-emerald-600"
            >
              Login
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-3">

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <BookOpen className="text-emerald-600" size={42} />

          <h2 className="mt-6 text-2xl font-bold">
            Daily Reading
          </h2>

          <p className="mt-3 text-slate-600">
            Receive a new reading assignment every day and build consistency.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <CheckCircle className="text-emerald-600" size={42} />

          <h2 className="mt-6 text-2xl font-bold">
            Reflect
          </h2>

          <p className="mt-3 text-slate-600">
            Write a short reflection after each reading to reinforce learning.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <Trophy className="text-emerald-600" size={42} />

          <h2 className="mt-6 text-2xl font-bold">
            Leaderboard
          </h2>

          <p className="mt-3 text-slate-600">
            Stay motivated by seeing your progress alongside other participants.
          </p>
        </div>

      </section>

      {/* Footer */}

      <footer className="border-t bg-white py-8 text-center text-slate-500">
        © {new Date().getFullYear()} MED+ Reading Challenge
      </footer>

    </main>
  );
}