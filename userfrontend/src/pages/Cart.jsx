import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import { FiArrowLeft, FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import BottomNav from "../components/BottomNav";
import PaginationDots from "../components/PaginationDots";

/* NEW COMPONENTS (LOGIC ONLY) */
import NotificationSheet from "../components/NotificationSheet";
import EmptyCart from "../components/EmptyCart";
import PromoCode from "../components/PromoCode";
import { ADDONS } from "../data/addons";

export default function Cart() {
    const navigate = useNavigate();
    const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

    /* ---------- STATE ---------- */
    const [showNotif, setShowNotif] = useState(false);
    const [discount, setDiscount] = useState(0);

    /* ---------- BILL ---------- */
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );
    const tax = subtotal * 0.1;
    const total = subtotal + tax - discount;

    /* ---------- ADDON HANDLER ---------- */
    const handleAddAddon = (addon) => {
        addToCart({ ...addon, qty: 1 });
    };

    return (
        <>
            <PageWrapper className="pb-40 bg-white min-h-screen font-sans max-w-[430px] mx-auto">

                {/* ===== HEADER ===== */}
                <header className="sticky top-0 z-30 bg-white border-b">
                    <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate(-1)}
                                className="active:scale-95 transition"
                            >
                                <FiArrowLeft size={22} />
                            </button>
                            <h1 className="text-lg font-semibold">Checkout</h1>
                        </div>

                        <FiBell
                            size={20}
                            className="text-gray-500 cursor-pointer"
                            onClick={() => setShowNotif(true)}
                        />
                    </div>
                </header>

                {/* ===== EMPTY STATE ===== */}
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        {/* ===== NOTIFICATIONS ===== */}
                        <NotificationSheet
                            open={showNotif}
                            onClose={() => setShowNotif(false)}
                        />

                        {/* ===== TABLE HEAD ===== */}
                        <div className="px-4 mt-4 flex justify-between text-xs text-gray-400">
                            <span>ITEMS</span>
                            <span>PRICE</span>
                        </div>

                        {/* ===== CART ITEMS ===== */}
                        <div className="px-4 mt-2 space-y-4">
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                                    className="bg-white rounded-xl p-3 flex gap-3 shadow-sm"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 rounded-lg object-cover"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-sm font-semibold">{item.name}</h3>
                                            <span className="font-semibold text-sm">
                                                ₹{item.price}
                                            </span>
                                        </div>

                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <div className="mt-2">
                                            <div className="inline-flex items-center bg-gray-200 rounded-full text-xs">
                                                <button
                                                    onClick={() => decreaseQty(item.id)}
                                                    className="px-3 py-1"
                                                >
                                                    −
                                                </button>
                                                <span className="px-1">{item.qty}</span>
                                                <button
                                                    onClick={() => increaseQty(item.id)}
                                                    className="px-3 py-1"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* ===== COMPLETE YOUR MEALS ===== */}
                        <section className="px-4 mt-6">
                            <h3 className="text-sm font-semibold mb-3">
                                Complete Your Meals
                            </h3>

                            <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x">
                                {ADDONS.map((addon) => (
                                    <div
                                        key={addon.id}
                                        className="min-w-[100px] bg-white rounded-xl p-2 shadow-sm relative snap-start"
                                    >
                                        <img
                                            src={addon.image}
                                            className="w-full h-20 rounded-lg object-cover"
                                        />
                                        <p className="text-xs mt-1 font-medium">{addon.name}</p>
                                        <p className="text-xs text-gray-500">₹{addon.price}</p>

                                        <button
                                            onClick={() => handleAddAddon(addon)}
                                            className="absolute top-2 right-2 w-6 h-6 bg-orange-500
                           text-white rounded-full text-xs flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <PaginationDots count={ADDONS.length} />
                        </section>

                        {/* ===== PROMO CODE ===== */}
                        <section className="px-4 mt-6">
                            <PromoCode
                                subtotal={subtotal}
                                onApply={(value) => setDiscount(value)}
                            />
                        </section>

                        {/* ===== BILL SUMMARY ===== */}
                        <section className="px-4 mt-4">
                            <div className="bg-white rounded-xl p-4 text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal ({cartItems.length})</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Taxes</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Promo Applied</span>
                                        <span>-₹{discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>
                            </div>
                        </section>

                    </>
                )}

                {/* ===== PLACE ORDER (ROUTE FIXED) ===== */}
                {cartItems.length > 0 && (
                    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-40">
                        <button
                            onClick={() => navigate("/order-confirmation")}
                            className="w-full py-4 rounded-xl font-semibold shadow-lg transition active:scale-95 bg-orange-500 text-white"
                        >
                            Place order
                        </button>
                    </div>
                )}

                <BottomNav />
            </PageWrapper>
        </>
    );
}
