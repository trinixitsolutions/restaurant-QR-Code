# Frontend Development Status Report

## Overview
This document outlines the current state of frontend development for the **QR Code Hotel Management Project**. The solution consists of two distinct applications:
1.  **User Frontend (`userfrontend`)**: A guest-facing application for ordering food, tracking orders, and managing profile.
2.  **Staff Management (`staffmanagement`)**: An admin/staff application for managing orders, billing, and table/room selection.

---

## 1. User Frontend (`userfrontend`)
*A mobile-responsive web application for hotel guests.*

### **Features & Pages**
#### **Authentication & Profile**
*   **Login / Sign In**: Guest authentication (`Login.jsx`, `SignIn.jsx`).
*   **Sign Up**: Registration for new guests (`SignUp.jsx`).
*   **Forgot Password**: Password recovery flow (`ForgotPassword.jsx`).
*   **Profile Management**: View and edit user details (`Profile.jsx`, `ProfileView.jsx`, `ProfileDetails.jsx`).

#### **Ordering Flow**
*   **Home / Dashboard**: Overview of offers, popular items, and categories (`Home.jsx`, `Dashboard.jsx`).
*   **Menu**: Full menu browsing with category filters (`Menu.jsx`).
*   **Add to Cart**: Item customization and addition to cart (`AddToCart.jsx`).
*   **Cart**: Review order, apply promo codes, and checkout (`Cart.jsx`).
*   **Payment**: Payment gateway simulator/integration (`Payment.jsx`).
*   **Bill**: Final bill view (`Bill.jsx`).

#### **Order Tracking & History**
*   **Order Confirmation**: Immediate post-order status (`OrderConfirmation.jsx`).
*   **Order Tracking**: Real-time status timeline (Confirmed -> Preparing -> Delivered) (`OrderTracking.jsx`).
*   **Order Success**: Success acknowledgement page (`OrderSuccess.jsx`).
*   **Order History**: List of past orders (`OrderHistory.jsx`).

#### **Support**
*   **Support**: Help and contact information (`Support.jsx`).

### **Key Components**
*   **Navigation**: `BottomNav.jsx` for persistent mobile navigation.
*   **Display**: `FoodCard.jsx`, `Banner.jsx`, `Categories.jsx`, `EmptyCart.jsx`.
*   **Utilities**: `SearchBar.jsx`, `PromoCode.jsx`, `NotificationSheet.jsx`.
*   **Layout**: `PageWrapper.jsx` (handles page transitions and framer-motion animations).

---

## 2. Staff Management (`staffmanagement`)
*An administrative application for hotel staff to manage operations.*

### **Features & Pages**
#### **Authentication**
*   **Login**: Staff secure login (`Login.jsx`).
*   **Sign Up**: New staff registration (`SignUp.jsx`).

#### **Order Management (Core Feature)**
*   **Order Management**: Central hub for viewing and updating orders (`OrderManagement.jsx`).
    *   **Pending Orders**: New incoming orders appear at the top for immediate confirmation.
    *   **Order Stages**: Filter orders by "Confirm", "Preparing", and "Delivered" tabs.
    *   **Real-time Updates**: Status changes reflect immediately without reloading (recently fixed).
*   **Quick Bill**: Fast billing generation (`QuickBill.jsx`).
*   **Table/Room Select**: Interface to select specific tables or rooms for orders (`TableRoomSelect.jsx`).

#### **Menu & Ordering (Staff Side)**
*   **Menu Selection**: Staff can browse the menu to place orders for guests (`MenuSelection.jsx`).
*   **Cart**: Checkout process for staff-placed orders (`Cart.jsx`).

#### **Staff Profile & Support**
*   **Profile**: Staff dashboard (`Profile.jsx`, `ProfileView.jsx`).
*   **Support**: Internal support resources (`Support.jsx`).

### **Key Components**
*   **Order Components** (`src/components/orders/`):
    *   `PendingOrderCard.jsx`: Highlights new orders requiring action.
    *   `OrderCard.jsx`: Displays active order details with status-specific styling.
    *   `OrderStatusTabs.jsx`: Navigation for different order stages.
    *   `OrderTypeToggle.jsx`: Switch between "Table" and "Room" orders.
    *   `OrderActionModal.jsx`: Modal for specific order actions.
*   **Shared**: `PromoCode.jsx`, `PageWrapper.jsx`.

---

## 3. Technology Stack
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS, Vanilla CSS (`index.css`)
*   **Animations**: Framer Motion (`PageWrapper`, `OrderManagement` list transitions)
*   **Icons**: Lucide React, React Icons
*   **Notifications**: React Hot Toast
*   **Routing**: React Router DOM

## 4. Recent Updates
*   **Order Management Fix**: Resolved an issue where confirmed orders required a page reload to appear. Implemented `AnimatePresence` and forced layout updates to ensure instant UI reflection of status changes.
