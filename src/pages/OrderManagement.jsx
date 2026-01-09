import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import { Icon } from "@iconify/react";

/* ================= DATA ================= */

const NEW_ORDERS = [
  {
    room: "Room No 10",
    items: [
      "Punner Tikka (1)",
      "Sprite (5)",
      "Pepsi (10)",
      "Old Monk (1)",
      "Chicken Kabab (1)",
    ],
  },
  {
    room: "Room No 10",
    items: [
      "Punner Tikka (1)",
      "Sprite (5)",
      "Pepsi (10)",
      "Old Monk (1)",
      "Chicken Kabab (1)",
    ],
  },
];

const TABLE_ORDERS = [
  { status: "Preparing", color: "yellow" },
  { status: "Preparing", color: "yellow" },
  { status: "Delivered", color: "green" },
  { status: "Confirmed", color: "red" },
];

const ROOM_ORDERS = [
  { room: "Room No 10", status: "Delivered", color: "green" },
  { room: "Room No 10", status: "Delivered", color: "green" },
  { room: "Room No 3", status: "Preparing", color: "yellow" },
  { room: "Room No 1", status: "Confirmed", color: "red" },
];

const FILTERS = ["Confirmed", "Preparing", "Delivered"];

/* ================= COMPONENT ================= */

export default function OrderManagement() {
  const [tableFilter, setTableFilter] = useState("Confirmed");
  const [roomFilter, setRoomFilter] = useState("Confirmed");

  // Make orders stateful so we can move orders between lists
  const [newOrders, setNewOrders] = useState(NEW_ORDERS.map((o, i) => ({ id: `n-${i}`, ...o })));
  const [tableOrders, setTableOrders] = useState(TABLE_ORDERS.map((o, i) => ({ id: `t-${i}`, ...o })));
  const [roomOrders, setRoomOrders] = useState(ROOM_ORDERS.map((o, i) => ({ id: `r-${i}`, ...o })));

  const filteredTableOrders = tableOrders.filter((o) => o.status === tableFilter);
  const filteredRoomOrders = roomOrders.filter((o) => o.status === roomFilter);

  // Helper to pick color based on status
  const statusToColor = (status) => {
    if (status === "Confirmed") return "red";
    if (status === "Preparing") return "yellow";
    if (status === "Delivered") return "green";
    return "red";
  };

  const confirmOrder = (index) => {
    const order = newOrders[index];
    if (!order) return;

    // Remove from newOrders
    setNewOrders((prev) => prev.filter((_, i) => i !== index));

    // Add to table orders as Confirmed Order
    const newTableOrder = {
      id: `t-${Date.now()}-${Math.random()}`,
      room: order.room || "Table No",
      items: order.items,
      status: "Confirmed",
      color: statusToColor("Confirmed"),
    };

    setTableOrders((prev) => [newTableOrder, ...prev]);

    // Show confirmed filter so admin sees it immediately
    setTableFilter("Confirmed");
  };

  const advanceStatus = (id, listType = "table") => {
    const source = listType === "room" ? roomOrders : tableOrders;
    const setter = listType === "room" ? setRoomOrders : setTableOrders;

    setter((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const nextStatus =
          o.status === "Confirmed"
            ? "Preparing"
            : o.status === "Preparing"
              ? "Delivered"
              : "Delivered";
        return { ...o, status: nextStatus, color: statusToColor(nextStatus) };
      })
    );
  };

  return (
    <PageWrapper>
      <div className="animate-page px-6 pt-3 pb-8 bg-white min-h-screen space-y-10">

        {/* ================= TITLE ================= */}
        <h1 className="text-2xl font-bold">Order Management</h1>

        {/* ================= NEW ORDERS ================= */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newOrders.map((order, i) => (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-3xl p-6
                           shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <Icon
                      icon="mdi:bell-ring"
                      width={28}
                      className="text-red-500"
                    />
                  </div>

                  <div>
                    <p className="font-bold text-gray-900">{order.room}</p>
                    <ul className="text-sm text-gray-600 mt-1 space-y-0.5">
                      {order.items.map((it, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button onClick={() => confirmOrder(i)} className="mt-6 w-full bg-black hover:bg-gray-800
                                   text-white py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                  Confirm Order
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TABLE & ROOM ORDERS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_40px_1fr] gap-10">

          {/* ================= TABLE ORDERS ================= */}
          <div>
            <SectionHeader
              title="Table Orders"
              active={tableFilter}
              onChange={setTableFilter}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredTableOrders.map((o, i) => (
                <OrderCard
                  key={o.id}
                  title={o.room ?? `Table ${i + 1}`}
                  status={o.status}
                  color={o.color}
                  onStatusClick={() => advanceStatus(o.id, "table")}
                />
              ))}
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:flex justify-center">
            <div className="border-l border-dashed h-full" />
          </div>

          {/* ================= ROOM ORDERS ================= */}
          <div>
            <SectionHeader
              title="Room Orders"
              active={roomFilter}
              onChange={setRoomFilter}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredRoomOrders.map((o, i) => (
                <OrderCard
                  key={o.id}
                  title={o.room}
                  status={o.status}
                  color={o.color}
                  onStatusClick={() => advanceStatus(o.id, "room")}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function SectionHeader({ title, active, onChange }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <span className="px-6 py-2 border border-gray-100 bg-white shadow-sm rounded-full font-bold text-gray-900 mb-6">
        {title}
      </span>

      <div className="flex gap-2 p-1 bg-gray-100/50 rounded-full">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
              ${active === f
                ? "bg-black text-white shadow-lg transform scale-105"
                : "text-gray-500 hover:text-black hover:bg-white/50"
              }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

function OrderCard({ title, status, color, onStatusClick }) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-3xl p-6
                 shadow-sm hover:shadow-xl transition-all duration-300
                 aspect-square flex flex-col justify-between text-center group"
    >
      {/* TOP CONTENT */}
      <div>
        {/* ICON */}
        <div
          className={`w-14 h-14 mx-auto rounded-2xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110
            ${color === "green"
              ? "bg-green-50"
              : color === "yellow"
                ? "bg-yellow-50"
                : "bg-red-50"
            }`}
        >
          <Icon
            icon={
              color === "green"
                ? "mdi:check-circle-outline"
                : color === "yellow"
                  ? "mdi:chef-hat"
                  : "mdi:bell-ring"
            }
            width={32}
            className={
              color === "green"
                ? "text-green-600"
                : color === "yellow"
                  ? "text-yellow-600"
                  : "text-red-500"
            }
          />
        </div>

        {/* TITLE */}
        <p className="font-bold text-lg text-gray-900">{title}</p>

        {/* ITEMS */}
        <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-2">
          Punner Tikka, Sprite, Pepsi, Old Monk, Chicken Kabab
        </p>

        {/* USER + TIME */}
        <div className="flex justify-center gap-4 text-xs font-semibold text-gray-400 mt-3 uppercase tracking-wide">
          <span>Praveen</span>
          <span>•</span>
          <span>12:00 pm</span>
        </div>
      </div>

      {/* STATUS BUTTON (BOTTOM FIXED) */}
      <button
        onClick={onStatusClick}
        className={`w-full py-3 rounded-2xl text-sm font-bold cursor-pointer shadow-md hover:shadow-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all
          ${color === "green"
            ? "bg-green-500 border-green-700 text-white hover:bg-green-600"
            : color === "yellow"
              ? "bg-yellow-400 border-yellow-600 text-yellow-900 hover:bg-yellow-500"
              : "bg-red-500 border-red-700 text-white hover:bg-red-600"
          }`}
      >
        {status}
      </button>
    </div>
  );
}
