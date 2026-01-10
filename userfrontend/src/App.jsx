import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/* AUTH */
import Signup from "./auth/pages/Signup";
import Login from "./auth/pages/Login";
import ForgotPassword from "./auth/pages/ForgotPassword";
import ProfileDetails from "./auth/pages/ProfileDetails";

/* APP PAGES */
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderTracking from "./pages/OrderTracking";
import Profile from "./pages/Profile";
import ProfileView from "./pages/ProfileView";
import Support from "./pages/Support";
import Bill from "./pages/Bill";
import OrderHistory from "./pages/OrderHistory";
import Payment from "./pages/Payment";

export default function App() {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ duration: 2000 }} />
      <Routes>

        {/* ✅ DEFAULT ROUTE — FIXES YOUR WARNING */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* AUTH FLOW */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile-details" element={<ProfileDetails />} />

        {/* MAIN APP */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/view" element={<ProfileView />} />
        <Route path="/support" element={<Support />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/orders" element={<OrderHistory />} />

        {/* OPTIONAL */}
        <Route path="/payment" element={<Payment />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </>
  );
}
