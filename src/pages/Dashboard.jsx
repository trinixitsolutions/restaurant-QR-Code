import { useEffect, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import StatCard from "../components/cards/StatCard";
import OrderCard from "../components/cards/OrderCard";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import CartSummary from "../components/cards/CartSummary";
import NotificationCard from "../components/cards/NotificationCard";
import UpcomingEvents from "../components/cards/UpcomingEvents";

/* ================= COUNT-UP HOOK ================= */
function useCountUp(target, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = Math.max(Math.floor(duration / target), 20);

    const timer = setInterval(() => {
      start += Math.ceil(target / (duration / step));
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      setValue(start);
    }, step);

    return () => clearInterval(timer);
  }, [target, duration]);

  return value;
}

export default function Dashboard() {
  const [filter, setFilter] = useState("all");

  /* ================= ORDER DATA ================= */
  const tableOrders = [
    {
      title: "Table No 01",
      items: "Paneer Tikka, Sprite, Pepsi, Old Monk, Chicken Kabab",
      status: "pending",
    },
    {
      title: "Table No 01",
      items: "Paneer Tikka, Sprite, Pepsi, Old Monk, Chicken Kabab",
      status: "pending",
    },
  ];

  const roomOrders = [
    {
      title: "Room No 10",
      items: "Paneer Tikka, Sprite, Pepsi, Old Monk, Chicken Kabab",
      status: "confirmed",
    },
    {
      title: "Room No 10",
      items: "Paneer Tikka, Sprite, Pepsi, Old Monk, Chicken Kabab",
      status: "confirmed",
    },
  ];

  const applyFilter = (orders) => {
    if (filter === "all") return orders;
    return orders.filter((o) => o.status === filter);
  };

  /* ================= ORDER KPIs ================= */
  const totalOrders = 100;
  const deliveredOrders = 95;
  const pendingOrders = 5;

  const totalCount = useCountUp(totalOrders);
  const deliveredCount = useCountUp(deliveredOrders);
  const pendingCount = useCountUp(pendingOrders);

  return (
    <PageWrapper>
      {/* ================= PAGE TITLE ================= */}
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* ================= ORDER SUMMARY KPIs ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Orders" value={totalCount} />
        <StatCard title="Delivered Orders" value={deliveredCount} />
        <StatCard title="Pending Orders" value={pendingCount} />
      </div>

      {/* ================= FILTER TABS ================= */}
      <div className="flex gap-3 mb-8">
        {[
          { id: "all", label: "All" },
          { id: "confirmed", label: "Confirmed Order" },
          { id: "pending", label: "Pending Order" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${filter === tab.id
                ? "bg-black text-white shadow-md hover:bg-gray-900"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= ORDERS SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* TABLE ORDERS */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
          <div className="flex justify-center mb-6">
            <span className="px-5 py-1.5 border border-gray-100 bg-gray-50 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wide">
              Table Orders
            </span>
          </div>

          <div className="space-y-4">
            {applyFilter(tableOrders).map((order, index) => (
              <OrderCard
                key={index}
                {...order}
                highlight={filter !== "all" && order.status === filter}
              />
            ))}
          </div>

        </div>

        {/* ROOM ORDERS */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full">
          <div className="flex justify-center mb-6">
            <span className="px-5 py-1.5 border border-gray-100 bg-gray-50 rounded-full text-xs font-bold text-gray-500 uppercase tracking-wide">
              Room Orders
            </span>
          </div>

          <div className="space-y-4">
            {applyFilter(roomOrders).map((order, index) => (
              <OrderCard
                key={index}
                {...order}
                highlight={filter !== "all" && order.status === filter}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ================= BUSINESS KPIs ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Monthly Turnover"
          value="45,678.90 Rs"
          sub="+20% month over month"
        />
        <StatCard
          title="Customers"
          value="2,405"
          sub="+33% month over month"
        />
        <StatCard
          title="Expenses"
          value="10,353"
          sub="-8% month over month"
        />
        <StatCard
          title="This Month Turnover"
          value="10,353"
          sub="+8% month"
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <LineChart />
        <BarChart />
      </div>

      {/* ================= CART + EVENTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <CartSummary />
        <UpcomingEvents />
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotificationCard title="Guest Notification" />
        <NotificationCard title="Staff Notification" />
      </div>
    </PageWrapper>
  );
}
