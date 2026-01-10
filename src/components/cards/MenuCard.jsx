export default function MenuCard({ name, price, qty, category, onAdd, onRemove }) {
  const isVeg = category === "veg";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="aspect-[4/3] w-full relative">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <div className={`w-5 h-5 border-[1.5px] ${isVeg ? 'border-green-600' : 'border-red-600'} bg-white rounded-md flex items-center justify-center`}>
            <div className={`w-2.5 h-2.5 rounded-full ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <div className="mb-3 h-10">
          <h3 className="font-bold text-[15px] text-gray-900 leading-snug line-clamp-2">
            {name}
          </h3>
        </div>

        {/* Price & Controls */}
        <div className="flex items-center justify-between">
          <p className="text-base font-bold text-gray-900">
            ₹{price.toFixed(2)}
          </p>

          {!qty ? (
            <button
              onClick={onAdd}
              className="px-6 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-black hover:border-black transition-all bg-white shadow-sm"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center h-9 rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
              <button
                onClick={onRemove}
                disabled={qty === 0}
                className="w-9 h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-black transition-colors"
              >
                −
              </button>

              <span className="w-8 flex items-center justify-center text-sm font-bold text-black">
                {qty}
              </span>

              <button
                onClick={onAdd}
                className="w-9 h-full flex items-center justify-center text-green-600 hover:bg-green-50 transition-colors"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
