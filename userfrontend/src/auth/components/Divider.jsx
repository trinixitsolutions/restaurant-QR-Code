export default function Divider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400">or</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}
