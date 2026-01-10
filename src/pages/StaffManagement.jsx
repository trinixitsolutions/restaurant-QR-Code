import { useState, useEffect } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import { Icon } from "@iconify/react";

const STAFF_DATA = {
  name: "Dacchu",
  mobile: "9878784575",
  email: "dacchuajay1@gmail.com",
  role: "Admin",
  status: "Active",
};

const ROLES = ["Kitchen Staff", "Servant"];

const ROLE_ICONS = {
  "Kitchen Staff": "mdi:silverware-fork-knife",
  Servant: "mdi:account",
};

const ROLE_PERMISSIONS = {
  "Kitchen Staff": [
    "View Kitchen Orders (KOT)",
    "Change Order Status to 'Preparing' / 'Ready'",
    "View Item Details and Modifiers",
  ],
  Servant: [
    "View Assigned Orders",
    "Mark Orders as Served",
    "View Table and Order Notes",
  ],
};

export default function StaffManagement() {
  const [modalType, setModalType] = useState(null); // null | "add" | "edit"
  const [selectedRole, setSelectedRole] = useState("Kitchen Staff");
  const [status, setStatus] = useState("Active");

  const isEdit = modalType === "edit";
  const isOpen = modalType !== null;

  /* 🔒 Lock background scroll when modal open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  /* Initialize modal fields on open */
  useEffect(() => {
    if (!isOpen) return;
    if (isEdit) {
      setStatus(STAFF_DATA.status || "Active");
      setSelectedRole(STAFF_DATA.role || "Kitchen Staff");
    } else {
      setStatus("Active");
    }
  }, [isOpen, isEdit]);

  return (
    <PageWrapper>
      <div className="animate-page px-2 sm:px-0 space-y-8">

        {/* ================= PAGE HEADER ================= */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-black">
              Staff Management
            </h1>
            <p className="text-sm text-gray-500">
              Add staff to your account
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedRole("Kitchen Staff");
              setStatus("Active");
              setModalType("add");
            }}
            className="px-6 py-2.5 rounded-full bg-black text-white text-sm font-bold shadow-lg hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            + Add New Staff
          </button>
        </div>

        {/* ================= STAFF TABLE ================= */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="grid grid-cols-5 bg-gray-50/80 px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
            <span>Name</span>
            <span>Created On</span>
            <span>Role Type</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>

          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 px-6 py-4 border-t border-gray-50 text-sm items-center
                         hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="font-medium text-gray-900">Dacchu</span>
              <span className="text-gray-600">30 Dec 2025</span>
              <span className="font-medium text-gray-900">Admin</span>
              <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full w-fit">Active</span>

              <div className="text-right">
                <button
                  onClick={() => {
                    setSelectedRole("Admin");
                    setStatus(STAFF_DATA.status || "Active");
                    setModalType("edit");
                  }}
                  className="inline-flex items-center gap-2 text-gray-600 font-medium hover:text-black transition-colors"
                >
                  <Icon icon="mdi:pencil" width={16} />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= MODAL ================= */}
        {isOpen && (
          <div
            className="fixed inset-0 z-[9999] bg-black/40 flex items-start sm:items-center justify-center overflow-auto py-8 no-scrollbar"
            onClick={() => setModalType(null)}
          >
            <div
              className="bg-white w-full max-w-[920px] rounded-2xl p-8 shadow-xl relative border border-black/10
                         animate-[scaleIn_0.2s_ease-out] max-h-[90vh] overflow-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setModalType(null)}
                className="absolute top-5 right-5 text-xl hover:scale-110 transition"
                aria-label="Close"
              >
                <Icon icon="mdi:close" width={20} />
              </button>

              <h2 className="text-xl font-semibold mb-6">
                {isEdit ? "Edit Staff" : "Add New Staff"}
              </h2>

              {/* ================= FORM ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <Input
                  icon="mdi:account"
                  label="Full Name"
                  placeholder="Enter Full Name"
                  defaultValue={isEdit ? STAFF_DATA.name : ""}
                />

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex gap-6 mt-2 text-sm items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="staffStatus"
                        checked={status === "Active"}
                        onChange={() => setStatus("Active")}
                        className="accent-blue-600"
                      />
                      <Icon
                        icon={status === "Active" ? "mdi:check-circle" : "mdi:checkbox-blank-circle-outline"}
                        width={16}
                        className={status === "Active" ? "text-green-500" : "text-gray-300"}
                      />
                      <span>Active</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="staffStatus"
                        checked={status === "Inactive"}
                        onChange={() => setStatus("Inactive")}
                        className="accent-blue-600"
                      />
                      <Icon
                        icon={status === "Inactive" ? "mdi:close-circle" : "mdi:checkbox-blank-circle-outline"}
                        width={16}
                        className={status === "Inactive" ? "text-gray-500" : "text-gray-300"}
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Mobile Number</label>
                  <div className="flex mt-1 border rounded-lg overflow-hidden focus-within:ring-1 ring-blue-500">
                    <span className="px-3 bg-gray-100 flex items-center text-sm gap-2">
                      <Icon icon="mdi:phone" width={14} className="text-gray-500" />
                      +91
                    </span>
                    <input
                      defaultValue={isEdit ? STAFF_DATA.mobile : ""}
                      placeholder="Enter Mobile Number"
                      className="flex-1 px-4 py-2 text-sm outline-none"
                    />
                  </div>
                </div>

                <Input
                  icon="mdi:email"
                  label="Email Id"
                  placeholder="Enter Email ID"
                  defaultValue={isEdit ? STAFF_DATA.email : ""}
                />
              </div>

              {/* ================= USER ROLE ================= */}
              <div className="border border-dashed rounded-xl p-4 mb-6">
                <p className="font-semibold mb-3">User Role</p>

                <div className={`grid gap-6 grid-cols-1 sm:grid-cols-2`}>

                  {/* ROLE LIST */}
                  <div className="space-y-2">
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left px-4 py-2 rounded-lg cursor-pointer text-sm font-medium flex items-center gap-3 transition-all ${selectedRole === role ? "bg-blue-50 border-l-4 border-blue-600" : "hover:bg-gray-100"
                          }`}
                      >
                        <Icon icon={ROLE_ICONS[role]} width={18} className="text-gray-600" />
                        <span>{role}</span>
                      </button>
                    ))}
                  </div>

                  {/* ================= PERMISSIONS ================= */}
                  <div className="text-sm space-y-4">
                    <div className="border border-dashed rounded-xl p-4 min-h-[220px]">
                      <p className="font-semibold mb-3">{selectedRole} Can Do</p>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {ROLE_PERMISSIONS[selectedRole].map((perm) => (
                          <li key={perm}>{perm}</li>
                        ))}
                      </ul>
                    </div>

                    {isEdit && selectedRole === "Admin" && (
                      <div>
                        <p className="font-semibold mb-1">Admin Cannot Do</p>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          <li>Invoice & Tax Configuration</li>
                          <li>Activate / Deactivate Owner</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* ================= ACTIONS ================= */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setModalType(null)}
                  className="px-4 py-1 rounded-full bg-gray-100 text-sm hover:bg-gray-200 transition"
                >
                  Cancel
                </button>

                <button
                  className="px-6 py-2 rounded-full bg-black text-white text-sm font-bold shadow-lg hover:bg-gray-900 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  {isEdit ? "Save Changes" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

/* ================= INPUT ================= */
function Input({ label, placeholder, defaultValue, icon }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <div className="relative">
        {icon && (
          <Icon icon={icon} width={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        <input
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`w-full border border-gray-200 rounded-xl py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 ${icon ? 'pl-11 pr-4' : 'px-4'}`}
        />
      </div>
    </div>
  );
}
