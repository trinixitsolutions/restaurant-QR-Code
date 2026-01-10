export default function InputField({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  maxLength,
  inputMode,
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        inputMode={inputMode}
        className={`w-full border rounded-xl px-4 py-3 text-sm outline-none
        focus:ring-2 focus:ring-black
        ${error ? "border-red-500" : "border-gray-300"}`}
      />

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
