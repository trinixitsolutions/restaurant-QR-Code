import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../../components/PageWrapper";
import OrderCard from "../../components/orders/OrderCard";
import PendingOrderCard from "../../components/orders/PendingOrderCard";
import OrderTypeToggle from "../../components/orders/OrderTypeToggle";
import OrderStatusTabs from "../../components/orders/OrderStatusTabs";
import OrderActionModal from "../../components/orders/OrderActionModal";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search } from "lucide-react";
import toast from "react-hot-toast";
import { useOrders } from "../../context/OrderContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function OrderManagement() {
  const navigate = useNavigate();
  // Active tab for the bottom section (History/Processing)
  const [activeStatus, setActiveStatus] = useState("confirm");

  // Order type toggle
  const [orderType, setOrderType] = useState("table");

  // Global Data
  const { orders, updateOrderStatus } = useOrders();

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Search state
  const [search, setSearch] = useState("");

  // 1. Separate Pending Orders (Always visible at top) - Filtered by Type & Search
  const pendingOrders = orders.filter(o =>
    o.status === 'pending' &&
    o.type === orderType &&
    (o.room.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search))
  );

  // 2. Filter other orders based on active tab AND active type & Search
  const visibleOrders = orders.filter((o) =>
    o.status === activeStatus &&
    o.status !== 'pending' &&
    o.type === orderType &&
    (o.room.toLowerCase().includes(search.toLowerCase()) || o.id.toString().includes(search))
  );

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    setActiveStatus(newStatus);
    toast.success(`Order #${orderId} moved to ${newStatus}`);
  };

  const handleConfirmOrder = (order) => {
    updateOrderStatus(order.id, 'confirm');
    setActiveStatus('confirm');
    toast.success(`Order #${order.id} confirmed & KOT Printed`);
  };

  return (
    <PageWrapper className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 px-4 py-3 border-b border-gray-100 shadow-sm mb-4">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ChevronLeft size={28} className="text-black" strokeWidth={1.5} />
          </button>
          <h1 className="text-lg font-bold text-black">Order Management</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Table or Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/5 transition-all"
          />
        </div>
      </div>

      <div className="px-4 pb-20 space-y-6">
        {/* SECTION 1: Pending Orders Container (The "Main Box") */}
        {pendingOrders.length > 0 && (
          <div className="bg-white rounded-[24px] shadow-sm p-5 border border-gray-100">
            {pendingOrders.map((order) => (
              <PendingOrderCard
                key={order.id}
                order={order}
                onConfirm={handleConfirmOrder}
              />
            ))}
          </div>
        )}

        {/* Toggle & Filters Group */}
        <div className="space-y-4">
          <OrderTypeToggle value={orderType} onChange={setOrderType} />

          <OrderStatusTabs
            value={activeStatus}
            onChange={setActiveStatus}
          />
        </div>

        {/* SECTION 2: Filtered Order List */}
        {/* SECTION 2: Filtered Order List */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStatus} // Force remount on tab change to prevent stale data
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            layout // Enable layout animations
          >
            {visibleOrders.map((order) => (
              <motion.div
                key={order.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <OrderCard
                  order={order}
                  onClick={() => handleOrderClick(order)}
                />
              </motion.div>
            ))}

            {visibleOrders.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 text-gray-400"
              >
                No {activeStatus} orders
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Modal */}
      <OrderActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </PageWrapper>
  );
}
