import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const increaseQty = (id) => {
        setCartItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        );
    };

    const decreaseQty = (id) => {
        setCartItems((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
                .filter((i) => i.qty > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, increaseQty, decreaseQty }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
