import { Bell, Search, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import NotificationPanel from "../ui/NotificationPanel";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ onSearch, onToggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname === "/dashboard";
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickBill, setShowQuickBill] = useState(false);
  const qbContainerRef = useRef(null);

  useEffect(() => {
    if (!showQuickBill) return;
    function onDocClick(e) {
      if (qbContainerRef.current && !qbContainerRef.current.contains(e.target)) {
        setShowQuickBill(false);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [showQuickBill]);

  return (
    <>
      <header className="h-16 bg-white border-b border-[var(--border-light)] flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">

        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-1 hover:bg-gray-100 rounded-lg text-gray-600"
          >
            <Menu size={24} />
          </button>

          {/* Search */}
          <div className="relative w-full max-w-[180px] md:max-w-[400px] md:w-1/2">
            <Search
              size={15}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-gray)]"
            />

            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
              className="
              w-full
              h-9
              pl-10 pr-4
              rounded-full
              bg-[#F3F4F6]
              text-sm
              text-[var(--text-dark)]
              placeholder:text-[var(--text-gray)]
              outline-none
              transition-all
            "
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">
          {isDashboard && (
            <div className="relative" ref={qbContainerRef}>
              <button onClick={() => setShowQuickBill((s) => !s)} className="bg-[var(--primary)] text-white p-2 md:px-4 md:py-1.5 rounded-full text-sm font-medium flex items-center gap-2 group transition-all">
                <span className="hidden md:inline">Quick Bill</span>
                <Icon icon="mdi:flash" width={18} className="md:hidden" />
                <Icon icon="mdi:chevron-down" width={16} className={`transform transition ${showQuickBill ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showQuickBill && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    role="menu"
                    aria-orientation="vertical"
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl ring-1 ring-black/5 z-50 py-2 overflow-hidden border border-gray-100"
                  >
                    <button
                      onClick={() => { setShowQuickBill(false); navigate('/tables', { state: { mode: 'dine' } }); }}
                      className="w-full group/item flex items-center gap-3 text-left px-4 py-3 hover:bg-blue-50 transition-colors relative overflow-hidden"
                    >
                      <div className="p-2 rounded-full bg-gray-50 group-hover/item:bg-blue-100 transition-colors">
                        <Icon icon="mdi:table-chair" width={18} className="text-gray-500 group-hover/item:text-blue-600 transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-700 group-hover/item:text-blue-700">Dine In</span>
                        <span className="text-[10px] text-gray-400 group-hover/item:text-blue-400">Table Service</span>
                      </div>
                    </button>

                    <button
                      onClick={() => { setShowQuickBill(false); navigate('/menu', { state: { mode: 'takeaway' } }); }}
                      className="w-full group/item flex items-center gap-3 text-left px-4 py-3 hover:bg-amber-50 transition-colors relative overflow-hidden"
                    >
                      <div className="p-2 rounded-full bg-gray-50 group-hover/item:bg-amber-100 transition-colors">
                        <Icon icon="mdi:bag-personal" width={18} className="text-gray-500 group-hover/item:text-amber-600 transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-700 group-hover/item:text-amber-700">Take Away</span>
                        <span className="text-[10px] text-gray-400 group-hover/item:text-amber-400">Pack & Go</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <button onClick={() => setShowNotifications(true)}>
            <Bell size={20} className="text-[var(--text-gray)] cursor-pointer" />
          </button>

          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/40"
              alt="admin"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-[var(--text-dark)]">
              Admin
            </span>
          </div>
        </div>
      </header>

      {/* Notification Panel */}
      <NotificationPanel
        open={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}
