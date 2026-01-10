import React from "react";

export default function OrderStatusTabs({ value, onChange }) {
  const tabs = [
    { id: "confirm", label: "Confirm Order" },
    { id: "preparing", label: "Preparing" },
    { id: "delivered", label: "Delivered" },
  ];

  const getActiveStyle = (id) => {
    switch (id) {
      case "confirm":
        return "bg-[#FF9B9B] text-black border-transparent shadow-sm";
      case "preparing":
        return "bg-orange-500 text-white border-transparent shadow-sm";
      case "delivered":
        return "bg-[#6BCB77] text-white border-transparent shadow-sm";
      default:
        return "bg-gray-100 text-gray-500 border-transparent";
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-4 pt-2 scrollbar-hide px-4">
      {tabs.map((tab) => {
        const isActive = value === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-5 py-2.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all border ${isActive
              ? getActiveStyle(tab.id)
              : "bg-white text-gray-500 border-transparent hover:bg-gray-50"
              }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
