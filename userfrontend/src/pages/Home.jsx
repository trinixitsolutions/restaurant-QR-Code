import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BottomNav from "../components/BottomNav";

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="min-h-screen bg-gray-50 pb-16">

      {/* Header */}
      <div className="bg-white px-4 py-4 shadow">
        <h1 className="text-xl font-bold">Welcome 👋</h1>
        <p className="text-sm text-gray-500">
          What would you like to order today?
        </p>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">

        {/* Menu Card */}
        <div
          onClick={() => navigate("/menu")}
          className="bg-green-600 text-white rounded-lg p-6 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">View Menu</h2>
          <p className="text-sm opacity-90">
            Explore delicious food items
          </p>
        </div>

        {/* Cart Card */}
        <div
          onClick={() => navigate("/cart")}
          className="bg-white border rounded-lg p-6 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <p className="text-sm text-gray-500">
            Check items added to cart
          </p>
        </div>

        {/* Support Card */}
        <div
          onClick={() => navigate("/support")}
          className="bg-white border rounded-lg p-6 cursor-pointer"
        >
          <h2 className="text-lg font-semibold">Support</h2>
          <p className="text-sm text-gray-500">
            Need help? Contact us
          </p>
        </div>

      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </PageWrapper>
  );
}
