import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useAuth } from "../context/AuthContext";
import InputField from "../auth/components/InputField";
import PrimaryButton from "../auth/components/PrimaryButton";
import toast from "react-hot-toast";

export default function ProfileView() {
  const navigate = useNavigate();
  const { user, setUserProfile } = useAuth();

  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Mock user fallback if Auth context is empty
  const defaultUser = {
    name: "Veer",
    email: "veer@example.com",
    contact: "+91 98765 00000",
    tableRoom: "Table 5",
    location: "Main Hall"
  };

  const activeUser = user || defaultUser;

  // Form State
  const [formData, setFormData] = useState(activeUser);

  // Sync state when user context changes or edit mode opens
  useEffect(() => {
    setFormData(user || defaultUser);
  }, [user, isEditing]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Basic validation
    if (!formData.name || !formData.contact) {
      toast.error("Name and Contact are required");
      return;
    }

    // Save to context
    setUserProfile(formData);
    toast.success("Profile Updated Successfully");
    setIsEditing(false);
  };

  return (
    <PageWrapper className="min-h-screen bg-white max-w-[430px] mx-auto pb-8">

      {/* HEADER */}
      <header className="h-14 flex items-center border-b px-4">
        <button onClick={() => isEditing ? setIsEditing(false) : navigate(-1)}>
          <FiArrowLeft size={22} />
        </button>
        <h1 className="ml-4 font-semibold">
          {isEditing ? "Edit Profile" : "Profile Details"}
        </h1>
      </header>

      {/* CONTENT */}
      <div className="p-4">

        {/* Avatar (Always Visible) */}
        <div className="flex justify-center my-6">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-400 border border-gray-200">
            {formData.name?.charAt(0) || "U"}
          </div>
        </div>

        {isEditing ? (
          /* ===== EDIT MODE FORM ===== */
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="text-xs text-gray-500 mb-1 block ml-1">Name</label>
              <InputField
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter Name"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block ml-1">Email</label>
              <InputField
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter Email"
                type="email"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block ml-1">Phone</label>
              <InputField
                value={formData.contact}
                onChange={(e) => handleInputChange("contact", e.target.value)}
                placeholder="Enter Phone Number"
                type="tel"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block ml-1">Table / Room</label>
              <InputField
                value={formData.tableRoom}
                onChange={(e) => handleInputChange("tableRoom", e.target.value)}
                placeholder="Table No"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block ml-1">Location</label>
              <InputField
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Location (Optional)"
              />
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 py-3 rounded-xl font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-orange-500 shadow-md active:scale-95 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          /* ===== VIEW MODE ===== */
          <div className="space-y-2 animate-fadeIn">
            <ProfileRow label="Name" value={activeUser.name} />
            <ProfileRow label="Email" value={activeUser.email} />
            <ProfileRow label="Phone" value={activeUser.contact} />
            <ProfileRow label="Table / Room" value={activeUser.tableRoom} />
            {activeUser.location && (
              <ProfileRow label="Location" value={activeUser.location} />
            )}

            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-8 bg-orange-500 text-white py-3 rounded-xl font-semibold shadow-lg active:scale-95 transition"
            >
              Edit Profile
            </button>
          </div>
        )}

      </div>
    </PageWrapper >
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-gray-100 py-3.5 items-center">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="font-medium text-gray-900 text-[15px]">{value || "-"}</span>
    </div>
  );
}
