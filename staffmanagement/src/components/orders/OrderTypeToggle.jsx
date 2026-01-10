import React from "react";

export default function OrderTypeToggle({ value, onChange }) {
  return (
    <div className="flex gap-3 px-4 mb-2">
      <button
        onClick={() => onChange("table")}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all border ${value === "table"
          ? "bg-white text-black shadow-sm border-gray-100" // Added border for better visibility on gray background
          : "bg-transparent text-gray-500 border-transparent"
          }`}
      >
        Table Order
      </button>
      <button
        onClick={() => onChange("room")}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all border ${value === "room"
          ? "bg-white text-black shadow-sm border-gray-100"
          : "bg-transparent text-gray-500 border-transparent"
          }`}
      >
        Room Order
      </button>
      <button
        onClick={() => onChange("self-service")}
        className={`flex-1 py-3 rounded-full text-sm font-bold transition-all border ${value === "self-service"
          ? "bg-white text-orange-500 shadow-sm border-gray-100"
          : "bg-transparent text-gray-500 border-transparent"
          }`}
      >
        Take Away
      </button>
    </div>
  );
}
