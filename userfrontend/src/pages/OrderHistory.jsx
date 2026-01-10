import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

const orders = [
  {
    id: "ORD-1001",
    date: "24 Sep 2025",
    items: 3,
    total: 420,
    status: "Preparing",
  },
  {
    id: "ORD-1002",
    date: "23 Sep 2025",
    items: 2,
    total: 260,
    status: "Served",
  },
  {
    id: "ORD-1003",
    date: "22 Sep 2025",
    items: 5,
    total: 780,
    status: "Served",
  },
];

export default function OrderHistory() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="min-h-screen bg-[#F5F7FB] flex justify-center">
      <div className="w-full max-w-[430px] px-4 py-6">

        {/* HEADER */}
        <h1 className="text-lg font-semibold mb-4">
          My Orders
        </h1>

        {/* ORDER LIST */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {orders.map((order) => (
            <motion.div
              key={order.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                navigate("/order-tracking", {
                  state: { orderId: order.id },
                })
              }
              className="bg-white rounded-xl p-4 shadow-sm cursor-pointer active:scale-[0.98] transition"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">
                  {order.id}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${order.status === "Served"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {order.date} · {order.items} items
              </p>

              <p className="mt-2 font-semibold">
                ₹{order.total}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </PageWrapper >
  );
}
