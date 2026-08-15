type Props = {
  completed: number;
};

export default function StatsCards({ completed }: Props) {
  const total = 21;
  const remaining = total - completed;
  const progress = Math.round((completed / total) * 100);

  const cards = [
    {
      title: "Completed",
      value: completed,
      color: "bg-emerald-600",
    },
    {
      title: "Remaining",
      value: remaining,
      color: "bg-blue-600",
    },
    {
      title: "Progress",
      value: `${progress}%`,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-3xl p-5 md:p-8 text-white shadow-xl transition hover:-translate-y-1`}
        >
          <p className="text-sm text-white/80 md:text-base">
            {card.title}
          </p>

          <h2 className="mt-3 text-3xl font-black md:mt-4 md:text-5xl">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}