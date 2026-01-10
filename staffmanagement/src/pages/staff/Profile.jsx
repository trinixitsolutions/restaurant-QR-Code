import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { FiChevronLeft } from "react-icons/fi";

export default function Profile() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Profile View", path: "/staff/profile-view" }, // Placeholder path
    { label: "Bill", path: "/staff/quick-bill" },
    { label: "Order Tracking", path: "/staff/orders" },
    { label: "Support", path: "/staff/support" },
  ];

  return (
    <PageWrapper className="bg-[#F5F7FB] min-h-screen max-w-[430px] mx-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <FiChevronLeft size={28} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center pr-8">Profile</h1>
        {/* Spacer to center title exactly if needed, pr-8 balances the back button width roughly */}
      </div>

      {/* Menu List */}
      <div className="mt-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="w-full text-left bg-white px-6 py-4 border-b border-gray-100 last:border-none active:bg-gray-50 transition-colors"
          >
            <span className="text-base font-bold text-black">{item.label}</span>
          </button>
        ))}
      </div>
    </PageWrapper>
  );
}
