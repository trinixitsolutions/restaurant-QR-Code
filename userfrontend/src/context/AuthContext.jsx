import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // logged-in user profile

  /* ================= ACTIONS ================= */

  const setUserProfile = (profileData) => {
    setUser(profileData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
