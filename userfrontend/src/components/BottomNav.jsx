import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-orange-500"
      : "text-gray-400";

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t flex justify-around items-center py-3 z-50">

      {/* HOME */}
      <button
        onClick={() => navigate("/dashboard")}
        className={`flex flex-col items-center ${isActive("/dashboard")}`}
      >
        <img
          src="/icons/home.png"
          alt="Home"
          className="w-[22px] h-[22px] opacity-90"
        />
      </button>

      {/* CART */}
      <button
        onClick={() => navigate("/cart")}
        className={`flex flex-col items-center ${isActive("/cart")}`}
      >
        <img
          src="/icons/cart.png"
          alt="Cart"
          className="w-[22px] h-[22px] opacity-90"
        />
      </button>

      {/* PROFILE */}
      <button
        onClick={() => navigate("/profile")}
        className={`flex flex-col items-center ${isActive("/profile")}`}
      >
        <img
          src="/icons/profile.png"
          alt="Profile"
          className="w-[22px] h-[22px] opacity-90"
        />
      </button>

    </div>
  );
}
