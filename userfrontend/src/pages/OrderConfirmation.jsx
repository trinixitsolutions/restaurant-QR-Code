import {
  CheckCircle,
  Clock,
  ChefHat,
  Smile
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

/* ======================================================
   MAIN PAGE
====================================================== */

export default function OrderConfirmation() {
  const navigate = useNavigate();

  const order = {
    id: "ORD-459812",
    table: "Table 6",
    eta: "25 Minutes",
    items: [
      {
        id: 1,
        name: "Paneer Tikka",
        qty: 2,
        price: 180,
        image:
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
      },
      {
        id: 2,
        name: "Veg Fried Rice",
        qty: 1,
        price: 150,
        image:
          "https://images.unsplash.com/photo-1589302168068-964664d93dc0"
      }
    ]
  };

  const subtotal = order.items.reduce(
    (s, i) => s + i.price * i.qty,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <PageWrapper className="min-h-screen bg-white flex justify-center">
      <div className="w-full max-w-[430px] relative pb-28">

        {/* ================= HEADER ================= */}
        <header className="bg-orange-500 rounded-b-3xl pt-10 pb-16 text-center text-white">
          <div className="mx-auto w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-4">
            <CheckCircle size={34} />
          </div>

          <h1 className="text-lg font-semibold">
            Order Placed Successfully!
          </h1>

          <p className="text-sm mt-1 opacity-90">
            Order ID: {order.id}
          </p>
          <p className="text-sm opacity-90">
            {order.table}
          </p>
        </header>

        {/* ================= ETA CARD ================= */}
        <section className="-mt-10 px-4">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3">
            <Clock className="text-orange-500" size={22} />
            <div>
              <p className="text-xs text-gray-500">
                Estimated Time
              </p>
              <p className="font-semibold text-orange-500">
                {order.eta}
              </p>
            </div>
          </div>
        </section>

        {/* ================= STATUS TIMELINE ================= */}
        <section className="px-4 mt-8">
          <h2 className="text-sm font-semibold mb-4">
            Order Status
          </h2>

          <StatusTimeline />
        </section>

        {/* ================= ORDER ITEMS ================= */}
        <section className="px-4 mt-8">
          <h2 className="text-sm font-semibold mb-4">
            Order Items
          </h2>

          <div className="bg-white rounded-xl border divide-y">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-4 py-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="text-sm font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BILL SUMMARY ================= */}
        <section className="px-4 mt-6">
          <div className="bg-white rounded-xl border p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* ================= STICKY CTA ================= */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white px-4 py-4 border-t">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold active:scale-95 transition"
          >
            Main Menu
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ======================================================
   STATUS TIMELINE
====================================================== */

import ReadyIcon from "../assets/ready_icon.png";

/* ... imports ... */

function StatusTimeline() {
  const steps = [
    {
      title: "Order Received",
      subtitle: "We’ve got your order",
      iconType: "lucide",
      icon: CheckCircle,
      active: true
    },
    {
      title: "In Kitchen",
      subtitle: "Being prepared",
      iconType: "lucide",
      icon: ChefHat,
      active: true
    },
    {
      title: "Ready",
      subtitle: "Your order is ready to be served",
      iconType: "image",
      image: ReadyIcon,
      active: false
    },
    {
      title: "Served",
      subtitle: "Enjoy your meal!",
      iconType: "lucide",
      icon: Smile,
      active: false
    }
  ];
  /* ... rest of component ... */

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-[2px] bg-gray-200">
        <div className="h-1/2 bg-orange-500 transition-all duration-700" />
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => (
          <StatusStep key={idx} {...step} />
        ))}
      </div>
    </div>
  );
}

/* ======================================================
   STATUS STEP
====================================================== */

function StatusStep({
  title,
  subtitle,
  iconType,
  icon: Icon,
  image,
  active
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${active ? "bg-orange-500" : "bg-gray-200"
          }`}
      >
        {iconType === "lucide" ? (
          <Icon
            size={16}
            className={active ? "text-white" : "text-gray-400"}
          />
        ) : (
          <img
            src={image}
            alt="Ready"
            className="w-4 h-4 object-contain"
          />
        )}
      </div>

      <div>
        <p
          className={`text-sm ${active ? "font-semibold" : "font-medium"
            }`}
        >
          {title}
        </p>
        <p className="text-xs text-gray-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
