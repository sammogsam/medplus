"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AppLayout from "@/components/layout/AppLayout";
import StatsCards from "@/components/dashboard/StatsCards";
import ProgressBar from "@/components/dashboard/ProgressBar";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [todayTask, setTodayTask] = useState<any>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [reflection, setReflection] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    setUser(session.user);

    const { data: schedule } = await supabase
      .from("reading_schedule")
      .select("*")
      .eq("reading_date", today)
      .maybeSingle();

    setTodayTask(schedule);

    const { data: progress } = await supabase
      .from("reading_progress")
      .select("*")
      .eq("user_id", session.user.id);

    if (progress) {
      setCompletedCount(progress.length);

      const todayRecord = progress.find(
        (item: any) => item.reading_date === today
      );

      if (todayRecord) {
        setCompleted(true);
        setReflection(todayRecord.reflection || "");
      }
    }

    setLoading(false);
  }

  async function markCompleted() {
    if (!todayTask || !user) return;

    if (!reflection.trim()) {
      alert("Please write your reflection before submitting.");
      return;
    }

    setSaving(true);

    try {
      const { data: existing } = await supabase
        .from("reading_progress")
        .select("id")
        .eq("user_id", user.id)
        .eq("reading_date", today)
        .maybeSingle();

      if (existing) {
        setCompleted(true);
        alert("You have already submitted today's reading.");
        return;
      }

      const { error } = await supabase
        .from("reading_progress")
        .insert({
          user_id: user.id,
          user_name: user.user_metadata?.full_name || "",
          user_email: user.email,
          reading_date: today,
          task_title: todayTask.title,
          reflection: reflection.trim(),
          completed: true,
        });

      if (error) throw error;

      setCompleted(true);
      setCompletedCount((prev) => prev + 1);
      setReflection("");

      alert("Reading submitted successfully.");
    } catch (error: any) {
      alert(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <AppLayout
      name={user.user_metadata?.full_name || "Participant"}
      email={user.email}
    >
      {/* Hero */}

      <div className="mb-6 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-green-500 p-5 text-white shadow-xl md:mb-10 md:flex-row md:items-center md:justify-between md:p-8">

        <div>
          <p className="text-sm text-white/80">
            Welcome back,
          </p>

          <h1 className="mt-2 text-3xl font-black md:text-5xl">
            {user.user_metadata?.full_name || "Participant"} 👋
          </h1>

          <p className="mt-3 text-sm text-white/90 md:text-base">
            Stay consistent. Small daily progress creates extraordinary results.
          </p>
        </div>

        <div className="rounded-2xl bg-white/20 p-5 text-center backdrop-blur">
          <p className="text-sm text-white/80">
            Today
          </p>

          <h2 className="mt-2 text-lg font-bold md:text-2xl">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>
        </div>

      </div>

      <StatsCards completed={completedCount} />

      <ProgressBar completed={completedCount} />

      {/* Reading Card */}

      <div className="mt-6 rounded-3xl bg-white p-5 shadow-xl md:mt-8 md:p-10">

        <h2 className="text-2xl font-black text-slate-800 md:text-3xl">
          📖 Today's Reading
        </h2>

        <p className="mt-2 text-sm text-slate-500 md:text-base">
          Read today's assignment and share one key lesson you learnt.
        </p>

        {todayTask ? (
          <>
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

              <h3 className="text-xl font-bold md:text-2xl">
                {todayTask.title}
              </h3>

              <p className="mt-2 text-slate-600">
                {todayTask.type}
              </p>

            </div>

            <textarea
              rows={6}
              disabled={completed}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Write one or two key lessons you learnt..."
              className="mt-6 w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-emerald-500"
            />

            {!completed ? (
              <button
                onClick={markCompleted}
                disabled={saving || reflection.trim() === ""}
                className="mt-6 w-full rounded-2xl bg-emerald-600 px-8 py-4 text-lg font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
              >
                {saving ? "Saving..." : "✓ Mark as Completed"}
              </button>
            ) : (
              <div className="mt-6 rounded-2xl bg-green-100 p-4 font-medium text-green-700">
                ✅ You have completed today's reading.
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
            <p className="font-medium text-yellow-700">
              There is no reading scheduled for today.
            </p>
          </div>
        )}

      </div>

    </AppLayout>
  );
}