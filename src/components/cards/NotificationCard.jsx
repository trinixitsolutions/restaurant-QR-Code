export default function NotificationCard({ title }) {
  const users = [
    { name: "Hanuman", email: "email@gmail.com" },
    { name: "Dacchu", email: "email@gmail.com" },
    { name: "Aryan", email: "email@gmail.com" },
    { name: "Sagar", email: "email@gmail.com" },
  ];

  return (
    <div className="bg-white border border-[var(--border-light)] rounded-xl p-6 hover:shadow-sm transition">

      {/* TITLE – BLACK & BOLD */}
      <h3 className="text-sm font-bold text-[var(--text-dark)] mb-4">
        {title}
      </h3>

      <div className="space-y-4">
        {users.map((u, i) => (
          <div key={i} className="flex gap-3">
            <img
              src={`https://i.pravatar.cc/40?img=${i + 10}`}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm">
              <p className="font-medium text-[var(--text-dark)]">{u.name}</p>
              <p className="text-xs text-[var(--text-gray)]">{u.email}</p>
              <p className="text-xs text-[var(--text-gray)] mt-1">
                A concise text message delivered to mobile devices.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
