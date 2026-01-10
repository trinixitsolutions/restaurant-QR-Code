import React, { useState } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../../components/PageWrapper";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";

export default function TableRoomSelect() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "Ground floor");
  const { orders } = useOrders();

  const tabs = ["Ground floor", "F-1 Room", "AC Rooms"];

  // Dynamic Content Generator
  const getItems = () => {
    switch (activeTab) {
      case "F-1 Room":
        return Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          label: `Room No F-${i + 1}`,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500",
        }));
      case "AC Rooms":
        return Array.from({ length: 8 }, (_, i) => ({
          id: i + 1,
          label: `AC Room No T-${i + 1}`,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500",
        }));
      case "Ground floor":
      default:
        return Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          label: `Table No T-${i + 1}`,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500",
        }));
    }
  };

  const activeItems = getItems();

  return (
    <PageWrapper className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-gray-100 shadow-sm mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ChevronLeft size={28} className="text-black" strokeWidth={1.5} />
          </button>
          <h1 className="text-lg font-bold text-black">Table / Room</h1>
        </div>

        {/* Quick Bill Button */}
        <button
          onClick={() => navigate('/staff/quick-bill')}
          className="bg-[#1C1C1E] text-white text-xs font-medium px-4 py-2 rounded-full"
        >
          Quick Bill
        </button>
      </div>

      <div className="px-4 pb-20">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab
                ? "bg-[#1C1C1E] text-white shadow-md"
                : "bg-[#F2F4F7] text-[#1C1C1E]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
          {activeItems.map((item) => {
            // Find if there is an active order for this table/room
            // We match broadly on string inclusion for now, e.g. "Table No 5"
            const activeOrder = orders.find(o =>
              o.room.toLowerCase().includes(item.label.toLowerCase()) &&
              o.status !== 'delivered' &&
              o.status !== 'completed' // Assuming 'completed' might exist later, currently 'delivered' is somewhat final but usually 'paid' clears it
            );

            // Determine status color
            // If pending -> Red border
            // If confirmed/ontheway -> Green/Blue border or similar
            let statusClass = "border-transparent";
            if (activeOrder) {
              if (activeOrder.status === 'pending') statusClass = "border-red-500 border-2";
              else statusClass = "border-green-500 border-2";
            }

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center cursor-pointer active:opacity-80 transition-opacity"
                onClick={() => navigate('/staff/menu', { state: { room: item.label, type: activeTab.includes('Room') ? 'room' : 'table' } })}
              >
                {/* Image Card */}
                <div className={`w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-2 bg-gray-200 relative ${statusClass}`}>
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover"
                  />
                  {activeOrder && (
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-bold text-white ${activeOrder.status === 'pending' ? 'bg-red-500' : 'bg-green-500'}`}>
                      {activeOrder.status === 'pending' ? 'New' : 'Occupied'}
                    </div>
                  )}
                </div>
                {/* Label */}
                <span className="text-sm font-semibold text-black">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}
