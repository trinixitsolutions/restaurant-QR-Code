import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChefHat, Bike, CheckCircle } from "lucide-react";

export default function OrderActionModal({ isOpen, onClose, order, onUpdateStatus }) {
    if (!isOpen || !order) return null;

    const getNextStatusOptions = () => {
        switch (order.status) {
            case "confirm":
                return [
                    {
                        id: "preparing",
                        label: "Move to Preparing",
                        icon: <ChefHat size={20} />,
                        color: "bg-orange-500 text-white",
                    },
                ];
            case "preparing":
                return [
                    {
                        id: "delivered",
                        label: "Move to Delivered",
                        icon: <CheckCircle size={20} />,
                        color: "bg-green-500",
                    },
                ];
            case "delivered":
                return [];
            default:
                return [];
        }
    };

    const options = getNextStatusOptions();

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-[420px] bg-white rounded-[24px] p-6 shadow-xl"
                    >

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Update Status</h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    Order #{order.id} • {order.room}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            {options.length > 0 ? (
                                options.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => {
                                            onUpdateStatus(order.id, option.id);
                                            onClose();
                                        }}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl text-white font-semibold shadow-md active:scale-[0.98] transition-all ${option.color}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {option.icon}
                                            <span>{option.label}</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                                            <CheckCircle size={14} className="text-white" />
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-sm">No actions available</p>
                                </div>
                            )}
                        </div>

                        {/* View Details Button (Secondary) */}
                        <button
                            onClick={() => {
                                // Optional: Navigate to details if needed, but primary interaction is status update
                                onClose();
                            }}
                            className="w-full mt-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Cancel
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
