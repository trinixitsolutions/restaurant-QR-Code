import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/ui/Loading";

// Lazy Load Pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Tables = lazy(() => import("./pages/Tables"));
const Menu = lazy(() => import("./pages/Menu"));
const Receipt = lazy(() => import("./pages/Receipt"));
const ExpenseTracking = lazy(() => import("./pages/ExpenseTracking"));
const MenuManagement = lazy(() => import("./pages/MenuManagement"));
const StaffManagement = lazy(() => import("./pages/StaffManagement"));
const Reports = lazy(() => import("./pages/Reports"));
const Support = lazy(() => import("./pages/Support"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const GeneralSetting = lazy(() => import("./pages/GeneralSetting"));
const ProfileView = lazy(() => import("./pages/ProfileView"));

const OrderManagement = lazy(() => import("./pages/OrderManagement"));
const QrCodeManagement = lazy(() => import("./pages/QrCodeManagement"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Default */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Core Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/expenses" element={<ExpenseTracking />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/staff" element={<StaffManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/qr" element={<QrCodeManagement />} />

          {/* Sidebar Pages */}
          <Route path="/support" element={<Support />} />
          <Route path="/orders" element={<OrderTracking />} />
          <Route path="/profile" element={<ProfileView />} />

          {/* Settings */}
          <Route path="/general" element={<GeneralSetting />} />
          <Route path="/general" element={<GeneralSetting />} />
          <Route path="/order" element={<OrderManagement />} />


          {/* Fallback (optional but recommended) */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
