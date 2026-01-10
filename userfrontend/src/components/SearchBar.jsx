export default function SearchBar({ vegOnly, setVegOnly }) {
  return (
    <div className="flex items-center gap-3 px-4">
      {/* Search input */}
      <div className="flex-1 bg-gray-100 rounded-full px-3 py-2">
        <input
          placeholder="Search"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Veg Toggle */}
      <div
        onClick={() => setVegOnly(!vegOnly)}
        className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer
          ${vegOnly ? "bg-primary" : "bg-gray-300"}`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition
            ${vegOnly ? "ml-auto" : ""}`}
        />
      </div>
    </div>
  );
}
