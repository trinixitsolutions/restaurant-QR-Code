import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BottomNav from "../components/BottomNav";

/* ---------- REUSABLE LIST ITEM ---------- */
function ProfileItem({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 text-sm font-medium active:bg-gray-100 transition"
    >
      <span>{label}</span>
      <FiChevronRight className="text-gray-400" />
    </button>
  );
}

/* ---------- MAIN PROFILE PAGE ---------- */
export default function Profile() {
  const navigate = useNavigate();

  return (
    <PageWrapper className="min-h-screen bg-gray-50 pb-24 font-sans max-w-[430px] mx-auto">

      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="relative h-14 flex items-center justify-center px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 active:scale-95 transition"
          >
            <FiArrowLeft size={22} />
          </button>

          {/* Title */}
          <h1 className="text-base font-semibold">Profile</h1>
        </div>
      </header>

      {/* ===== MENU LIST ===== */}
      <div className="mt-2 divide-y">

        <ProfileItem
          label="Profile View"
          onClick={() => navigate("/profile/view")}
        />

        <ProfileItem
          label="Bill"
          onClick={() => navigate("/bill")}
        />

        <ProfileItem
          label="Order Tracking"
          onClick={() => navigate("/order-tracking")}
        />



        {/* ➕ ADDED */}
        <ProfileItem
          label="Payment"
          onClick={() => navigate("/payment")}
        />

        <ProfileItem
          label="Support"
          onClick={() => navigate("/support")}
        />

      </div>

      {/* ➕ ADDED BOTTOM NAV */}
      <BottomNav />
    </PageWrapper>
  );
}
