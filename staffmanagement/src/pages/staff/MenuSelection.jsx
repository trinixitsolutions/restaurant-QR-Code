import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../../components/PageWrapper";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiHeart, FiChevronLeft } from "react-icons/fi";
import { ChevronLeft } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { foods } from "../../data/foods";
import { useCart } from "../../context/CartContext";



import PaginationDots from "../../components/PaginationDots";

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

export default function MenuSelection() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [favourites, setFavourites] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const [vegModeIndex, setVegModeIndex] = useState(1);
    const vegMode = VEG_STATES[vegModeIndex];
    const scrollRef = useRef(null);

    const handleVegToggle = () => {
        setVegModeIndex((prev) => (prev + 1) % VEG_STATES.length);
    };

    const handleDotClick = (index) => {
        setPageIndex(index);
        // Map index to category and set it active (optional, user asked for dot interaction)
        // Usually pagination dots in a scroll view just scroll to that section OR item.
        // Given the layout (horizontal scroll of categories), we scroll the container.
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * index;
            // Since items might be smaller than clientWidth, we might need a better calc if it's "one item per page".
            // But usually this pattern implies "pages" of content. 
            // The scroll listener uses clientWidth division, so we multiply by clientWidth here.
            // HOWEVER, the category list items are small (72px). Pagination usually implies paging through them.
            // Let's scroll to the start of the 'page'
            scrollRef.current.scrollTo({
                left: scrollRef.current.clientWidth * index,
                behavior: 'smooth'
            });
        }
    };

    // Helper: Filter logic
    const getFilteredFoods = (category) => {
        return foods.filter((food) => {
            const categoryMatch = category === "All" || food.category === category;
            const vegMatch = vegMode === "all" ? true : vegMode === "veg" ? food.veg === true : food.veg === false;
            const searchMatch = food.name.toLowerCase().includes(search.toLowerCase()) || food.description.toLowerCase().includes(search.toLowerCase());
            return categoryMatch && vegMatch && searchMatch;
        });
    };

    // Calculate Groups
    const groupedFoods = useMemo(() => {
        if (activeCategory === "All") {
            const groups = [];
            CATEGORY_ICONS.slice(1).forEach(cat => {
                const items = getFilteredFoods(cat.name);
                if (items.length > 0) {
                    groups.push({ title: cat.name, items });
                }
            });
            return groups; // Return groups even if one has empty but just not adding empty ones
        } else {
            const items = getFilteredFoods(activeCategory);
            return items.length > 0 ? [{ title: activeCategory, items }] : [];
        }
    }, [activeCategory, vegMode, search]);


    const totalAmount = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

    return (
        <>
            <PageWrapper className="pb-48 bg-[#F5F7FB] min-h-screen max-w-[430px] mx-auto">
                {/* HEADER: Search + Toggle */}
                <div className="px-4 py-4 pt-6 flex items-center justify-between gap-3 sticky top-0 bg-white z-10">
                    {/* Back Button */}
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
                        <ChevronLeft size={24} className="text-black" />
                    </button>

                    {/* Search */}
                    <div className="flex-1 bg-[#F3F4F6] rounded-full flex items-center px-4 py-2.5">
                        <FiSearch className="text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent border-none outline-none text-base ml-2 w-full text-black placeholder-gray-400 font-medium"
                        />
                    </div>

                    {/* Veg Toggle Switch - 3 STATE */}
                    <div className="flex flex-col items-center min-w-[60px]">
                        <span className="text-[10px] font-bold text-gray-700 mb-1">
                            {vegMode === "veg" ? "Veg Mode" : vegMode === "nonveg" ? "Non-Veg" : "All"}
                        </span>
                        <button
                            onClick={handleVegToggle}
                            className={`w-11 h-6 rounded-full relative transition-colors duration-200 ${vegMode === 'veg'
                                ? "bg-[#00A86B]"
                                : vegMode === 'nonveg'
                                    ? "bg-red-500"
                                    : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${vegMode === 'veg'
                                    ? "left-1"
                                    : vegMode === 'nonveg'
                                        ? "left-6"
                                        : "left-[14px]"
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* CATEGORIES SCROLL */}
                <div className="px-4 mt-2">
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-2 scroll-smooth"
                        onScroll={(e) => {
                            const index = Math.round(e.target.scrollLeft / e.target.clientWidth);
                            setPageIndex(index);
                        }}
                    >
                        {CATEGORY_ICONS.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className="flex flex-col items-center min-w-[72px]"
                            >
                                <div className={`w-[72px] h-[72px] rounded-full overflow-hidden border-[3px] transition-all ${activeCategory === cat.name ? 'border-[#F97316] shadow-md' : 'border-white'}`}>
                                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                </div>
                                <span className={`text-xs mt-2 font-bold ${activeCategory === cat.name ? 'text-black' : 'text-gray-500'}`}>
                                    {cat.name}
                                </span>
                            </button>
                        ))}
                    </div>
                    {/* Dots */}
                    <div className="flex justify-center mt-2">
                        <PaginationDots
                            total={CATEGORY_ICONS.length}
                            activeIndex={pageIndex}
                            onClick={handleDotClick}
                        />
                    </div>
                </div>

                {/* FOOD LIST (GROUPED) */}
                <div className="px-4 mt-2 space-y-6">
                    {groupedFoods.map((group) => (
                        <div key={group.title}>
                            <h2 className="text-lg font-bold text-black mb-3">{group.title}</h2>
                            <motion.div
                                className="space-y-4"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                {group.items.map((food) => {
                                    const cartItem = cartItems.find((i) => i.id === food.id);
                                    const fav = favourites.includes(food.id);

                                    return (
                                        <motion.div
                                            key={food.id}
                                            variants={itemVariants}
                                            whileHover={{ y: -5, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
                                            whileTap={{ scale: 0.98 }}
                                            className="bg-white rounded-2xl p-3 flex gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-gray-50"
                                        >
                                            {/* Image */}
                                            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 relative">
                                                <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-base text-gray-900 leading-tight">{food.name}</h3>
                                                        <p className="text-[10px] text-gray-500 mt-1 leading-snug line-clamp-2">{food.description}</p>
                                                    </div>
                                                    <button onClick={() => setFavourites(f => f.includes(food.id) ? f.filter(x => x !== food.id) : [...f, food.id])}>
                                                        {fav ? <FaHeart className="text-[#F97316] text-lg" /> : <FiHeart className="text-gray-400 text-lg" />}
                                                    </button>
                                                </div>

                                                <div className="flex justify-between items-end mt-2">
                                                    <span className="font-bold text-lg text-black">₹{food.price}</span>

                                                    <div className="flex flex-col items-end">
                                                        <span className="text-[10px] font-bold text-gray-500 mb-1">12 Min</span>
                                                        {!cartItem ? (
                                                            <button
                                                                onClick={() => addToCart(food)}
                                                                className="bg-[#9CA3AF] text-white text-[10px] font-bold px-6 py-1.5 rounded-full flex items-center hover:bg-gray-500 transition-colors"
                                                            >
                                                                ADD +
                                                            </button>
                                                        ) : (
                                                            <div className="flex items-center bg-[#F97316] text-white rounded-full h-7 px-1 w-[80px] justify-between shadow-sm">
                                                                <button onClick={() => decreaseQty(food.id)} className="w-6 h-full flex items-center justify-center text-lg font-bold pb-1">-</button>
                                                                <span className="text-xs font-bold">{cartItem.qty}</span>
                                                                <button onClick={() => increaseQty(food.id)} className="w-6 h-full flex items-center justify-center text-lg font-bold pb-1">+</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    ))}

                    {groupedFoods.length === 0 && (
                        <div className="text-center py-10 text-gray-400">
                            No items found
                        </div>
                    )}
                </div>
                {/* Bottom Nav is in Layout, but this content is wrapped */}
            </PageWrapper>

            {/* NEW FOOTER DESIGN (Orange Panel) */}
            {
                cartItems.length > 0 && (
                    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-20">
                        <div className="w-full bg-[#F97316] px-4 pt-3 pb-4 rounded-t-2xl shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
                            {/* Details Row */}
                            <div className="flex justify-between items-center text-white mb-3 px-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">View Cart</span>
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-white text-xs font-bold">
                                        {cartItems.length}
                                    </span>
                                </div>
                                <span className="text-lg font-bold">₹ {totalAmount}</span>
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => navigate("/staff/cart", { state: location.state })}
                                className="w-full bg-white text-[#F97316] font-bold text-base py-3 rounded-xl shadow-sm active:scale-[0.98] transition-transform"
                            >
                                Place order
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    );
}
