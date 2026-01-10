import { createContext, useContext, useState, useEffect } from "react";

/**
 * OrderContext
 * -------------
 * This holds ALL orders globally.
 * Any page can:
 * - Read orders
 * - Update order status
 */

// Create context
const OrderContext = createContext();

// Custom hook (clean usage)
export function useOrders() {
  return useContext(OrderContext);
}

// Provider component
export function OrderProvider({ children }) {
  /**
   * STEP 1: Global orders state
   * This replaces hardcoded data inside pages
   */
  // Load from localStorage or use defaults
  // Load from localStorage or use defaults
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("staff_orders_v3");
    if (saved) return JSON.parse(saved);

    return [
      // --- TEST ORDERS (Use these to verify flow) ---
      {
        id: 999,
        type: "table",
        room: "Table 99 (TEST)",
        items: [{ name: "CLICK CONFIRM", qty: 1 }],
        staff: "System",
        time: "Now",
        status: "pending",
      },
      {
        id: 998,
        type: "room",
        room: "Room 99 (TEST)",
        items: [{ name: "CLICK CONFIRM", qty: 1 }],
        staff: "System",
        time: "Now",
        status: "pending",
      },
      // --- TABLE ORDERS ---
      {
        id: 101,
        type: "table",
        room: "Table No 5",
        items: [
          { name: "Butter Naan", qty: 2 },
          { name: "Paneer Butter Masala", qty: 1 },
        ],
        staff: "Vinayak",
        time: "12:10 pm",
        status: "pending",
      },

      {
        id: 102,
        type: "table",
        room: "Table No 3",
        items: [
          { name: "Veg Biryani", qty: 2 },
          { name: "Coke", qty: 2 },
        ],
        staff: "Suraj",
        time: "12:15 pm",
        status: "delivered",
      },
      // --- TABLE ORDERS (ACTIVE SAMPLE) ---
      {
        id: 103,
        type: "table",
        room: "Table No 7",
        items: [
          { name: "Masala Dosa", qty: 2 },
          { name: "Filter Coffee", qty: 2 }
        ],
        staff: "Ramesh",
        time: "12:30 pm",
        status: "confirm",
      },
      {
        id: 104,
        type: "table",
        room: "Table No 2",
        items: [
          { name: "Veg Meal", qty: 1 }
        ],
        staff: "Suresh",
        time: "12:35 pm",
        status: "preparing",
      },
      // --- ROOM ORDERS ---
      {
        id: 1,
        type: "room",
        room: "Room No 10",
        items: [
          { name: "Panner Tikka", qty: 1 },
          { name: "oldmonk", qty: 5 },
          { name: "Pepsi", qty: 10 },
          { name: "Old Monk", qty: 1 },
          { name: "Chicken Kabab", qty: 1 },
        ],
        staff: "Suraj",
        time: "12:00 pm",
        status: "pending",
      },
      {
        id: 2,
        type: "room",
        room: "Room No 11",
        items: [
          { name: "Panner Tikka", qty: 1 },
          { name: "Sprite", qty: 5 },
          { name: "breezer", qty: 10 },
          { name: "Old Monk", qty: 1 },
          { name: "Chicken Kabab", qty: 1 },
        ],
        staff: "Suraj",
        time: "12:05 pm",
        status: "pending",
      },
      {
        id: 10,
        type: "room",
        room: "Room No 10",
        items: ["Punner Tikka", "Sprite", "Pepsi", "Old Monk", "Chicken Kabab"],
        staff: "Suraj",
        time: "12:00 pm",
        status: "delivered",
      },
      // --- SAMPLE ACTIVE ORDERS ---
      {
        id: 11,
        type: "room",
        room: "Room No 12",
        items: [
          { name: "Veg Burger", qty: 1 },
          { name: "French Fries", qty: 1 }
        ],
        staff: "Vinayak",
        time: "12:20 pm",
        status: "confirm",
      },
      {
        id: 12,
        type: "room",
        room: "Room No 14",
        items: [
          { name: "Chicken Biryani", qty: 2 }
        ],
        staff: "Suraj",
        time: "12:25 pm",
        status: "preparing",
      },
    ];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("staff_orders_v3", JSON.stringify(orders));
  }, [orders]);

  /**
   * STEP 2: Update order status
   * This is called from TableRoomSelect
   */
  const updateOrderStatus = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  /**
   * STEP 3: Add new order
   * This is called from Cart
   */
  const addOrder = (newOrder) => {
    setOrders((prev) => [
      {
        ...newOrder,
        id: Date.now(), // Simple unique ID
        status: "pending",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        staff: "Suraj" // Default staff for now
      },
      ...prev,
    ]);
  };

  return (
    <OrderContext.Provider
      value={{ orders, updateOrderStatus, addOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}
