import { createContext, useContext, useState } from "react";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);

  const placeOrder = (orderData) => {
    setOrder(orderData);
  };

  const clearOrder = () => {
    setOrder(null);
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        placeOrder,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used inside OrderProvider");
  }
  return context;
}
