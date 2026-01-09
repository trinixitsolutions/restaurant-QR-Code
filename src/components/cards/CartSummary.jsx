export default function CartSummary() {
  return (
    <div className="bg-white border border-[var(--border-light)] rounded-xl p-6 hover:shadow-sm transition">

      {/* TITLE – BLACK & BOLD */}
      <h3 className="text-sm font-bold text-[var(--text-dark)] mb-4">
        Cart
      </h3>

      <div
        className="relative w-40 h-40 mx-auto mb-4 rounded-full"
        style={{
          background:
            "conic-gradient(#16A34A 0% 40%, #EF4444 40% 80%, #F59E0B 80% 100%)",
        }}
      >
        <div className="absolute inset-6 bg-white rounded-full"></div>
      </div>

      <div className="flex justify-between text-sm mt-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          Non-Veg <b>40%</b>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
          Veg <b>40%</b>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Drinks <b>20%</b>
        </div>
      </div>
    </div>
  );
}
