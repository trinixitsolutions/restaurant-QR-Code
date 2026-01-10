export default function SecondaryButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 rounded-lg border border-gray-300 text-sm font-medium"
    >
      {text}
    </button>
  );
}
