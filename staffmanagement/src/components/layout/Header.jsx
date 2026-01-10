import { useNavigate } from "react-router-dom";

/**
 * Header
 * ------
 * Reusable header with back button
 * Matches Figma UI (← icon only)
 * Senior-level implementation
 */
export default function Header({ title = "Order Management" }) {
  const navigate = useNavigate();

  return (
    <header className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm">
      
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="text-xl font-medium"
        aria-label="Go back"
      >
        ←
      </button>

      {/* PAGE TITLE */}
      <h1 className="font-semibold text-base">
        {title}
      </h1>

    </header>
  );
}
