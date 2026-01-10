import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  minLength = 8,
  maxLength = 20,
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          minLength={minLength}
          maxLength={maxLength}
          className={`w-full border rounded-xl px-4 py-3 pr-12 text-sm outline-none
          focus:ring-2 focus:ring-black
          ${error ? "border-red-500" : "border-gray-300"}`}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
