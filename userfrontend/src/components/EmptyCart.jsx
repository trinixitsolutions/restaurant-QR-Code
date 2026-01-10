import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { motion } from "framer-motion";

export default function EmptyCart() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-6"
            >
                <FiShoppingBag size={40} className="text-orange-500" />
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl font-bold text-gray-900 mb-2"
            >
                Your cart is empty
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 text-sm mb-8 max-w-[260px]"
            >
                Looks like you haven't added any dishes to your cart yet.
            </motion.p>

            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={() => navigate("/menu")}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-orange-200 active:bg-orange-600 transition-colors"
            >
                Browse Menu
            </motion.button>
        </div>
    );
}
