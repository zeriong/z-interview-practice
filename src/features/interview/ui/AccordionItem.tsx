import { type ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  question: string;
  answer: string;
  isChild?: boolean;
  children?: ReactNode;
}

export default function AccordionItem({
  question,
  answer,
  isChild = false,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isChild ? "border-l-2 border-gray-100 pl-4" : ""}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-3 py-3 text-left"
      >
        <span className="text-[16px] font-semibold leading-snug text-gray-800">
          {question}
        </span>
        <span
          className={`mt-1 shrink-0 text-gray-400 transition-transform duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronIcon />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className={twMerge(
              "p-3 text-[14px] leading-relaxed text-gray-700",
              "bg-gray-100/80 rounded-xl",
              "md:p-4 md:text-[15px] md:rounded-2xl",
            )}
          >
            {answer}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
