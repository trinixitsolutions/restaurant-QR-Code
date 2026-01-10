export default function UpcomingEvents() {
  const events = [
    { title: "Christmas Day", date: "Dec 25, 2025", color: "bg-red-100" },
    { title: "Christmas Day", date: "Dec 25, 2025", color: "bg-gray-200" },
    { title: "Christmas Day", date: "Dec 25, 2025", color: "bg-orange-100" },
    { title: "Christmas Day", date: "Dec 25, 2025", color: "bg-pink-100" },
  ];

  return (
    <div className="bg-white border border-[var(--border-light)] rounded-xl p-6 hover:shadow-sm transition">

      {/* TITLE – BLACK & BOLD */}
      <h3 className="text-sm font-bold text-[var(--text-dark)] mb-4">
        Upcoming Event
      </h3>

      <div className="space-y-4">
        {events.map((e, i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${e.color}`}>
                📅
              </div>
              <div>
                <p className="font-medium text-sm text-[var(--text-dark)]">
                  {e.title}
                </p>
                <p className="text-xs text-[var(--text-gray)]">
                  {e.date}
                </p>
              </div>
            </div>

            <button className="text-xs bg-gray-100 px-3 py-1 rounded-full">
              Event schedule
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
