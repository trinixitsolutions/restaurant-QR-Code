import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import PageWrapper from "../components/PageWrapper";
import { useNavigate, useLocation } from "react-router-dom";
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

/* VEG TOGGLE STATES */
const VEG_STATES = ["veg", "all", "nonveg"];

/* ANIMATION VARIANTS */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Menu() {
  const navigate = useNavigate();
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(
    location.state?.category || "All"
  );
  const [search, setSearch] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  const [vegModeIndex, setVegModeIndex] = useState(1);
  const vegMode = VEG_STATES[vegModeIndex];

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

  /* FILTER */
  const filteredFoods = foods.filter((food) => {
    const categoryMatch =
      activeCategory === "All" || food.category === activeCategory;

    const vegMatch =
      vegMode === "all"
        ? true
        : vegMode === "veg"
          ? food.veg === true
          : food.veg === false;

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
            <span className="text-[10px]">{vegLabel}</span>
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

        {/* CATEGORY ROW */}
        <div className="px-4 mt-4">
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide"
            onScroll={(e) => {
              const index = Math.round(
                e.target.scrollLeft / e.target.clientWidth
              );
              setPageIndex(index);
            }}
          >
            {CATEGORY_ICONS.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
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
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <span
                  className={`text-xs mt-1 ${activeCategory === cat.name
                    ? "text-orange-500 font-medium"
                    : "text-gray-600"
                    }`}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>

          {/* ✅ HIDE DOTS WHEN ALL IS SELECTED */}
          {activeCategory !== "All" && (
            <PaginationDots
              total={CATEGORY_ICONS.length}
              activeIndex={pageIndex}
            />
          )}
        </div>

        {/* FOOD LIST */}
        <div className="px-4 mt-4 space-y-6">
          {activeCategory === "All" && !search ? (
            /* GROUPED VIEW */
            CATEGORY_ICONS.filter(c => c.name !== "All").map((cat) => {
              const catItems = filteredFoods.filter(f => f.category === cat.name);
              if (catItems.length === 0) return null;

              return (
                <div key={cat.name}>
                  <h2 className="font-bold text-lg mb-3 text-black">{cat.name}</h2>
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {catItems.map((food) => (
                      <FoodItemCard
                        key={food.id}
                        food={food}
                        cartItems={cartItems}
                        addToCart={addToCart}
                        increaseQty={increaseQty}
                        decreaseQty={decreaseQty}
                        favourites={favourites}
                        setFavourites={setFavourites}
                        variants={itemVariants}
                      />
                    ))}
                  </motion.div>
                </div>
              );
            })
          ) : (
            /* SINGLE LIST VIEW (Filtered or Specific Category) */
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {filteredFoods.map((food) => (
                <FoodItemCard
                  key={food.id}
                  food={food}
                  cartItems={cartItems}
                  addToCart={addToCart}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  favourites={favourites}
                  setFavourites={setFavourites}
                  variants={itemVariants}
                />
              ))}
              {filteredFoods.length === 0 && (
                <div className="text-center py-10 text-gray-400">No items found</div>
              )}
            </motion.div>
          )}
        </div>

        <BottomNav />
      </PageWrapper>

      {/* VIEW CART - Outside PageWrapper to stay Fixed */}
      {
        cartItems.length > 0 && (
          <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-50">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={() => navigate("/cart")}
              className="w-full h-14 bg-gradient-to-r from-orange-500 to-orange-600
                       text-white rounded-2xl flex items-center justify-between
                       px-5 font-semibold shadow-2xl transition-transform active:scale-[0.98]"
            >
              <span>🛒 View Cart ({cartItems.length})</span>
              <span className="text-lg font-bold">₹{totalAmount}</span>
            </motion.button>
          </div>
        )
      }
    </>
  );
}

function FoodItemCard({ food, cartItems, addToCart, increaseQty, decreaseQty, favourites, setFavourites }) {
  const cartItem = cartItems.find((i) => i.id === food.id);
  const fav = favourites.includes(food.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={food.image}
          className="w-full h-full object-cover"
          alt={food.name}
        />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="text-[15px] font-bold text-gray-900 leading-tight pr-2">{food.name}</h3>
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

        {/* Description */}
        <p className="text-[10px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {food.description}
        </p>

        {/* Footer: Price & Action */}
        <div className="mt-auto pt-2">
          <div className="flex justify-end mb-1">
            <span className="text-[10px] font-bold text-gray-500">12 Min</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-black">₹{food.price}</span>

            {!cartItem ? (
              <button
                onClick={() => addToCart(food)}
                className="bg-gray-400 text-white text-[10px] font-bold px-6 py-1.5 rounded-full flex items-center hover:bg-gray-500 transition-all active:scale-95"
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
}
