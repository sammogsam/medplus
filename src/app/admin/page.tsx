"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/layout/AppLayout";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL = "cmdaeksuthacademics@gmail.com";

export default function AdminPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [todayCount, setTodayCount] = useState(0);

  // Automatically gets today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadAdmin();
  }, []);

  async function loadAdmin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    if (session.user.email !== ADMIN_EMAIL) {
      router.push("/dashboard");
      return;
    }

    setUser(session.user);

    const { data, error } = await supabase
      .from("reading_progress")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    if (!data) return;

    setParticipants(data);

    setTodayCount(
      data.filter((item) => item.reading_date === today).length
    );
  }

  const uniqueParticipants = new Set(
    participants.map((p) => p.user_email)
  ).size;

  return (
    <AppLayout
      name="Administrator"
      email={user?.email || ""}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-black">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor the reading challenge.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-emerald-600 p-8 text-white shadow-xl">
          <p>Total Participants</p>
          <h2 className="mt-4 text-5xl font-black">
            {uniqueParticipants}
          </h2>
        </div>

        <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl">
          <p>Completed Today</p>
          <h2 className="mt-4 text-5xl font-black">
            {todayCount}
          </h2>
        </div>

        <div className="rounded-3xl bg-orange-500 p-8 text-white shadow-xl">
          <p>Total Submissions</p>
          <h2 className="mt-4 text-5xl font-black">
            {participants.length}
          </h2>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl">
        <table className="w-full">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 text-left">Participant</th>
              <th className="p-4 text-left">Reading</th>
              <th className="p-4 text-left">Reflection</th>
            </tr>
          </thead>

          <tbody>
            {participants.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-4">
                  <div className="font-semibold">
                    {item.user_name}
                  </div>

                  <div className="text-sm text-slate-500">
                    {item.user_email}
                  </div>
                </td>

                <td className="p-4">
                  {item.task_title}
                </td>

                <td className="max-w-md p-4">
                  {item.reflection}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}