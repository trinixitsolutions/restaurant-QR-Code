import { FiArrowLeft } from "react-icons/fi";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import BottomNav from "../components/BottomNav"; // ✅ ADDED

export default function Bill() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );
  const tax = +(subtotal * 0.05).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <PageWrapper className="min-h-screen bg-[#F5F7FB] max-w-[430px] mx-auto pb-24">
      {/* HEADER */}
      <div className="h-14 bg-white flex items-center justify-center relative border-b">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 text-gray-700"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-base font-semibold">Bill</h1>
      </div>

      {/* ITEMS */}
      <div className="px-4 mt-4 space-y-3">
        {cartItems.length === 0 && (
          <p className="text-sm text-gray-500 text-center mt-10">
            No items in cart
          </p>
        )}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-3 flex justify-between shadow-sm"
          >
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-500">
                Qty: {item.qty}
              </p>
            </div>
            <p className="text-sm font-semibold">
              ₹{item.price * item.qty}
            </p>
          </div>
        ))}
      </div>

      {/* SUMMARY */}
      {cartItems.length > 0 && (
        <div className="px-4 mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax (5%)</span>
            <span>₹{tax}</span>
          </div>

          <div className="flex justify-between text-base font-semibold border-t pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      )}

      {/* ================= BOTTOM NAV ================= */}
      <BottomNav /> {/* ✅ ADDED */}

    </PageWrapper>
  );
}
