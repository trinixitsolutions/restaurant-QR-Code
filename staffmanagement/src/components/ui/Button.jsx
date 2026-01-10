import React from "react";

const variants = {
  primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-sm",
  secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200",
  outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  black: "bg-black hover:bg-gray-800 text-white shadow-sm",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
