import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";

const TABS = ["All", "Confirmed", "Preparing", "Delivered"];

const ORDERS = [
  {
    id: "787899550010",
    date: "30 Dec 2025",
    time: "10:00 pm",
    items: "Curry, Rotti, water bottle, sprite",
    payment: "Online",
    status: "Order Confirmed",
    stage: "Confirmed",
  },
  {
    id: "787899550011",
    date: "30 Dec 2025",
    time: "10:15 pm",
    items: "Fried Rice, Coke",
    payment: "Online",
    status: "Preparing in the Kitchen",
    stage: "Preparing",
  },
  {
    id: "787899548001",
    date: "30 Dec 2025",
    time: "09:00 pm",
    items: "Curry, Rotti, water bottle, sprite",
    payment: "Pending",
    status: "Served the Order",
    stage: "Delivered",
  },
];

export default function OrderTracking() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredOrders =
    activeTab === "All"
      ? ORDERS
      : ORDERS.filter((o) => o.stage === activeTab);

  return (
    <PageWrapper>
      <div className="animate-page px-3 sm:px-6 space-y-6">

        {/* ================= TITLE ================= */}
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Order Tracking
        </h1>

        {/* ================= FILTER TABS ================= */}
        <div className="flex gap-3 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab
                ? "bg-black text-white shadow-md transform scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ================= TABLE CARD ================= */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden">

          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="text-left px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Manifested Date & Time
                </th>
                <th className="text-left px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Items
                </th>
                <th className="text-left px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Payment Mode
                </th>
                <th className="text-left px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order, i) => (
                <tr
                  key={i}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-blue-600 font-medium cursor-pointer">
                    {order.id}
                  </td>

                  <td className="px-6 py-4">
                    <p>{order.date}</p>
                    <p className="text-gray-500 text-xs">
                      {order.time}
                    </p>
                  </td>

                  <td className="px-6 py-4 max-w-xs">
                    {order.items}{" "}
                    <span className="text-blue-600 cursor-pointer">
                      Read More
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {activeTab === "All"
                      ? order.payment
                      : activeTab}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${order.stage === "Confirmed"
                          ? "bg-purple-100 text-purple-700"
                          : order.stage === "Preparing"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No orders found
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
