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

    const { data } = await supabase
      .from("reading_progress")
      .select("*");

    if (!data) {
      setLoading(false);
      return;
    }

    const grouped = Object.values(
      data.reduce((acc: any, item: any) => {
        if (!acc[item.user_email]) {
          acc[item.user_email] = {
            name: item.user_name,
            email: item.user_email,
            completed: 0,
          };
        }

        acc[item.user_email].completed++;

        return acc;
      }, {})
    );

    grouped.sort((a: any, b: any) => b.completed - a.completed);

    setLeaders(grouped);

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
            key={person.email}
            className={`flex items-center justify-between rounded-3xl p-6 shadow-lg transition hover:scale-[1.01]
            ${
              index === 0
                ? "bg-yellow-50 border-2 border-yellow-300"
                : index === 1
                ? "bg-gray-50 border-2 border-gray-300"
                : index === 2
                ? "bg-orange-50 border-2 border-orange-300"
                : "bg-white"
            }`}
          >

            <div className="flex items-center gap-5">

              {badge(index)}

              <div>

                <h2 className="text-xl font-bold">
                  {person.name}
                </h2>

                <p className="text-slate-500">
                  {person.email}
                </p>

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