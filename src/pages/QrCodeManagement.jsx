import { useEffect, useRef, useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import { Icon } from "@iconify/react";
import QRCode from "react-qr-code";

/* ================= MOCK API ================= */
const fetchQrData = (type) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 8 }, (_, i) =>
          type === "TABLE"
            ? `T-${String(i + 1).padStart(2, "0")}`
            : `R-${String(i + 1).padStart(2, "0")}`
        )
      );
    }, 1000);
  });

/* ================= COMPONENT ================= */

export default function QrCodeManagement() {
  const [tab, setTab] = useState("TABLE");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchQrData(tab).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [tab]);

  const filtered = data.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="min-h-screen bg-white px-6 py-4">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold">QR Code Management</h1>

          <div className="relative w-full sm:w-80 group">
            <Icon
              icon="mdi:magnify"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              width={20}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${tab.toLowerCase()}...`}
              className="
                w-full
                pl-11 pr-5 py-3
                bg-white border-2 border-transparent
                rounded-full text-sm font-medium
                shadow-sm
                focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10
                placeholder:text-gray-400
                transition-all duration-300
              "
            />
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex gap-3 mb-10">
          {["TABLE", "ROOM"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
                px-8 py-2.5 rounded-full text-sm font-bold transition-all duration-300
                ${tab === t
                  ? "bg-black text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-500 border border-gray-100 hover:text-black hover:bg-gray-50 hover:shadow-sm"
                }
              `}
            >
              {t}
            </button>
          ))}
        </div>

        {/* ================= GRID (FIXED) ================= */}
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-3 sm:gap-6 md:gap-8
            justify-items-center
          "
        >
          {/* SKELETON */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}

          {!loading &&
            filtered.map((id, index) => {
              const isActive = index % 2 === 0;

              return (
                <div
                  key={id}
                  className="
                    w-full
                    max-w-[280px]
                    bg-white
                    rounded-3xl
                    shadow-sm
                    border border-gray-100
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-1
                  "
                >
                  {/* IMAGE */}
                  <div className="relative p-3">
                    <img
                      src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                      alt="Food"
                      className="h-48 w-full object-cover rounded-2xl"
                    />

                    {/* STATUS BADGE */}
                    <span
                      className={`
                        absolute top-6 right-6
                        px-3 py-1.5
                        text-xs font-bold
                        rounded-full shadow-sm
                        backdrop-blur-md bg-white/90
                        ${isActive
                          ? "text-green-600 border border-green-100"
                          : "text-orange-600 border border-orange-100"
                        }
                      `}
                    >
                      {isActive ? "● Active" : "● In Use"}
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="px-6 pb-6 text-center">
                    <p className="font-bold text-gray-900 text-lg mb-6">
                      {tab === "TABLE"
                        ? `Table No ${id}`
                        : `Room No ${id}`}
                    </p>

                    <button
                      onClick={() => {
                        setSelected(`${tab}-${id}`);
                        setShowModal(true);
                      }}
                      className="
                        w-full
                        bg-black hover:bg-gray-900
                        text-white
                        py-3.5
                        rounded-2xl
                        text-sm font-bold
                        shadow-md hover:shadow-lg
                        transition-all duration-300
                        active:scale-95
                        flex items-center justify-center gap-2
                      "
                    >
                      <Icon icon="mdi:qrcode" width={18} />
                      Generate QR Code
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

        {/* ================= MODAL ================= */}
        {showModal && (
          <QrModal value={selected} onClose={() => setShowModal(false)} />
        )}
      </div>
    </PageWrapper>
  );
}

/* ================= QR MODAL ================= */

function QrModal({ value, onClose }) {
  const qrRef = useRef();

  const downloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(source);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const a = document.createElement("a");
      a.download = `${value}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-[380px] p-8 shadow-2xl animate-scaleIn relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600" />

        <h2 className="font-bold text-xl text-center mb-6 text-gray-900 flex items-center justify-center gap-2">
          <Icon icon="mdi:qrcode-scan" className="text-blue-600" />
          {value}
        </h2>

        <div ref={qrRef} className="flex justify-center mb-8 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <QRCode value={value} size={200} />
        </div>

        <div className="flex gap-4">
          <button
            onClick={downloadQR}
            className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:download" />
            Download
          </button>

          <button
            onClick={() => window.print()}
            className="flex-1 bg-white border-2 border-gray-100 hover:border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Icon icon="mdi:printer" />
            Print
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
        >
          Close
        </button>
      </div>
    </div>
  );
}

/* ================= SKELETON ================= */

function SkeletonCard() {
  return (
    <div
      className="
        w-full
        max-w-[260px]
        bg-white
        border
        rounded-3xl
        shadow-lg
        p-4
        animate-pulse
      "
    >
      <div className="h-44 bg-gray-200 rounded-2xl mb-6" />
      <div className="h-4 bg-gray-200 rounded mb-4" />
      <div className="h-12 bg-gray-200 rounded-xl" />
    </div>
  );
}
