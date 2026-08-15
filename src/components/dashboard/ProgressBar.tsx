type Props = {
  completed: number;
};

export default function ProgressBar({ completed }: Props) {
  const total = 21;
  const progress = Math.round((completed / total) * 100);

  return (
    <div className="mt-6 rounded-3xl bg-white p-5 shadow-xl md:mt-8 md:p-8">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold md:text-2xl">
          Reading Progress
        </h2>

        <span className="text-lg font-bold text-emerald-600 md:text-2xl">
          {progress}%
        </span>

      </div>

      <div className="h-4 overflow-hidden rounded-full bg-slate-200 md:h-5">

        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600 transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <p className="mt-3 text-sm text-slate-500 md:mt-4 md:text-base">
        {completed} of {total} chapters completed
      </p>

    </div>
  );
}