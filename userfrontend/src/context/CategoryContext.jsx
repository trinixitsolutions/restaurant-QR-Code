import { createContext, useContext, useState } from "react";

const CategoryContext = createContext(null);

export function CategoryProvider({ children }) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <CategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) {
    throw new Error("useCategory must be used inside CategoryProvider");
  }
  return ctx;
}
