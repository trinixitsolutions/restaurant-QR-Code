import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 🛒 Cart items
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("user_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 📦 Order history
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("user_orders");
    return saved ? JSON.parse(saved) : [];
  });

  // ⭐ Last placed order
  const [lastOrder, setLastOrder] = useState(() => {
    const saved = localStorage.getItem("user_last_order");
    return saved ? JSON.parse(saved) : null;
  });

  // PERSISTENCE EFFECT
  useEffect(() => {
    localStorage.setItem("user_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("user_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (lastOrder) localStorage.setItem("user_last_order", JSON.stringify(lastOrder));
  }, [lastOrder]);

  // ➕ Add to cart
  const addToCart = (food) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === food.id);

      if (existing) {
        return prev.map((item) =>
          item.id === food.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...food, qty: 1 }];
    });
  };

  // ➕ Increase quantity
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // ✅ PLACE ORDER (MOST IMPORTANT FUNCTION)
  const placeOrder = () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const newOrder = {
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      total,
      date: new Date().toLocaleString(),
      status: "Order Received",
    };

    // Save order history
    setOrders((prev) => [newOrder, ...prev]);

    // Save last order (for Order Success page)
    setLastOrder(newOrder);

    // Clear cart after order
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        lastOrder,
        addToCart,
        increaseQty,
        decreaseQty,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export function useCart() {
  return useContext(CartContext);
}
