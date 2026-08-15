"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Trophy,
  Shield,
  LogOut,
  X,
} from "lucide-react";

const ADMIN_EMAIL = "cmdaeksuthacademics@gmail.com";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({ open, setOpen }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setEmail(session.user.email || "");
      }
    }

    loadUser();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: Trophy,
    },
  ];

  if (email === ADMIN_EMAIL) {
    links.push({
      name: "Admin",
      href: "/admin",
      icon: Shield,
    });
  }

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-white shadow-xl transition-transform duration-300 md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}

        <div className="flex items-center justify-between border-b p-6">

          <div>
            <h1 className="text-3xl font-black text-emerald-600">
              MED+
            </h1>

            <p className="text-xs text-slate-500">
              Reading Challenge
            </p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 hover:bg-slate-100 md:hidden"
          >
            <X size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-4">

          {links.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-4 rounded-xl px-4 py-3 font-semibold transition ${
                  active
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}

        </nav>

        {/* Logout */}

        <div className="border-t p-4">

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </aside>
    </>
  );
}