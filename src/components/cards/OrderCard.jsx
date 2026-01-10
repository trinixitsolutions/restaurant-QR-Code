import { Check, Clock } from "lucide-react";

export default function OrderCard({ title, items, status, highlight }) {
  const isPending = status === "pending";

  return (
    <div
      className={`
        flex items-center justify-between bg-white
        border rounded-2xl px-5 py-4
        transition-all duration-300 ease-out
        hover:shadow-lg hover:-translate-y-0.5
        ${highlight
          ? "border-blue-500 ring-4 ring-blue-500/10 shadow-md z-10"
          : "border-gray-100 shadow-sm"
        }
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* STATUS ICON */}
        <div className="w-14 h-10 flex items-center justify-center rounded-lg bg-[#edb985f4]">
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            {isPending ? (
              <Clock size={14} className="text-[#DC2626]" strokeWidth={2.5} />
            ) : (
              <Check size={14} className="text-[#16A34A]" strokeWidth={2.5} />
            )}
          </div>
        </div>

        {/* TEXT */}
        <div>
          <p className="text-sm font-semibold text-[var(--text-dark)]">
            {title}
          </p>
          <p className="text-sm text-[var(--text-gray)] leading-snug">
            {items}
          </p>
        </div>
      </div>

      {/* STATUS BADGE */}
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap
          ${isPending
            ? "bg-[#f3976ff4] text-[#DC2626]"
            : "bg-[#f3976ff4] text-[#050505]"
          }
        `}
      >
        {isPending ? "Pending Order" : "Order Confirmed"}
      </span>
    </div>
  );
}
