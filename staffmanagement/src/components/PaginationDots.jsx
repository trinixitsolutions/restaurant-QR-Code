export default function PaginationDots({ total, activeIndex, onClick }) {
    return (
        <div className="flex justify-center gap-1 mt-2">
            {Array.from({ length: total }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onClick && onClick(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-orange-500" : "bg-gray-300"
                        }`}
                />
            ))}
        </div>
    );
}
