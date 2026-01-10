import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { FiChevronLeft, FiLogOut } from "react-icons/fi";

export default function ProfileView() {
    const navigate = useNavigate();

    // Mock User Data (or read from localStorage in real app)
    const user = {
        name: "Rajesh Kumar",
        role: "Senior Waiter",
        id: "EMP-2024-001",
        branch: "Main Branch, MG Road",
        phone: "+91 98765 43210",
        email: "rajesh.k@cravings.com"
    };

    return (
        <PageWrapper className="bg-[#F5F7FB] min-h-screen max-w-[430px] mx-auto">
            {/* Header */}
            <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-gray-100">
                <button onClick={() => navigate(-1)} className="p-1">
                    <FiChevronLeft size={28} className="text-black" />
                </button>
                <h1 className="text-xl font-bold text-black flex-1 text-center pr-8">My Profile</h1>
            </div>

            <div className="p-6">
                {/* Avatar */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500 mb-3 shadow-inner">
                        {user.name.charAt(0)}
                    </div>
                    <h2 className="text-lg font-bold text-black">{user.name}</h2>
                    <span className="text-orange-500 font-medium text-sm bg-orange-50 px-3 py-1 rounded-full mt-1">
                        {user.role}
                    </span>
                </div>

                {/* Details Card */}
                <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
                    <ProfileRow label="Employee ID" value={user.id} />
                    <ProfileRow label="Phone" value={user.phone} />
                    <ProfileRow label="Email" value={user.email} />
                    <ProfileRow label="Branch" value={user.branch} />
                </div>

                {/* Actions */}
                <button className="w-full mt-6 bg-white text-red-500 border border-red-100 py-3 rounded-xl font-semibold shadow-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
                    <FiLogOut /> Logout
                </button>

            </div>
        </PageWrapper>
    );
}

function ProfileRow({ label, value }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
            <span className="text-gray-400 text-sm font-medium">{label}</span>
            <span className="text-black text-sm font-semibold">{value}</span>
        </div>
    );
}
