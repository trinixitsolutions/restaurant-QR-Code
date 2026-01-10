export default function PaginationDots({
  total,
  activeIndex,
  onChange,
}) {
  return (
    <div className="flex justify-center gap-1.5 mt-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          onClick={() => onChange(i)}
          className={`w-[4px] h-[4px] rounded-full cursor-pointer ${
            i === activeIndex ? "bg-gray-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
