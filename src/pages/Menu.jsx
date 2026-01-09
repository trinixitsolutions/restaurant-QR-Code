import { useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/layout/PageWrapper";
import MenuCard from "../components/cards/MenuCard";
import menuData from "../data/menuData";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const [category, setCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, addItem, removeItem } = useCart();

  const categories = [
    { id: "all", label: "All" },
    { id: "veg", label: "Veg" },
    { id: "nonveg", label: "Non-Veg" },
    { id: "drinks", label: "Drinks" },
  ];

  const filteredItems = menuData.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <PageWrapper onSearch={setSearchQuery}>
      {/* Category Tabs */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${category === cat.id
              ? "bg-black text-white shadow-md transform scale-105"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-32">
        {filteredItems.map((item) => (
          <MenuCard
            key={item.id}
            name={item.name}
            price={item.price}
            qty={cart[item.id]?.qty || 0}
            category={item.category}
            onAdd={() => addItem(item)}
            onRemove={() => removeItem(item)}
          />
        ))}
      </div>

      {/* Cart Summary Bar */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[600px] glass rounded-2xl px-6 py-4 flex justify-between items-center z-50 animate-slideIn">
          <div className="text-sm">
            <span className="font-bold text-lg">
              {Object.values(cart).reduce((s, i) => s + i.qty, 0)}
            </span>{" "}
            items | <span className="font-bold text-lg">₹ {Object.values(cart).reduce(
              (s, i) => s + i.qty * i.price,
              0
            ).toFixed(2)}</span>
          </div>

          <Link
            to="/receipt"
            className="bg-black text-white px-8 py-2.5 rounded-xl text-sm font-bold shadow-lg hover:bg-gray-900 transition-all hover:scale-105 active:scale-95"
          >
            View Cart
          </Link>

        </div>
      )}
    </PageWrapper>
  );
}
