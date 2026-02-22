import { useRouterState } from "@tanstack/react-router";
import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/entities/sidebar/model";
import { CloseIcon } from "@/shared/ui/icons";
import NavList from "./NavList";
import SidebarHeading from "./SidebarHeading";

interface Props {
  onClose?: () => void;
  onItemClick: (index: number) => void;
}

export default function SidebarContent({ onClose, onItemClick }: Props) {
  const isQuizPage = useRouterState({
    select: (s) => s.location.pathname === "/quiz",
  });
  const { sidebarTab, setSidebarTab } = useSidebarStore();

  const listLabel = isQuizPage ? "Quiz History" : "Interview List";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-6 md:mb-10 shrink-0 flex items-start justify-between">
        <SidebarHeading />
        {onClose && (
          <button
            type="button"
            aria-label="메뉴 닫기"
            onClick={onClose}
            className="p-1 text-gray-400"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* 탭 */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setSidebarTab("list")}
          className={twMerge(
            "rounded-lg px-3 py-1 text-sm font-semibold",
            "transition-colors",
            sidebarTab === "list"
              ? "bg-primary/90 text-white"
              : "bg-gray-100 text-gray-500",
          )}
        >
          {listLabel}
        </button>
        <button
          type="button"
          onClick={() => setSidebarTab("favorites")}
          className={twMerge(
            "rounded-lg px-3 py-1 text-sm font-semibold",
            "transition-colors",
            sidebarTab === "favorites"
              ? "bg-pr-orange/90 text-white"
              : "bg-gray-100 text-gray-500",
          )}
        >
          Favorites
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      {sidebarTab === "list" ? (
        <NavList onItemClick={onItemClick} />
      ) : (
        <div className="mt-4 flex flex-1 items-center justify-center">
          <p className="text-sm text-gray-400">즐겨찾기가 없습니다</p>
        </div>
      )}
    </div>
  );
}
