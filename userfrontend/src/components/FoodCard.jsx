import { useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiClock } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function FoodCard({ food }) {
  const {
    cartItems,
    addToCart,
    increaseQty,
    decreaseQty,
  } = useCart();

  // Check if item already in cart
  const cartItem = cartItems.find(
    (item) => item.id === food.id
  );

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex gap-4 relative overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <img
        src={food.image}
        alt={food.name}
        className="w-20 h-20 rounded-lg object-cover"
      />

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold">
          {food.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {food.description}
        </p>

        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-sm">
            ₹{food.price}
          </span>

          {/* ADD / + - LOGIC */}
          {!cartItem ? (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(food)}
              className="bg-gray-400 text-white text-[10px] font-bold px-6 py-1.5 rounded-full flex items-center hover:bg-gray-500 transition-colors shadow-sm"
            >
              ADD +
            </motion.button>
          ) : (
            <div className="flex items-center gap-2 border border-primary rounded-full px-2 py-1">
              <button
                onClick={() => decreaseQty(food.id)}
                className="text-primary"
              >
                −
              </button>
              <span className="text-sm">
                {cartItem.qty}
              </span>
              <button
                onClick={() => increaseQty(food.id)}
                className="text-primary"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
