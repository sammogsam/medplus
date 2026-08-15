"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/lib/supabase";
import { Trophy, Medal, Award } from "lucide-react";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) return;

    setUser(session.user);

    // Fetch all registered participants
    const { data: participants, error: participantsError } =
      await supabase
        .from("participants")
        .select("*")
        .order("created_at", { ascending: true });

    if (participantsError) {
      console.error(participantsError);
      setLoading(false);
      return;
    }

    // Fetch all completed readings
    const { data: progress } = await supabase
      .from("reading_progress")
      .select("user_id");

    // Count completions per participant
    const completionMap: Record<string, number> = {};

    progress?.forEach((item: any) => {
      completionMap[item.user_id] =
        (completionMap[item.user_id] || 0) + 1;
    });

    // Merge participants with completion count
    const leaderboard = participants.map((participant: any, index: number) => ({
      ...participant,
      completed: completionMap[participant.id] || 0,
      registrationOrder: index,
    }));

    // Sort by completed desc, then registration order
    leaderboard.sort((a: any, b: any) => {
      if (b.completed !== a.completed) {
        return b.completed - a.completed;
      }

      return a.registrationOrder - b.registrationOrder;
    });

    setLeaders(leaderboard);
    setLoading(false);
  }

  function badge(index: number) {
    if (index === 0)
      return <Trophy className="text-yellow-500" size={28} />;

    if (index === 1)
      return <Medal className="text-gray-400" size={28} />;

    if (index === 2)
      return <Award className="text-orange-500" size={28} />;

    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 font-bold">
        {index + 1}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <AppLayout
      name={user?.user_metadata?.full_name || "Participant"}
      email={user?.email || ""}
    >
      <div className="mb-10">
        <h1 className="text-4xl font-black">
          🏆 Leaderboard
        </h1>

        <p className="mt-2 text-slate-500">
          Participants ranked by completed readings.
        </p>
      </div>

      <div className="space-y-5">
        {leaders.map((person: any, index: number) => (
          <div
            key={person.id}
            className={`flex items-center justify-between rounded-3xl p-6 shadow-lg transition hover:scale-[1.01]
            ${
              index === 0
                ? "border-2 border-yellow-300 bg-yellow-50"
                : index === 1
                ? "border-2 border-gray-300 bg-gray-50"
                : index === 2
                ? "border-2 border-orange-300 bg-orange-50"
                : "bg-white"
            }`}
          >
            <div className="flex items-center gap-5">
              {badge(index)}

              <div>
                <h2 className="text-xl font-bold">
                  {person.full_name}
                </h2>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <h2 className="text-3xl font-black text-emerald-600">
                {person.completed}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}