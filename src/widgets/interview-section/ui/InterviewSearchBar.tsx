import { twMerge } from "tailwind-merge";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function InterviewSearchBar({ value, onChange }: Props) {
  return (
    <div
      className={twMerge(
        "sticky top-0 z-10",
        "px-4 pt-4 pb-4 md:px-8 md:pt-8 md:pb-4",
      )}
    >
      <div className="rounded-xl bg-white/60 p-2 backdrop-blur-sm">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="질문 및 답변 통합 검색..."
          className={twMerge(
            "w-full rounded-lg border-3 border-gray-200 shadow-xl",
            "bg-white px-4 py-3 text-sm text-gray-700",
            "placeholder:text-gray-400 focus:border-primary focus:outline-none",
          )}
        />
      </div>
    </div>
  );
}
