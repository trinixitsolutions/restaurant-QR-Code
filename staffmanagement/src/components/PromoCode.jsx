import { useState } from "react";

export default function PromoCode({ subtotal, onApply }) {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const PROMOS = {
        SAVE10: 0.1,
        FIRST50: 50,
    };

    const applyCode = () => {
        setError("");
        setSuccess("");

        if (!PROMOS[code]) {
            setError("Invalid promo code");
            return;
        }

        let discount =
            typeof PROMOS[code] === "number"
                ? subtotal * PROMOS[code]
                : PROMOS[code];

        onApply(discount);
        setSuccess("Promo applied successfully");
    };

    return (
        <div className="bg-white rounded-xl p-4 space-y-3 text-sm">
            <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter promo code"
                className="w-full border rounded-lg px-3 py-2 outline-none text-black placeholder:text-gray-400"
            />

            <button
                onClick={applyCode}
                className="w-full bg-[#F97316] text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
                Apply
            </button>

            {error && <p className="text-red-500 font-medium text-xs">{error}</p>}
            {success && <p className="text-green-600 font-medium text-xs">{success}</p>}
        </div>
    );
}
