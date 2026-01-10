export default function PrimaryButton({
  text,
  onClick,
  disabled,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`w-full py-3 rounded-lg font-medium transition-all duration-200 transform active:scale-[0.98]
      ${disabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-black text-white hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
        }`}
    >
      {text}
    </button>
  );
}
