import { useState, useRef } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import { Icon } from "@iconify/react";
import { Calendar } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ================= DASHBOARD DATA ================= */

const turnoverData = [
  { day: "14", value: 27000 },
  { day: "15", value: 27500 },
  { day: "16", value: 28000 },
  { day: "17", value: 30000 },
  { day: "18", value: 32000 },
  { day: "19", value: 31000 },
  { day: "20", value: 33000 },
  { day: "21", value: 35000 },
  { day: "22", value: 37000 },
  { day: "23", value: 36500 },
  { day: "24", value: 38500 },
  { day: "25", value: 41000 },
  { day: "26", value: 39500 },
  { day: "27", value: 42500 },
  { day: "28", value: 41500 },
  { day: "29", value: 45000 },
  { day: "30", value: 49000 },
];

const cartData = [
  { name: "Non-Veg", value: 40, color: "#ef4444" },
  { name: "Veg", value: 40, color: "#22c55e" },
  { name: "Drinks", value: 20, color: "#f59e0b" },
];

/* ================= MAIN ================= */

export default function Reports() {
  const [activeReport, setActiveReport] = useState("dashboard");

  return (
    <PageWrapper>
      <div className="space-y-8 animate-page">

        <h1 className="text-2xl font-bold">Report Management</h1>

        {/* ================= ICON TABS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <ReportTab icon="mdi:receipt-text" label="Receipt" active={activeReport === "receipt"} onClick={() => setActiveReport("receipt")} />
          <ReportTab icon="mdi:chart-bar" label="Sale Summary" active={activeReport === "sale"} onClick={() => setActiveReport("sale")} />
          <ReportTab icon="mdi:chart-pie" label="Item wise Report" active={activeReport === "item"} onClick={() => setActiveReport("item")} />
          <ReportTab icon="mdi:chart-line" label="Category Wise Report" active={activeReport === "category"} onClick={() => setActiveReport("category")} />
          <ReportTab icon="mdi:calendar-clock" label="Start Close Day" active={activeReport === "day"} onClick={() => setActiveReport("day")} />
        </div>

        {/* ================= DASHBOARD ================= */}
        {activeReport === "dashboard" && (
          <>
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
              <h2 className="font-bold text-lg mb-6">Monthly Turnover</h2>
              <div className="h-64 min-h-[240px]">
                <ResponsiveContainer width="100%" height="100%" minHeight={180}>

                  <LineChart data={turnoverData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#000', color: '#fff', borderRadius: '8px', border: 'none' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={4} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* ================= CART ================= */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center">
                <h3 className="font-bold text-sm mb-6 w-full text-left">Cart</h3>

                {/* DONUT */}
                <div className="h-64 w-full flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cartData}
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        stroke="none"
                      >
                        {cartData.map((c, i) => (
                          <Cell key={i} fill={c.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-3xl font-bold">100%</span>
                  </div>
                </div>

                {/* LEGEND (FIGMA STYLE) */}
                <div className="flex justify-between text-xs mt-6 w-full px-4">
                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-red-500 mb-2 shadow-sm" />
                    <span className="text-gray-500 mb-1">Non - Veg</span>
                    <span className="font-bold text-gray-900">40 %</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mb-2 shadow-sm" />
                    <span className="text-gray-500 mb-1">Veg</span>
                    <span className="font-bold text-gray-900">40 %</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 mb-2 shadow-sm" />
                    <span className="text-gray-500 mb-1">Drinks</span>
                    <span className="font-bold text-gray-900">20 %</span>
                  </div>
                </div>
              </div>

              {/* ================= KPI GRID ================= */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

                {/* KPI CARD */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 min-h-[140px] shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-3 text-blue-600 mb-4 bg-blue-50 w-fit px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon icon="mdi:currency-inr" width={18} />
                    <p className="text-xs font-bold uppercase tracking-wide">
                      Monthly Turnover
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">45,678.90 Rs</p>
                  <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                    <Icon icon="mdi:trending-up" /> +20% month over month
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 min-h-[140px] shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-3 text-blue-600 mb-4 bg-blue-50 w-fit px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon icon="mdi:chart-line" width={18} />
                    <p className="text-xs font-bold uppercase tracking-wide">
                      This Month Turnover
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">10,353</p>
                  <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                    <Icon icon="mdi:trending-up" /> +8% month
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 min-h-[140px] shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-3 text-blue-600 mb-4 bg-blue-50 w-fit px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon icon="mdi:account-group" width={18} />
                    <p className="text-xs font-bold uppercase tracking-wide">
                      Customers
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">2,405</p>
                  <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                    <Icon icon="mdi:trending-up" /> +33% month over month
                  </p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-6 min-h-[140px] shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <div className="flex items-center gap-3 text-blue-600 mb-4 bg-blue-50 w-fit px-3 py-1.5 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon icon="mdi:shopping" width={18} />
                    <p className="text-xs font-bold uppercase tracking-wide">
                      This Month Orders
                    </p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">10,353</p>
                  <p className="text-xs text-green-500 font-medium mt-2 flex items-center gap-1">
                    <Icon icon="mdi:trending-up" /> +8% month
                  </p>
                </div>

              </div>
            </div>
          </>
        )}

        {/* ================= RECEIPT REPORT ================= */}
        {activeReport === "receipt" && (
          <div className="space-y-6">

            <h2 className="text-xl font-semibold">Receipt</h2>

            {/* ===== DATE FILTER ===== */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex flex-wrap items-end gap-6">
                <DateInput label="FROM" />
                <DateInput label="TO" />

                <button onClick={(e) => {
                  const container = e.currentTarget.closest('.bg-white');
                  const inputs = container ? container.querySelectorAll('input[type="date"]') : [];
                  const values = Array.from(inputs).map(i => i.value);
                  alert(`Fetch: FROM ${values[0] || "(not set)"} TO ${values[1] || "(not set)"}`);
                }} className="h-10 px-8 bg-black text-white rounded-lg text-sm font-medium">
                  FETCH
                </button>
              </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

              <table className="w-full text-sm">
                <thead className="border-b border-gray-200">
                  <tr className="text-left font-medium">
                    <th className="px-6 py-4">Bill No</th>
                    <th className="px-6 py-4">Tax</th>
                    <th className="px-6 py-4">Discount</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Floor</th>
                    <th className="px-6 py-4 text-right">Pricing</th>
                  </tr>
                </thead>

                <tbody>

                  {/* DATE GROUP */}
                  <tr className="bg-blue-50">
                    <td colSpan="6" className="px-6 py-2 text-center font-medium text-gray-700">
                      30 Dec 2025
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-3">00001020</td>
                    <td className="px-6 py-3">20</td>
                    <td className="px-6 py-3">100</td>
                    <td className="px-6 py-3">Card</td>
                    <td className="px-6 py-3">Table</td>
                    <td className="px-6 py-3 text-right">130</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-3">00001019</td>
                    <td className="px-6 py-3">30</td>
                    <td className="px-6 py-3">100</td>
                    <td className="px-6 py-3">UPI</td>
                    <td className="px-6 py-3">1 Floor</td>
                    <td className="px-6 py-3 text-right">200</td>
                  </tr>

                  {/* DATE GROUP */}
                  <tr className="bg-blue-50">
                    <td colSpan="6" className="px-6 py-2 text-center font-medium text-gray-700">
                      29 Dec 2025
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-3">00001018</td>
                    <td className="px-6 py-3">70</td>
                    <td className="px-6 py-3">100</td>
                    <td className="px-6 py-3">Cash</td>
                    <td className="px-6 py-3">Room</td>
                    <td className="px-6 py-3 text-right">300</td>
                  </tr>

                  <tr className="border-t">
                    <td className="px-6 py-3">00001017</td>
                    <td className="px-6 py-3">200</td>
                    <td className="px-6 py-3">100</td>
                    <td className="px-6 py-3">UPI</td>
                    <td className="px-6 py-3">Dine In</td>
                    <td className="px-6 py-3 text-right">2000</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* ================= SALE ================= */}
        {activeReport === "sale" && (
          <div className="space-y-6">

            <h2 className="text-xl font-semibold">Sale Summary</h2>

            {/* Filters */}
            <div className="bg-white border rounded-2xl p-6 flex flex-wrap items-end gap-6">
              <DateInput label="FROM" />
              <DateInput label="TO" />
              <button onClick={(e) => {
                const container = e.currentTarget.closest('.bg-white');
                const inputs = container ? container.querySelectorAll('input[type="date"]') : [];
                const values = Array.from(inputs).map(i => i.value);
                alert(`Search: FROM ${values[0] || "(not set)"} TO ${values[1] || "(not set)"}`);
              }} className="h-10 px-8 bg-black text-white rounded-lg text-sm">
                Search
              </button>
            </div>

            {/* ===== TABLE (UPDATED TO MATCH IMAGE) ===== */}
            <div className="bg-white border rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr className="text-left font-medium">
                    <th className="px-6 py-4">Bill No</th>
                    <th className="px-6 py-4">Order Type</th>
                    <th className="px-6 py-4">Net Sale</th>
                    <th className="px-6 py-4">Gross Sale</th>
                  </tr>
                </thead>

                <tbody>
                  {/* ===== DATE GROUP ===== */}
                  <tr className="bg-blue-50">
                    <td colSpan="4" className="px-6 py-2 text-center font-medium">
                      30 Dec 2025
                    </td>
                  </tr>
                  <SaleRow bill="00001020" type="Mix" net="1000" gross="900" />
                  <SaleRow bill="00001019" type="Meals" net="2000" gross="1800" />
                  <SaleRow bill="00001018" type="Drinks" net="2500" gross="2100" />
                  <SaleRow bill="00001017" type="Combo" net="1000" gross="800" />

                  <tr className="bg-blue-50">
                    <td colSpan="4" className="px-6 py-2 text-center font-medium">
                      29 Dec 2025
                    </td>
                  </tr>
                  <SaleRow bill="00001020" type="Mix" net="1000" gross="900" />
                  <SaleRow bill="00001019" type="Meals" net="2000" gross="1800" />
                  <SaleRow bill="00001018" type="Drinks" net="2500" gross="2100" />
                  <SaleRow bill="00001017" type="Combo" net="1000" gross="800" />

                  <tr className="bg-blue-50">
                    <td colSpan="4" className="px-6 py-2 text-center font-medium">
                      28 Dec 2025
                    </td>
                  </tr>
                  <SaleRow bill="00001020" type="Mix" net="1000" gross="900" />
                  <SaleRow bill="00001019" type="Meals" net="2000" gross="1800" />
                  <SaleRow bill="00001018" type="Drinks" net="2500" gross="2100" />
                  <SaleRow bill="00001017" type="Combo" net="1000" gross="800" />
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= ITEM ================= */}
        {activeReport === "item" && <ItemReport />}

        {/* ================= CATEGORY ================= */}
        {activeReport === "category" && <CategoryReport />}

        {/* ================= DAY ================= */}
        {activeReport === "day" && <DayReport />}

      </div>
    </PageWrapper>
  );
}

/* ================= UI COMPONENTS ================= */

function SaleRow({ bill, type, net, gross }) {
  return (
    <tr className="border-t">
      <td className="px-6 py-3">{bill}</td>
      <td className="px-6 py-3">{type}</td>
      <td className="px-6 py-3">{net}</td>
      <td className="px-6 py-3">{gross}</td>
    </tr>
  );
}

function ReportTab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-3xl border p-6 text-center shadow-sm flex flex-col items-center justify-center gap-3
        transition-all duration-300 ease-out min-h-[140px]
        hover:-translate-y-1 hover:shadow-lg
        ${active
          ? "bg-white border-blue-100 ring-4 ring-blue-50/50 scale-105 shadow-xl z-10"
          : "bg-white border-gray-200 hover:bg-gray-50"}
      `}
    >
      <div className={`p-3 rounded-full ${active ? "bg-blue-50" : "bg-gray-50 group-hover:bg-white"}`}>
        <Icon
          icon={icon}
          width="32"
          className={`transition-colors duration-300 ${active ? "text-blue-600" : "text-gray-400"}`}
        />
      </div>
      <p className={`text-sm font-bold ${active ? "text-gray-900" : "text-gray-500"}`}>{label}</p>
    </button>
  );
}


function KPI({ icon, title, value }) {
  return (
    <div className="bg-white border-2 border-gray-800 rounded-3xl p-6 min-h-[140px]
                animate-card-enter card-hover">

      <div className="flex items-center gap-3 mb-2">
        <Icon icon={icon} width={28} className="text-blue-600" />
        <p className="text-sm text-gray-500">{title}</p>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function DateInput({ label, defaultValue, value, name, onChange }) {
  const inputRef = useRef(null);

  const openPicker = () => {
    const el = inputRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      el.focus();
      el.click();
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>

      <div className="relative group">
        <input
          ref={inputRef}
          type="date"
          defaultValue={defaultValue}
          value={value}
          name={name}
          onChange={(e) => onChange?.(e.target.value)}
          className="
            h-11 w-44 rounded-xl border border-gray-200
            px-4 pr-10 text-sm font-medium
            outline-none
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
            cursor-pointer bg-white transition-all
          "
        />

        {/* Calendar icon — opens picker */}
        <Calendar
          size={18}
          onClick={openPicker}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-gray-400 group-hover:text-black
            cursor-pointer z-10 transition-colors
          "
          role="button"
          aria-label={`Open ${label} date picker`}
        />
      </div>
    </div>
  );
}




/* ================= REPORT SECTIONS (UNCHANGED UI) ================= */

function ReceiptReport() {
  return (
    <ReportLayout title="Receipt">
      <ReportTable
        headers={["Bill No", "Tax", "Discount", "Payment", "Floor", "Pricing"]}
        rows={[
          ["00001020", "20", "100", "Card", "Table", "130"],
          ["00001019", "30", "100", "UPI", "1 Floor", "200"],
        ]}
      />
    </ReportLayout>
  );
}

function SaleReport() {
  return (
    <ReportLayout title="Sale Summary">
      <ReportTable
        headers={["Bill No", "Order Type", "Net Sale", "Gross Sale"]}
        rows={[
          ["00001020", "Mix", "1000", "900"],
          ["00001019", "Meals", "2000", "1800"],
        ]}
      />
    </ReportLayout>
  );
}

function ItemReport() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold">Item wise Report</h2>

      {/* Filters */}
      <div className="bg-white border rounded-xl p-5 flex flex-wrap gap-4 items-end">

        {/* FROM */}
        <DateInput label="FROM" defaultValue="2025-12-21" />

        {/* TO */}
        <DateInput label="TO" defaultValue="2025-12-30" />

        {/* Item Name */}
        <div>
          <label className="text-xs font-medium">Item Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Soup"
              className="border rounded-lg px-3 py-2 pr-10 text-sm w-52"
            />
            <Icon
              icon="mdi:magnify"
              className="absolute right-3 top-2.5 text-gray-400"
            />
          </div>
        </div>

        {/* Search Button */}
        <button className="px-6 py-2 bg-black text-white rounded-lg text-sm">
          Search
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b">
            <tr className="text-left">
              <th className="px-4 py-3">Item Name</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {[
              ["Soup", 40, "30 Dec 2025", 3000],
              ["Soup", 25, "29 Dec 2025", 1500],
              ["Soup", 22, "28 Dec 2025", 2222],
              ["Soup", 42, "27 Dec 2025", 3200],
              ["Soup", 45, "26 Dec 2025", 3500],
              ["Soup", 22, "25 Dec 2025", 1500],
              ["Soup", 48, "24 Dec 2025", 1800],
              ["Soup", 52, "23 Dec 2025", 4500],
              ["Soup", 60, "22 Dec 2025", 5000],
              ["Soup", 55, "21 Dec 2025", 4800],
            ].map((row, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{row[0]}</td>
                <td className="px-4 py-2">{row[1]}</td>
                <td className="px-4 py-2">{row[2]}</td>
                <td className="px-4 py-2 text-right">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}


function CategoryReport() {
  return (
    <div className="space-y-6">

      {/* TITLE */}
      <h2 className="text-xl font-semibold">Category Wise Report</h2>

      {/* FILTER */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex flex-wrap items-end gap-6">
          <DateInput label="FROM" />
          <DateInput label="TO" />

          <button className="h-10 px-8 bg-black text-white rounded-lg text-sm font-medium">
            Search
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

        <table className="w-full text-sm">
          <thead className="border-b border-gray-200">
            <tr className="text-left font-medium">
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Sold Item</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>

            {/* ===== DATE GROUP ===== */}
            <tr className="bg-blue-50">
              <td
                colSpan="3"
                className="px-6 py-2 text-center font-medium text-gray-700"
              >
                30 Dec 2025
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Veg</td>
              <td className="px-6 py-3">20</td>
              <td className="px-6 py-3 text-right">2000</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Non Veg</td>
              <td className="px-6 py-3">50</td>
              <td className="px-6 py-3 text-right">6000</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Starters</td>
              <td className="px-6 py-3">25</td>
              <td className="px-6 py-3 text-right">2000</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Drinks</td>
              <td className="px-6 py-3">10</td>
              <td className="px-6 py-3 text-right">1500</td>
            </tr>

            {/* ===== DATE GROUP ===== */}
            <tr className="bg-blue-50">
              <td
                colSpan="3"
                className="px-6 py-2 text-center font-medium text-gray-700"
              >
                29 Dec 2025
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Veg</td>
              <td className="px-6 py-3">30</td>
              <td className="px-6 py-3 text-right">4500</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Non Veg</td>
              <td className="px-6 py-3">45</td>
              <td className="px-6 py-3 text-right">7000</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Starters</td>
              <td className="px-6 py-3">20</td>
              <td className="px-6 py-3 text-right">2000</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Drinks</td>
              <td className="px-6 py-3">22</td>
              <td className="px-6 py-3 text-right">2800</td>
            </tr>

            {/* ===== DATE GROUP ===== */}
            <tr className="bg-blue-50">
              <td
                colSpan="3"
                className="px-6 py-2 text-center font-medium text-gray-700"
              >
                28 Dec 2025
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Veg</td>
              <td className="px-6 py-3">15</td>
              <td className="px-6 py-3 text-right">1500</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Non Veg</td>
              <td className="px-6 py-3">20</td>
              <td className="px-6 py-3 text-right">2800</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Starters</td>
              <td className="px-6 py-3">10</td>
              <td className="px-6 py-3 text-right">1000</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-3">Drinks</td>
              <td className="px-6 py-3">11</td>
              <td className="px-6 py-3 text-right">2000</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}


function DayReport() {
  return (
    <ReportLayout title="Start / Close Day Report">
      <ReportTable
        headers={["Start Date", "End Date", "Started By", "Closed By", "Opening Bal", "Closing Bal"]}
        rows={[
          ["30 Dec", "30 Dec", "Praveen", "Praveen", "1000", "8000"],
        ]}
      />
    </ReportLayout>
  );
}

function ReportLayout({ title, children }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleFetch = () => {
    // Replace with real API call or parent callback as required
    console.log("Fetch report:", { from, to });
    alert(`Fetch: FROM ${from || "(not set)"} TO ${to || "(not set)"}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="bg-white border rounded-xl p-5 flex gap-4 items-end">
        <DateInput label="FROM" value={from} onChange={setFrom} name="from" />
        <DateInput label="TO" value={to} onChange={setTo} name="to" />
        <button onClick={handleFetch} className="px-6 py-2 bg-black text-white rounded-lg">FETCH</button>
      </div>
      {children}
    </div>
  );
}

function ReportTable({ headers, rows }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-50/50 border-b border-gray-100">
          <tr>{headers.map(h => <th key={h} className="px-6 py-4 text-left font-bold text-gray-500 uppercase tracking-wider text-xs">{h}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              {row.map((cell, j) => <td key={j} className="px-6 py-4 font-medium text-gray-900">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



