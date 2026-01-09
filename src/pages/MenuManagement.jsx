import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import {
  PlusCircle,
  Tag,
  Edit3,
  Upload,
  CheckCircle,
  Leaf,
  Drumstick,
  Image as ImageIcon,
} from "lucide-react";

export default function MenuManagement() {
  const [activeTab, setActiveTab] = useState("item");

  // Upload states
  const [itemImage, setItemImage] = useState(null);
  const [offerImage, setOfferImage] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // Mock existing item for Edit tab
  const [editItem, setEditItem] = useState({
    name: "Paneer Tikka",
    description: "Spicy grilled paneer starter",
    price: 250,
    category: "Starters",
    foodType: "veg",
    available: true,
    imageUrl:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
  });

  // State for adding new item
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    foodType: "veg",
    category: "Category",
    available: true,
  });

  const handleCreateItem = () => {
    if (!newItem.name || !newItem.price) {
      alert("Please fill in required fields");
      return;
    }
    alert("New Item Created Successfully!");
    // Reset form
    setNewItem({
      name: "",
      description: "",
      price: "",
      foodType: "veg",
      category: "Category",
      available: true,
    });
    setItemImage(null);
  };

  /* ================= MODERN TAB STYLES ================= */
  const tabBase =
    "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2";
  const tabActive = "bg-black text-white shadow-lg transform scale-105";
  const tabInactive =
    "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black";

  return (
    <PageWrapper>
      {/* Page Title */}
      <h1 className="text-2xl font-semibold mb-1">Menu Management</h1>
      <p className="text-sm text-[var(--text-gray)] mb-6">
        Manage your restaurant menu items
      </p>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setActiveTab("item")}
          className={`${tabBase} ${activeTab === "item" ? tabActive : tabInactive
            }`}
        >
          <PlusCircle size={18} />
          Add New Item
        </button>

        <button
          onClick={() => setActiveTab("offer")}
          className={`${tabBase} ${activeTab === "offer" ? tabActive : tabInactive
            }`}
        >
          <Tag size={18} />
          Add New Offer
        </button>

        <button
          onClick={() => setActiveTab("edit")}
          className={`${tabBase} ${activeTab === "edit" ? tabActive : tabInactive
            }`}
        >
          <Edit3 size={18} />
          Edit Item
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-lg">

        {/* ================= ADD NEW ITEM ================= */}
        {activeTab === "item" && (
          <>
            <h2 className="font-medium mb-6 flex items-center gap-2">
              <PlusCircle size={18} /> Add New Menu Item
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  className="input"
                  placeholder="Item Name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <textarea
                  className="input"
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <input
                  type="number"
                  min="0"
                  className="input"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  onKeyDown={(e) => ["-", "e"].includes(e.key) && e.preventDefault()}
                />

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Drumstick size={16} className="text-red-600" />
                    <input
                      type="radio"
                      name="foodType"
                      checked={newItem.foodType === "nonveg"}
                      onChange={() => setNewItem({ ...newItem, foodType: "nonveg" })}
                    />{" "}
                    Non-Veg
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Leaf size={16} className="text-green-600" />
                    <input
                      type="radio"
                      name="foodType"
                      checked={newItem.foodType === "veg"}
                      onChange={() => setNewItem({ ...newItem, foodType: "veg" })}
                    />{" "}
                    Veg
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <select
                  className="input"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                >
                  <option>Category</option>
                  <option>Starters</option>
                  <option>Main Course</option>
                  <option>Drinks</option>
                </select>

                {/* Upload */}
                <UploadBox file={itemImage} setFile={setItemImage} />

                <div
                  className="flex items-center gap-2 text-sm cursor-pointer"
                  onClick={() => setNewItem({ ...newItem, available: !newItem.available })}
                >
                  <CheckCircle
                    size={16}
                    className={newItem.available ? "text-green-600" : "text-gray-300"}
                  />
                  Available for Ordering
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button className="btn-outline">Cancel</button>
              <button className="btn-primary" onClick={handleCreateItem}>
                <PlusCircle size={16} /> Create Item
              </button>
            </div>
          </>
        )}

        {/* ================= ADD OFFER ================= */}
        {activeTab === "offer" && (
          <>
            <h2 className="font-medium mb-6 flex items-center gap-2">
              <Tag size={18} /> Add New Offer
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input className="input" placeholder="Offer Name" />
              <UploadBox file={offerImage} setFile={setOfferImage} />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button className="btn-outline">Cancel</button>
              <button
                onClick={() =>
                  offerImage
                    ? alert("Offer added to banner")
                    : alert("Upload offer image")
                }
                className="btn-primary"
              >
                <PlusCircle size={16} /> Add to Banner
              </button>
            </div>
          </>
        )}

        {/* ================= EDIT ITEM ================= */}
        {/* ================= EDIT ITEM ================= */}
        {activeTab === "edit" && (
          <>
            <h2 className="font-medium mb-6 flex items-center gap-2">
              <Edit3 size={18} /> Edit Menu Item
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* LEFT */}
              <div className="space-y-4">
                <input
                  className="input"
                  value={editItem.name}
                  onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                  placeholder="Item Name"
                />

                <textarea
                  className="input"
                  value={editItem.description}
                  onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                  placeholder="Description"
                />

                <input
                  type="number"
                  min="0"
                  className="input"
                  value={editItem.price}
                  onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                  placeholder="Price"
                  onKeyDown={(e) => ["-", "e"].includes(e.key) && e.preventDefault()}
                />

                {/* FOOD TYPE */}
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Drumstick size={16} className="text-red-600" />
                    <input
                      type="radio"
                      name="editFoodType"
                      checked={editItem.foodType === "nonveg"}
                      onChange={() => setEditItem({ ...editItem, foodType: "nonveg" })}
                    />
                    Non-Veg
                  </label>

                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Leaf size={16} className="text-green-600" />
                    <input
                      type="radio"
                      name="editFoodType"
                      checked={editItem.foodType === "veg"}
                      onChange={() => setEditItem({ ...editItem, foodType: "veg" })}
                    />
                    Veg
                  </label>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <select
                  className="input"
                  value={editItem.category}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                >
                  <option>Starters</option>
                  <option>Main Course</option>
                  <option>Drinks</option>
                </select>

                {/* IMAGE PREVIEW */}
                <div className="border rounded-lg p-3">
                  <p className="text-sm mb-2 flex items-center gap-2">
                    <ImageIcon size={16} /> Current Image
                  </p>

                  <img
                    src={
                      editImage
                        ? URL.createObjectURL(editImage)
                        : editItem.imageUrl
                    }
                    className="w-full h-48 object-contain bg-gray-50 rounded-xl border border-gray-100"
                  />
                </div>

                {/* UPLOAD */}
                <UploadBox file={editImage} setFile={setEditImage} />

                {/* AVAILABLE */}
                <div className="flex items-center gap-2 text-sm cursor-pointer" onClick={() => setEditItem({ ...editItem, available: !editItem.available })}>
                  <CheckCircle size={16} className={editItem.available ? "text-green-600" : "text-gray-300"} />
                  Available for Ordering
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 mt-8">
              <button className="btn-outline">Cancel</button>
              <button
                className="btn-primary"
                onClick={() => alert("Items updated successfully!")}
              >
                <Edit3 size={16} /> Update Item
              </button>
            </div>
          </>
        )}

      </div>
    </PageWrapper>
  );
}

/* ================= REUSABLE UPLOAD ================= */

function UploadBox({ file, setFile }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
        <Upload size={14} /> Upload Image
      </label>
      <div className="border border-dashed border-gray-300 rounded-xl p-1 flex gap-2 items-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
        <input
          readOnly
          value={file ? file.name : ""}
          placeholder="No file selected"
          className="flex-1 bg-transparent px-3 text-sm text-gray-600 outline-none placeholder:text-gray-400"
        />
        <label className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-900 transition-colors flex items-center gap-2">
          <Upload size={14} />
          Browse
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
      </div>
      {file && (
        <p className="text-xs text-green-600 font-medium pl-1 flex items-center gap-1">
          <CheckCircle size={12} /> {file.name}
        </p>
      )}
    </div>
  );
}

