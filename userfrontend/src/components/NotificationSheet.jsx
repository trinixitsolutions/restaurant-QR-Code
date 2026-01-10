import { FiX } from "react-icons/fi";

export default function NotificationSheet({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-start sm:justify-end">
      {/* backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* sheet */}
      <div
        className="relative w-full sm:w-[360px] bg-white rounded-t-2xl sm:rounded-xl
                   p-4 animate-slideUp sm:animate-fadeIn"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Notifications</h3>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="bg-gray-100 p-3 rounded-lg">
            🎉 Flat 20% off on Main Course
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            🚚 Free delivery on orders above ₹299
          </div>
        </div>
      </div>
    </div>
  );
}
