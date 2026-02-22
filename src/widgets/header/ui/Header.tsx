import { Link, useRouterState } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/entities/sidebar/model";
import { HamburgerIcon } from "@/shared/ui/icons";

export default function Header() {
  const { toggle } = useSidebarStore();
  const isQuizPage = useRouterState({
    select: (s) => s.location.pathname === "/quiz",
  });

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md">
      <div
        className={twMerge(
          "mx-auto flex items-center justify-between",
          "px-4 py-2",
        )}
      >
        {/* 좌측: 메뉴 버튼 (모바일 전용) */}
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={toggle}
          className={twMerge(
            "flex h-10 w-10 items-center justify-center md:hidden",
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

        {/* 우측: Quiz / Show All 토글 */}
        <Link
          to={isQuizPage ? "/" : "/quiz"}
          className={twMerge(
            "rounded-lg px-4 py-2 text-sm font-semibold",
            "transition-colors",
            isQuizPage
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-primary text-white hover:bg-primary/90",
          )}
        >
          {isQuizPage ? "Show All" : "Quiz"}
        </Link>
      </div>
    </header>
  );
}
