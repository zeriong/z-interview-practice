import { INTERVIEW_DATA } from "@/shared/constants";

export default function NavList({
  onItemClick,
}: {
  onItemClick: (i: number) => void;
}) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {INTERVIEW_DATA.map((item, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => onItemClick(index)}
            className="w-full rounded-lg bg-gray-100 p-3 text-left"
          >
            <span className="wrap-break-word text-[15px] leading-snug text-gray-700">
              {item.question}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
