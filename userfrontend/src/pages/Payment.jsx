import { FiArrowLeft, FiCreditCard, FiSmartphone, FiDollarSign, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BottomNav from "../components/BottomNav";

export default function Payment() {
    const navigate = useNavigate();

    return (
        <PageWrapper className="min-h-screen bg-gray-50 pb-24 max-w-[430px] mx-auto">
            {/* HEADER */}
            <header className="sticky top-0 z-20 bg-white border-b px-4 h-14 flex items-center justify-between">
                <button onClick={() => navigate(-1)} className="active:scale-95 transition">
                    <FiArrowLeft size={22} className="text-black" />
                </button>
                <h1 className="text-base font-semibold text-black">Payment Methods</h1>
                <div className="w-5" />
            </header>

            <div className="p-4 space-y-6">

                {/* CARDS */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Saved Cards</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 flex items-center gap-4 border-b border-gray-50">
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                <FiCreditCard size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">HDFC Bank Credit Card</p>
                                <p className="text-xs text-gray-400">**** 4582</p>
                            </div>
                            <input type="radio" name="payment" className="accent-orange-500 w-4 h-4" defaultChecked />
                        </div>

                        <button className="w-full py-3 text-orange-500 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors">
                            <FiPlus /> Add New Card
                        </button>
                    </div>
                </section>

                {/* UPI */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">UPI</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                <FiSmartphone size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Google Pay</p>
                                <p className="text-xs text-gray-400">veer@okhdfcbank</p>
                            </div>
                            <input type="radio" name="payment" className="accent-orange-500 w-4 h-4" />
                        </div>
                    </div>
                </section>

                {/* CASH */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Cash</h2>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 flex items-center gap-4">
                            <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600">
                                <FiDollarSign size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-sm">Pay at Counter</p>
                                <p className="text-xs text-gray-400">Cash or Card</p>
                            </div>
                            <input type="radio" name="payment" className="accent-orange-500 w-4 h-4" />
                        </div>
                    </div>
                </section>

            </div>

            <BottomNav />
        </PageWrapper>
    );
}
