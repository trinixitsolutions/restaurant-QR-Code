import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ChevronDown,
    CheckCircle,
    ChefHat,
    Soup,
    Smile,
    Clock
} from "lucide-react";
import BottomNav from "../components/BottomNav";
import ReadyIcon from "../assets/ready_icon.png";

/* ================= SAMPLE ORDERS ================= */
const ORDERS = [
    {
        id: "ORD-1765967725505",
        table: "Table 12",
        eta: "25 mins",
        status: "kitchen"
    },
    {
        id: "ORD-1765967725400",
        table: "Room 10",
        eta: "15 mins",
        status: "ready"
    },
    {
        id: "ORD-1765967725350",
        table: "Table 10",
        eta: "Served",
        status: "served"
    }
];

export default function OrderTracking() {
    const navigate = useNavigate();
    const [expandedOrder, setExpandedOrder] = useState(null);

    return (
        <PageWrapper className="min-h-screen bg-[#F5F7FB] flex justify-center">
            <div className="w-full max-w-[430px] min-h-screen bg-[#F5F7FB]">

                {/* ================= HEADER ================= */}
                <header className="bg-white border-b">
                    <div className="px-4 py-4 flex items-center gap-3">
                        <button onClick={() => navigate(-1)}>
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 className="text-lg font-semibold">Order Tracking</h1>
                    </div>
                </header>

                {/* ================= ORDERS LIST ================= */}
                <div className="px-4 mt-4 space-y-4 pb-28">
                    {ORDERS.map((order) => {
                        const expanded = expandedOrder === order.id;

                        return (
                            <div key={order.id}>
                                {/* ORDER CARD */}
                                <div
                                    onClick={() =>
                                        setExpandedOrder(expanded ? null : order.id)
                                    }
                                    className="bg-white rounded-xl border px-4 py-4 flex justify-between items-center cursor-pointer"
                                >
                                    <div>
                                        <p className="text-orange-500 font-medium">
                                            Order #{order.id}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {order.table} · {order.eta}
                                        </p>
                                    </div>
                                    <ChevronDown
                                        className={`transition ${expanded ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                {/* ORDER FLOW */}
                                {expanded && (
                                    <>
                                        <div className="mt-4">
                                            <div className="bg-white rounded-xl border p-4">
                                                <p className="font-semibold mb-4">
                                                    Order Status
                                                </p>

                                                <StatusItem
                                                    active
                                                    icon={<CheckCircle />}
                                                    title="Order Received"
                                                    subtitle="Your order has been confirmed"
                                                />

                                                <StatusItem
                                                    active={
                                                        order.status === "kitchen" ||
                                                        order.status === "ready" ||
                                                        order.status === "served"
                                                    }
                                                    icon={<ChefHat />}
                                                    title="In Kitchen"
                                                    subtitle="Our chefs are preparing your meal"
                                                />



                                                <StatusItem
                                                    active={
                                                        order.status === "ready" ||
                                                        order.status === "served"
                                                    }
                                                    icon={<img src={ReadyIcon} alt="Ready" className="w-5 h-5 object-contain" />}
                                                    title="Ready"
                                                    subtitle="Your order is ready to be served"
                                                />

                                                <StatusItem
                                                    active={order.status === "served"}
                                                    icon={<Smile />}
                                                    title="Served"
                                                    subtitle="Enjoy your meal!"
                                                    isLast
                                                />
                                            </div>
                                        </div>

                                        {/* ETA */}
                                        <div className="mt-4">
                                            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
                                                <Clock className="w-6 h-6 text-gray-500 mb-1" />
                                                <p className="text-sm text-gray-500">
                                                    Estimated Time
                                                </p>
                                                <p className="text-orange-500 font-semibold text-lg mt-1">
                                                    {order.eta}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ================= BOTTOM NAV ================= */}
                <BottomNav />

            </div>
        </PageWrapper>
    );
}

/* ================= STATUS ITEM ================= */
function StatusItem({ active, icon, title, subtitle, isLast }) {
    return (
        <div className="flex items-start gap-3 relative">
            <div
                className={`w-10 h-10 flex items-center justify-center rounded-full z-10 ${active ? "bg-orange-500" : "bg-gray-300"
                    }`}
            >
                <div className={`${active ? "text-white" : "text-gray-500"}`}>
                    {icon}
                </div>
            </div>

            <div className="pb-6">
                <p
                    className={`text-sm ${active ? "font-semibold text-black" : "text-gray-500"
                        }`}
                >
                    {title}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    {subtitle}
                </p>
            </div>

            {!isLast && (
                <span
                    className={`absolute left-5 top-10 w-px h-full ${active ? "bg-orange-500" : "bg-gray-300"
                        }`}
                />
            )}
        </div>
    );
}
