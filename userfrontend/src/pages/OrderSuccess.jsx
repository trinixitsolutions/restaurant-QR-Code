import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PageWrapper from "../components/PageWrapper";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <PageWrapper className="min-h-screen bg-bgLight">

      {/* SUCCESS HEADER */}
      <div className="bg-primary text-white text-center py-10">
        <FiCheckCircle size={56} className="mx-auto mb-3" />
        <h1 className="text-xl font-semibold">
          Order Placed Successfully
        </h1>
        <p className="text-sm mt-1">
          Order ID: {orderId}
        </p>
      </div>

      {/* CONTENT */}
      <div className="px-4 mt-6 space-y-4">

        {/* TABLE & TIME */}
        <div className="bg-white border rounded-xl p-4 flex justify-between">
          <div>
            <p className="text-sm text-textGray">Table</p>
            <p className="font-semibold">Table 12</p>
          </div>
          <div>
            <p className="text-sm text-textGray">Estimated Time</p>
            <p className="font-semibold">25 mins</p>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="bg-white border rounded-xl p-4">
          <p className="font-semibold mb-3">Ordered Items</p>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <button
          onClick={() => navigate("/order-tracking")}
          className="w-full bg-primary text-white py-3 rounded-xl font-medium"
        >
          Track Order
        </button>


      </div>
    </PageWrapper>
  );
}
