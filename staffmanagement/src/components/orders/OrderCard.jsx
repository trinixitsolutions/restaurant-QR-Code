import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function OrderCard({ order, onClick }) {
  // Determine styles based on status
  const getStatusStyles = (status) => {
    switch (status) {
      case "delivered": // Image 1 - Green
        return {
          bg: "bg-[#6BCB77]",
          icon: <Check className="text-white" size={20} strokeWidth={3} />
        };
      case "ontheway": // Image 3 - Yellow/Orange
        return {
          bg: "bg-[#FFB72B]", // Matching the yellow/orange from image
          icon: <Check className="text-white" size={20} strokeWidth={3} />
        };
      case "ready":
        return {
          bg: "bg-blue-500",
          icon: <img src="/src/assets/images/ready_icon.png" alt="Ready" className="w-5 h-5 object-contain" />
        };
      case "preparing":
        return {
          bg: "bg-orange-500",
          icon: <Check className="text-white" size={20} strokeWidth={3} />
        };
      case "confirm": // Image 2 - Pink/Red
      default:
        return {
          bg: "bg-[#FF9B9B]", // Matching the pink/salmon from image
          icon: <Check className="text-white" size={20} strokeWidth={3} />
        };
    }
  };

  const styles = getStatusStyles(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 flex gap-4 cursor-pointer active:scale-[0.99] transition-transform"
    >
      {/* Status Icon */}
      <div className={`w-[52px] h-[52px] ${styles.bg} rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <div className="w-8 h-8 rounded-full border-2 border-white/90 flex items-center justify-center">
          {styles.icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-bold text-[15px] text-black mb-1 leading-tight">
          {order.room}
        </h3>
        <p className="text-[11px] text-[#4A4A4A] leading-snug line-clamp-2">
          {order.items.map(item =>
            typeof item === 'string' ? item : `${item.name} (${item.qty})`
          ).join(", ")}
        </p>
      </div>

      {/* Meta Info */}
      <div className="flex flex-col justify-end items-end text-[10px] text-gray-500 font-medium min-w-[50px] pb-1">
        <span className="mb-0.5 text-gray-800">{order.staff}</span>
        <span className="text-gray-400">{order.time}</span>
      </div>
    </motion.div>
  );
}
