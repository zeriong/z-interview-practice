import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
  isChild?: boolean;
}

export default function AccordionItem({
  question,
  answer,
  isChild = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={isChild ? 'border-l-2 border-gray-100 pl-4' : ''}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-3 py-3 text-left"
      >
        <span className="text-[20px] font-medium leading-snug text-gray-800">
          {question}
        </span>
        <span
          className={`mt-1 shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          <ChevronIcon />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[800px]' : 'max-h-0'
        }`}
      >
        <p className="pb-4 text-[15px] leading-relaxed text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
