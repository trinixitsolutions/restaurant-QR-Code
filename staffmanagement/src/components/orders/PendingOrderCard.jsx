import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PendingOrderCard({ order, onConfirm }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.08)" }}
            className="bg-white/50 rounded-xl p-4 mb-4 last:mb-0 border border-gray-100"
        >
            {/* Header: Icon + Room Name */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#FF9B9B] flex items-center justify-center flex-shrink-0">
                    <div className="w-5 h-5 rounded-full border-[1.5px] border-white flex items-center justify-center">
                        <Check className="text-white" size={12} strokeWidth={3} />
                    </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                    {order.room}
                </h3>
            </div>

            {/* Items List */}
            <div className="mb-4 pl-1">
                <div className="space-y-1">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="text-[13px] font-semibold text-gray-800">
                            {/* Handle both string items and objects with quantity */}
                            {typeof item === 'string' ? item : `${item.name} (${item.qty})`}
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Button */}
            <button
                onClick={() => onConfirm(order)}
                className="w-full bg-[#FF9B9B] hover:bg-[#ff8585] text-black font-semibold py-3.5 rounded-xl transition-colors text-sm shadow-sm"
            >
                Confirm Order & Print KOT
            </button>
        </motion.div>
    );
}
