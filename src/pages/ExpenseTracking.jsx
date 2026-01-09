import { useState, useRef, useEffect } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import { Calendar } from "lucide-react";

export default function ExpenseTracking() {
  const [activeTab, setActiveTab] = useState("add");

  // Date picker state
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRef = useRef(null);
  const dateInputRef = useRef(null);

  // calendar month used by custom picker
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const openPicker = () => {
    const el = dateInputRef.current;
    if (!el) return;
    if (typeof el.showPicker === "function") {
      el.showPicker();
    } else {
      // open our custom calendar fallback
      setCalendarMonth(selectedDate ? new Date(selectedDate) : new Date());
      setShowDatePicker(true);
    }
  };
  useEffect(() => {
    function onDocClick(e) {
      if (!dateRef.current) return;
      if (!dateRef.current.contains(e.target)) {
        setShowDatePicker(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  /* ------------------ Custom Calendar Fallback ------------------ */
  function startOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  function endOfMonth(d) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  }

  function addMonths(d, n) {
    return new Date(d.getFullYear(), d.getMonth() + n, 1);
  }

  function getMonthMatrix(d) {
    const start = startOfMonth(d);
    const end = endOfMonth(d);
    const matrix = [];
    let row = [];

    // Day of week 0 (Sun) - 6 (Sat) ; we want Mo-Su display so adjust
    const firstDayIndex = (start.getDay() + 6) % 7; // Monday = 0

    // pad blanks
    for (let i = 0; i < firstDayIndex; i++) row.push(null);

    for (let day = 1; day <= end.getDate(); day++) {
      row.push(new Date(d.getFullYear(), d.getMonth(), day));
      if (row.length === 7) {
        matrix.push(row);
        row = [];
      }
    }
    if (row.length) {
      while (row.length < 7) row.push(null);
      matrix.push(row);
    }
    return matrix;
  }

  function formatDate(d) {
    if (!d) return "";
    return d.toISOString().slice(0, 10);
  }

  return (
    <PageWrapper>
      <div className="animate-page px-2 sm:px-0 space-y-8">

        {/* ================= TITLE ================= */}
        <h1 className="text-xl sm:text-2xl font-bold text-black">
          Expense Tracking
        </h1>

        {/* ================= TABS ================= */}
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "add"
                ? "bg-black text-white shadow-md transform scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black"
              }`}
          >
            Add New Expense
          </button>

          <button
            onClick={() => setActiveTab("overview")}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "overview"
                ? "bg-black text-white shadow-md transform scale-105"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black"
              }`}
          >
            Overview
          </button>
        </div>

        {/* ================= ADD NEW EXPENSE ================= */}
        {activeTab === "add" && (
          <div className="bg-white rounded-3xl border border-gray-100 p-8 max-w-4xl shadow-lg">

            <h2 className="font-bold text-xl mb-8">
              Add New Expense
            </h2>

            <div className="space-y-6">
              {/* User */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  User
                </label>
                <input
                  placeholder="Name of item"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Description about expense"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                />
              </div>

              {/* Pricing */}
              <div className="max-w-xs space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Pricing
                </label>
                <input
                  type="number"
                  placeholder="100"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button className="px-8 py-2.5 rounded-full border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition-colors">
                Cancel
              </button>

              <button className="px-8 py-2.5 rounded-full bg-black text-white text-sm font-bold shadow-lg hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-300">
                Add Expense
              </button>
            </div>
          </div>
        )}
        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <>
            {/* ===== CHART + SUMMARY ===== */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* Expense Trends */}
              <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">
                    Your Expense Trends
                  </h3>

                  <div className="flex gap-2">
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-black text-white shadow-md">
                      7D
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                      30D
                    </span>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                      90D
                    </span>
                  </div>
                </div>

                {/* Chart */}
                <div className="h-60 rounded-2xl bg-gradient-to-t from-blue-50/50 to-transparent flex items-end gap-4 px-6 pb-4 border border-blue-50/20">
                  {[4200, 5200, 3800, 4600, 2800, 3400, 4300].map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 max-w-[40px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg animate-bar hover:opacity-80 transition-opacity cursor-pointer group relative"
                      style={{ height: `${v / 25}px` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">₹{v}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Summary */}
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="bg-purple-50/80 text-center py-6 px-4">
                  <p className="font-semibold text-purple-900">
                    November’s Expense summary
                  </p>
                  <p className="text-3xl font-bold text-black mt-2">
                    4500.00 Rs
                  </p>
                  <p className="text-xs font-semibold text-purple-600 mt-1 uppercase tracking-wide">
                    Fourty Five Thousand Rupee Only
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors">
                    <p className="text-2xl font-bold text-gray-900">5000</p>
                    <p className="text-xs font-semibold text-gray-500 uppercase mt-1">
                      Average Daily Collection
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors">
                    <p className="text-2xl font-bold text-gray-900">300</p>
                    <p className="text-xs font-semibold text-gray-500 uppercase mt-1">
                      Total Bill Count
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== KPI CARDS ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Last Month Expense
                </p>
                <p className="text-xl font-bold mt-1">
                  4500.00 Rs
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  This Month Expense
                </p>
                <p className="text-xl font-bold mt-1">
                  2,405.00
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500">
                  Today
                </p>
                <p className="text-xl font-bold mt-1">
                  200.00
                </p>
              </div>
            </div>
          </>
        )}

        {/* ================= ALL PAYMENT ================= */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">
              All Payment
            </h2>

            <div className="relative" ref={dateRef}>
              <button
                onClick={() => {
                  const el = dateInputRef.current;
                  if (el && typeof el.showPicker === 'function') {
                    el.showPicker();
                  } else {
                    setShowDatePicker(true);
                  }
                }}
                className="px-4 py-1.5 rounded-full text-sm bg-black text-white flex items-center gap-3 shadow"
              >
                <span className="inline-flex items-center justify-center bg-white rounded p-1">
                  <Calendar size={14} className="text-black" />
                </span>
                <span className="text-sm">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'DATE'}
                </span>
              </button>

              {showDatePicker && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg p-3 shadow z-50 w-[260px]" onClick={(e) => e.stopPropagation()}>

                  {/* Custom calendar header */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">{new Date(calendarMonth).toLocaleString('en-GB', { month: 'long', year: 'numeric' })}</div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCalendarMonth((m) => addMonths(new Date(m), -1))}
                        className="px-2 py-1 rounded bg-gray-100 text-sm"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => setCalendarMonth((m) => addMonths(new Date(m), +1))}
                        className="px-2 py-1 rounded bg-gray-100 text-sm"
                      >
                        ↓
                      </button>
                    </div>
                  </div>

                  {/* Week header */}
                  <div className="grid grid-cols-7 text-xs text-gray-500 mb-2">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <div key={d} className="text-center">{d}</div>)}
                  </div>

                  {/* Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {getMonthMatrix(new Date(calendarMonth)).flat().map((dt, idx) => {
                      const isSelected = dt && formatDate(dt) === selectedDate;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (!dt) return;
                            setSelectedDate(formatDate(dt));
                            setShowDatePicker(false);
                          }}
                          className={`h-9 w-9 flex items-center justify-center text-sm rounded ${dt ? 'hover:bg-gray-100' : ''} ${isSelected ? 'bg-black text-white' : ''}`}
                        >
                          {dt ? dt.getDate() : ''}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between gap-2 mt-3">
                    <button
                      onClick={() => { setSelectedDate(''); setShowDatePicker(false); }}
                      className="px-3 py-1 rounded bg-gray-100 text-sm"
                    >
                      Clear
                    </button>

                    <button
                      onClick={() => { setSelectedDate(formatDate(new Date())); setShowDatePicker(false); }}
                      className="px-3 py-1 rounded bg-black text-white text-sm"
                    >
                      Today
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500">
                <tr>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-wider text-xs">User</th>
                  <th className="text-left px-6 py-4 font-bold uppercase tracking-wider text-xs">Description</th>
                  <th className="text-right px-6 py-4 font-bold uppercase tracking-wider text-xs">Pricing</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                <tr className="bg-blue-50/30">
                  <td colSpan="3" className="px-6 py-2.5 text-center font-bold text-blue-600 text-xs uppercase tracking-wide">
                    30 Dec 2025
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">Dacchu</td>
                  <td className="px-6 py-4 text-gray-600">Brought the 1 Kg Oil</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">130</td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">Praveen</td>
                  <td className="px-6 py-4 text-gray-600">Brought the 5 Kg Atta</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">200</td>
                </tr>

                <tr className="bg-blue-50/30">
                  <td colSpan="3" className="px-6 py-2.5 text-center font-bold text-blue-600 text-xs uppercase tracking-wide">
                    29 Dec 2025
                  </td>
                </tr>

                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">Dacchu</td>
                  <td className="px-6 py-4 text-gray-600">Brought the 5 Kg Sugar</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageWrapper>
  );
}