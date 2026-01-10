import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { FiSearch, FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { foods } from "../data/foods";
import { useCart } from "../context/CartContext";

import BottomNav from "../components/BottomNav";
import PaginationDots from "../components/PaginationDots";

/* CATEGORY CONFIG */
const CATEGORY_ICONS = [
  {
    name: "All",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Main Course",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Drinks",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Snacks",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=500"
  },
];

/* VEG STATES */
const VEG_STATES = ["veg", "all", "nonveg"];

/* BANNERS */
const BANNERS = [
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    title: "Today’s Valentines",
    subtitle: "Special Dinner",
  },
  {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    title: "Special Combo",
    subtitle: "Save 20%",
  },
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
    title: "Delicious Menu",
    subtitle: "Try Something New",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const [activeCategory, setActiveCategory] = useState("All");
  const [vegModeIndex, setVegModeIndex] = useState(1);
  const [search, setSearch] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [bannerIndex, setBannerIndex] = useState(0);

  const vegMode = VEG_STATES[vegModeIndex];

  /* VEG TOGGLE LOGIC */
  const handleVegToggle = () => {
    setVegModeIndex((prev) => (prev + 1) % VEG_STATES.length);
  };

  const vegLabel =
    vegMode === "veg" ? "Veg Mode" : vegMode === "nonveg" ? "Non-Veg" : "All";

  const vegBg =
    vegMode === "veg"
      ? "bg-[#00A86B]"
      : vegMode === "nonveg"
        ? "bg-red-500"
        : "bg-gray-300";

  const vegThumb =
    vegMode === "veg"
      ? "left-1"
      : vegMode === "all"
        ? "left-[14px]"
        : "left-6";

  /* AUTO BANNER */
  useEffect(() => {
    if (activeCategory !== "All") return;

    const timer = setInterval(() => {
      setBannerIndex((i) => (i + 1) % BANNERS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [activeCategory]);

  /* FILTER */
  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      activeCategory === "All" || food.category === activeCategory;

    const vegMatch =
      vegMode === "all"
        ? true
        : vegMode === "veg"
          ? food.veg
          : !food.veg;

    const searchMatch =
      food.name.toLowerCase().includes(search.toLowerCase()) ||
      food.description.toLowerCase().includes(search.toLowerCase());

    return categoryMatch && vegMatch && searchMatch;
  });

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <>
      <PageWrapper className="pb-40 bg-white min-h-screen font-sans max-w-[430px] mx-auto">

        {/* SEARCH + VEG TOGGLE */}
        <div className="px-4 pt-4 flex items-center gap-3">
          <div className="flex-1 flex items-center bg-[#F3F4F6] rounded-full px-4 py-2.5">
            <FiSearch className="text-gray-400 text-lg" />
            <input
              placeholder="Search dishes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-medium">{vegLabel}</span>
            <button
              onClick={handleVegToggle}
              className={`w-11 h-6 rounded-full relative transition ${vegBg}`}
            >
              <span
                className={`absolute top-[3px] w-4 h-4 bg-white rounded-full transition ${vegThumb}`}
              />
            </button>
          </div>
        </div>

        {/* ✅ BANNER (ONLY WHEN ALL) */}
        {activeCategory === "All" && (
          <div className="mt-4 px-4">
            <div className="relative h-36 rounded-xl overflow-hidden">
              {BANNERS.map((b, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-700 ${i === bannerIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                  <img src={b.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
                    <h3 className="text-white font-bold">{b.title}</h3>
                    <p className="text-white text-sm">{b.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <PaginationDots
              total={BANNERS.length}
              activeIndex={bannerIndex}
              onChange={setBannerIndex}
            />
          </div>
        )}

        {/* MENU TITLE */}
        <h2 className="px-4 mt-6 font-semibold text-lg">Menu</h2>

        {/* CATEGORY ROW */}
        <div className="px-4 mt-4 flex gap-5 overflow-x-auto no-scrollbar">
          {CATEGORY_ICONS.map((cat) => (
            <motion.button
              key={cat.name}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/menu", { state: { category: cat.name } })}
              className="flex flex-col items-center min-w-[72px]"
            >
              <div
                className={`w-[72px] h-[72px] rounded-full overflow-hidden border-[3px] transition-all ${activeCategory === cat.name
                  ? "border-orange-500 shadow-md"
                  : "border-white"
                  }`}
              >
                <img
                  src={cat.image}
                  className="w-full h-full object-cover"
                  alt={cat.name}
                />
              </div>

              <span
                className={`text-xs mt-2 font-bold ${activeCategory === cat.name
                  ? "text-black"
                  : "text-gray-500"
                  }`}
              >
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>

        {/* FOOD LIST */}
        <div className="px-4 mt-4 space-y-4">
          {filteredFoods.map((food) => {
            const cartItem = cartItems.find((i) => i.id === food.id);
            const fav = favourites.includes(food.id);

            return (
              <motion.div
                key={food.id}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl p-3 flex gap-3 shadow-sm transition-all duration-300 cursor-pointer"
              >
                <img
                  src={food.image}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-semibold">{food.name}</h3>
                    <button
                      onClick={() =>
                        setFavourites((f) =>
                          f.includes(food.id)
                            ? f.filter((x) => x !== food.id)
                            : [...f, food.id]
                        )
                      }
                      className="mt-0.5"
                    >
                      {fav ? (
                        <FaHeart className="text-[#F97316] text-sm" />
                      ) : (
                        <FiHeart className="text-gray-400 text-sm" />
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {food.description}
                  </p>

                  <div className="mt-auto pt-2">
                    <div className="flex justify-end mb-1">
                      <span className="text-[10px] font-bold text-gray-500">12 Min</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-black">₹{food.price}</span>

                      {!cartItem ? (
                        <button
                          onClick={() => addToCart(food)}
                          className="bg-gray-400 text-white text-[10px] font-bold px-6 py-1.5 rounded-full flex items-center hover:bg-gray-500 transition-colors"
                        >
                          ADD +
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#F97316] text-white rounded-lg h-[26px] px-2 shadow-sm">
                          <button
                            onClick={() => decreaseQty(food.id)}
                            className="w-5 h-full flex items-center justify-center font-bold text-lg pb-1"
                          >
                            −
                          </button>
                          <span className="px-2 text-xs font-bold">{cartItem.qty}</span>
                          <button
                            onClick={() => increaseQty(food.id)}
                            className="w-5 h-full flex items-center justify-center font-bold text-lg pb-1"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </PageWrapper>

      {/* VIEW CART */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-50">
          <button
            onClick={() => navigate("/cart")}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600
                     text-white rounded-2xl flex items-center justify-between
                     px-5 font-semibold shadow-2xl transition-transform active:scale-[0.98]"
          >
            <span>🛒 View Cart ({cartItems.length})</span>
            <span className="text-lg font-bold">₹{totalAmount}</span>
          </button>
        </div>
      )}

      <BottomNav />
    </>
  );
}
