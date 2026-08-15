type Props = {
  name: string;
  email: string;
};

export default function DashboardHeader({ name, email }: Props) {
  return (
    <header className="bg-emerald-600 text-white shadow">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-6">
        <div>
          <h1 className="text-3xl font-bold">MED+</h1>
          <p>Learn Beyond the Classroom.</p>
        </div>

        <div className="text-right">
          <h2 className="font-bold text-lg">{name}</h2>
          <p className="text-sm">{email}</p>
        </div>
      </div>
    </header>
  );
}