import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { INTERVIEW_DATA } from "@/shared/constants";

export default function NavList({
  onItemClick,
}: {
  onItemClick: (i: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: INTERVIEW_DATA.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  return (
    <div ref={scrollRef} className="mt-4 min-h-0 flex-1 overflow-y-auto">
      <ul
        style={{
          height: virtualizer.getTotalSize(),
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const item = INTERVIEW_DATA[virtualRow.index];
          return (
            <li
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className="absolute left-0 top-0 w-full pb-3"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <button
                type="button"
                onClick={() => onItemClick(virtualRow.index)}
                className="w-full rounded-lg bg-gray-100 p-3 text-left"
              >
                <span className="wrap-break-word text-[15px] leading-snug text-gray-700">
                  {item.question}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
