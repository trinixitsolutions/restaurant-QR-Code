import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // 🔥 REQUIRED
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from "./context/OrderContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OrderProvider>
        <App />
      </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
