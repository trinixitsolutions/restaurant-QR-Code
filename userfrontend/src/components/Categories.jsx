export default function Categories({ selected, onSelect }) {
  return (
    <div className="flex gap-3 px-4 overflow-x-auto">
      {["All", "Main Course", "Drinks", "Snacks"].map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`px-4 py-2 rounded-full text-sm
            ${
              selected === item
                ? "bg-primary text-white"
                : "bg-white border"
            }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
