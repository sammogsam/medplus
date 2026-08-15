"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Menu } from "lucide-react";

type Props = {
  children: ReactNode;
  name: string;
  email: string;
};

export default function AppLayout({
  children,
  name,
  email,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Mobile Header */}

      <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-5 py-4 shadow md:hidden">

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 hover:bg-slate-100"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-2xl font-black text-emerald-600">
          MED+
        </h1>

        <div className="w-10" />

      </header>

      <div className="flex">

        {/* Desktop Sidebar / Mobile Drawer */}

        <div className="hidden md:block">
  <Sidebar
    open={true}
    setOpen={setOpen}
  />
</div>

<div className="md:hidden">
  <Sidebar
    open={open}
    setOpen={setOpen}
  />
</div>

        {/* Main Content */}

        <main className="min-w-0 flex-1 p-4 md:p-8">

          <Navbar
            name={name}
            email={email}
          />

          {children}

        </main>

      </div>

    </div>
  );
}