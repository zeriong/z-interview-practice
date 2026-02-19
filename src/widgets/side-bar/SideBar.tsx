import { INTERVIEW_DATA } from "@/shared/constants";

export default function SideBar() {
  const handleScrollTo = (index: number) => {
    const element = document.getElementById(`interview-q-${index}`);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="flex h-full w-[400px] flex-col p-[30px] shadow-lg">
      <div className="text-[32px] font-bold">
        <p className="text-[40px] text-primary">Preparing</p>
        <p className="ml-10 text-gray-500">
          for <span className="text-[40px] text-pr-orange">interview</span>
        </p>
      </div>

      <ul className="flex flex-1 flex-col gap-3 overflow-auto mt-20">
        {INTERVIEW_DATA.map((item, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => handleScrollTo(index)}
              className="w-full rounded-lg bg-gray-100 p-4 text-left"
            >
              <span className="wrap-break-word text-[16px] leading-snug text-gray-700">
                {item.question}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
