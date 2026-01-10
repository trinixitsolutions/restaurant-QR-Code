// ✅ REQUIRED IMPORTS (THIS WAS MISSING)
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [table, setTable] = useState(null); // selected table / room

  const addItem = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        qty: (prev[item.id]?.qty || 0) + 1,
      },
    }));
  };

  const removeItem = (item) => {
    setCart((prev) => {
      if (!prev[item.id]) return prev;

      const qty = prev[item.id].qty - 1;
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }

      return {
        ...prev,
        [item.id]: { ...prev[item.id], qty },
      };
    });
  };

  const clearCart = () => {
    setCart({});
    setTable(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        table,
        setTable,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
