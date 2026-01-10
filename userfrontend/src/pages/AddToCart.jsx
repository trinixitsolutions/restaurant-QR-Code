import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function AddToCart() {
  const navigate = useNavigate();

  // Dummy cart item (UI only – backend later)
  const [quantity, setQuantity] = useState(1);

  const price = 220;
  const total = price * quantity;

  return (
    <PageWrapper className="min-h-screen bg-white pb-16">

      {/* Header */}
      <div className="px-4 py-4 border-b">
        <h1 className="text-xl font-bold">Your Cart</h1>
      </div>

      {/* Cart Item */}
      <div className="flex items-center px-4 py-4 border-b">
        <img
          src="https://via.placeholder.com/80"
          alt="Food"
          className="w-20 h-20 rounded object-cover"
        />

        <div className="ml-4 flex-1">
          <h2 className="font-semibold text-lg">
            Paneer Butter Masala
          </h2>
          <p className="text-gray-500">₹{price}</p>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 border rounded text-lg"
          >
            −
          </button>

          <span className="font-semibold">{quantity}</span>

          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 border rounded text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Summary */}
      <div className="px-4 py-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Item Total</span>
          <span>₹{total}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>₹20</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Grand Total</span>
          <span>₹{total + 20}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="px-4 mt-6">
        <button
          onClick={() => navigate("/order-confirmation")}
          className="w-full bg-green-600 text-white py-3 rounded font-semibold"
        >
          Place Order
        </button>
      </div>

      <BottomNav />
    </PageWrapper>
  );
}
