import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/entities/sidebar/model";
import { HamburgerIcon, QuizIcon } from "@/shared/ui/icons";

export default function Header() {
  const { toggle } = useSidebarStore();

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <div
        className={twMerge(
          "mx-auto flex items-center justify-between",
          "px-4 py-2",
        )}
      >
        {/* 좌측: 메뉴 버튼 */}
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={toggle}
          className={twMerge(
            "flex h-10 w-10 items-center justify-center",
            "rounded-lg text-gray-600 hover:bg-gray-100",
            "transition-colors",
          )}
        >
          <HamburgerIcon />
        </button>

        {/* 중앙: 제목 */}
        <h1 className="text-xl font-bold text-gray-600 md:text-3xl">
          Frontend Questions!
        </h1>

        {/* 우측: Quiz 버튼 (미구현) */}
        <button
          type="button"
          aria-label="퀴즈 모드 (준비 중)"
          disabled
          className={twMerge(
            "flex h-10 w-10 items-center justify-center",
            "rounded-lg text-gray-600",
            "opacity-50 cursor-not-allowed",
          )}
        >
          <QuizIcon />
        </button>
      </div>
    </header>
  );
}
