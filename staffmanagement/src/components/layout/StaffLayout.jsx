import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function StaffLayout() {
  return (
    <div className="min-h-screen bg-black flex justify-center">
      {/* MOBILE FRAME */}
      <div className="w-full max-w-[430px] bg-white flex flex-col h-screen overflow-hidden">

        {/* HEADER REMOVED - Pages have custom headers */}


        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 py-2 scrollbar-hide">
          <Outlet />
        </main>

        {/* BOTTOM NAV */}
        <BottomNav />
      </div>
    </div>
  );
}
