import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import { Plus, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Tables() {
  const [activeTab, setActiveTab] = useState("table");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ✅ THIS WAS MISSING
  const navigate = useNavigate();
  const { setTable } = useCart();

  const [tables, setTables] = useState([
    { id: 1, name: "Table No T-01", status: "free" },
    { id: 2, name: "Table No T-02", status: "occupied" },
    { id: 3, name: "Table No T-03", status: "tender" },
  ]);

  const [rooms, setRooms] = useState([
    { id: 1, name: "Room No R-01", status: "free" },
  ]);

  const [inputName, setInputName] = useState("");

  /* ================= SELECT TABLE / ROOM ================= */

  const handleSelect = (item) => {
    // ALLOW SELECTION FOR ALL STATUSES (free, occupied, tender)
    setTable(item.name);
    navigate("/menu");
  };

  /* ================= ADD / EDIT ================= */

  const openAddModal = () => {
    setEditItem(null);
    setInputName("");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setInputName(item.name);
    setShowModal(true);
  };

  const saveItem = () => {
    if (!inputName.trim()) return;

    const setter = activeTab === "table" ? setTables : setRooms;

    if (editItem) {
      setter((prev) =>
        prev.map((i) =>
          i.id === editItem.id ? { ...i, name: inputName } : i
        )
      );
    } else {
      setter((prev) => [
        ...prev,
        { id: Date.now(), name: inputName, status: "free" },
      ]);
    }

    setShowModal(false);
  };

  const deleteItem = () => {
    if (!editItem) return;
    if (!window.confirm("Are you sure you want to delete this?")) return;
    const setter = activeTab === "table" ? setTables : setRooms;
    setter((prev) => prev.filter((i) => i.id !== editItem.id));
    setShowModal(false);
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleStatus = (id) => {
    const setter = activeTab === "table" ? setTables : setRooms;

    setter((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;

        // Cycle: free -> occupied -> tender -> free
        let nextStatus = "free";
        if (i.status === "free") nextStatus = "occupied";
        else if (i.status === "occupied") nextStatus = "tender";
        else nextStatus = "free";

        return { ...i, status: nextStatus };
      })
    );
  };

  const list = activeTab === "table" ? tables : rooms;

  return (
    <PageWrapper>
      <div className="animate-page space-y-6">

        <h1 className="text-2xl font-bold">Tables</h1>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {["table", "room"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab
                ? "bg-black text-white shadow-lg transform scale-105"
                : "bg-white text-gray-500 border border-gray-100 hover:text-black hover:bg-gray-50 sidebar-tab"
                }`}
            >
              {tab === "table" ? "Tables" : "Rooms"}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className={`
                bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 group
                ${item.status === "free"
                  ? "cursor-pointer hover:shadow-xl hover:-translate-y-1"
                  : "cursor-pointer hover:shadow-xl hover:-translate-y-1 border-opacity-60"
                /* removed grayscale and not-allowed to indicate selectability */
                }
              `}
            >
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                className="h-32 w-full object-cover"
              />

              <div className="p-4 flex justify-between items-center">
                <p className="font-medium">{item.name}</p>

                <div className="flex items-center gap-3">
                  {/* Toggle Status */}
                  <span
                    onClick={(e) => {
                      e.stopPropagation(); // 🛑 IMPORTANT
                      toggleStatus(item.id);
                    }}
                    className={`w-3 h-3 rounded-full cursor-pointer ${item.status === "free"
                      ? "bg-green-500 ring-4 ring-green-100"
                      : item.status === "tender"
                        ? "bg-yellow-500 ring-4 ring-yellow-100"
                        : "bg-red-500 ring-4 ring-red-100"
                      }`}
                  />

                  {/* Edit */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // 🛑 IMPORTANT
                      openEditModal(item);
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <div className="flex justify-end">
          <button
            onClick={openAddModal}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            Add New {activeTab === "table" ? "Table" : "Room"}
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-[90%] max-w-md rounded-3xl shadow-2xl p-6 animate-scaleIn">
            <h2 className="text-xl font-bold mb-4">
              {editItem ? "Edit Name" : `Add New ${activeTab === "table" ? "Table" : "Room"}`}
            </h2>

            <input
              autoFocus
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all mb-6"
              placeholder={activeTab === "table" ? "e.g. Table T-05" : "e.g. Room R-102"}
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveItem()}
            />

            <div className="flex gap-3 justify-end items-center">
              {editItem && (
                <button
                  onClick={deleteItem}
                  className="px-4 py-2.5 rounded-full text-sm font-bold text-red-500 hover:bg-red-50 transition-colors mr-auto"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-500 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveItem}
                disabled={!inputName.trim()}
                className="bg-black text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-gray-900 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
