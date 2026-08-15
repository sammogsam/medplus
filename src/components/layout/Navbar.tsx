"use client";

type Props = {
  name: string;
  email: string;
};

export default function Navbar({ name, email }: Props) {
  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow md:mb-8 md:p-5">

      {/* Welcome */}

      <div className="min-w-0">

        <h2 className="text-xl font-bold text-slate-800 md:text-3xl">
          Welcome back 👋
        </h2>

        <p className="mt-1 text-sm text-slate-500 md:text-base truncate">
          Stay consistent. One chapter at a time.
        </p>

      </div>

      {/* User */}

      <div className="ml-4 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-base font-bold text-white md:h-12 md:w-12">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="hidden md:block">
          <h3 className="font-semibold text-slate-800">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            {email}
          </p>
        </div>

      </div>

    </header>
  );
}