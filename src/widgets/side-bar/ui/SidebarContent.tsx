import { useRouterState } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { twMerge } from "tailwind-merge";

import { useFavoritesStore } from "@/entities/favorites/model";
import { useQuizStore } from "@/entities/quiz/model";
import { useSidebarStore } from "@/entities/sidebar/model";
import { INTERVIEW_DATA } from "@/shared/constants";
import { useModal } from "@/shared/hooks";
import type { InterviewItem } from "@/shared/types";
import { Modal } from "@/shared/ui";
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
  const { favoriteIds, clearAll: clearAllFavorites } = useFavoritesStore();
  const {
    historyIds,
    removeFromHistory,
    clearHistory,
  } = useQuizStore();
  const { isFavorite, toggle: toggleFavorite } = useFavoritesStore();
  const { isOpen, data, open, close, clearData } = useModal<InterviewItem>();

  const listLabel = isQuizPage ? "Quiz History" : "Interview List";

  const favoriteItems = INTERVIEW_DATA.filter((item) =>
    favoriteIds.includes(item.id),
  );

  const quizHistoryItems = historyIds
    .map((id) => INTERVIEW_DATA.find((item) => item.id === id))
    .filter((item): item is InterviewItem => item !== undefined);

  const handleClearAllFavorites = () => {
    if (window.confirm("즐겨찾기를 모두 해제하시겠습니까?")) {
      clearAllFavorites();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("퀴즈 히스토리를 모두 삭제하시겠습니까?")) {
      clearHistory();
    }
  };

  const renderListTab = () => {
    if (isQuizPage) {
      return (
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          {quizHistoryItems.length > 0 ? (
            <>
              <button
                type="button"
                onClick={handleClearHistory}
                className={twMerge(
                  "mb-3 shrink-0 self-end rounded-lg px-3 py-1",
                  "text-xs font-semibold text-red-500",
                  "transition-colors bg-red-50 hover:bg-red-100",
                )}
              >
                전체 삭제
              </button>
              <ul className="flex-1 space-y-2 overflow-y-auto">
                {quizHistoryItems.map((item) => (
                  <li key={item.id} className="flex items-start gap-1">
                    <button
                      type="button"
                      onClick={() => open(item)}
                      className={twMerge(
                        "flex min-w-0 flex-1 items-start gap-2",
                        "rounded-lg bg-gray-100 p-3 text-left",
                        "transition-colors hover:bg-gray-200",
                      )}
                    >
                      <button
                        type="button"
                        aria-label={
                          isFavorite(item.id)
                            ? "즐겨찾기 해제"
                            : "즐겨찾기 등록"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className="shrink-0 text-base leading-snug"
                      >
                        {isFavorite(item.id) ? "⭐" : "☆"}
                      </button>
                      <span className="wrap-break-word text-[15px] leading-snug text-gray-700">
                        {item.question}
                      </span>
                    </button>
                    <button
                      type="button"
                      aria-label="히스토리 삭제"
                      onClick={() => removeFromHistory(item.id)}
                      className={twMerge(
                        "shrink-0 rounded-lg p-2 text-gray-400",
                        "transition-colors hover:bg-red-50 hover:text-red-500",
                      )}
                    >
                      <CloseIcon />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-gray-400">퀴즈 히스토리가 없습니다</p>
            </div>
          )}
        </div>
      );
    }

    return <NavList onItemClick={onItemClick} />;
  };

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
        renderListTab()
      ) : (
        <div className="mt-4 flex min-h-0 flex-1 flex-col">
          {favoriteItems.length > 0 ? (
            <>
              <button
                type="button"
                onClick={handleClearAllFavorites}
                className={twMerge(
                  "mb-3 shrink-0 self-end rounded-lg px-3 py-1",
                  "text-xs font-semibold text-red-500",
                  "transition-colors bg-red-50 hover:bg-red-100",
                )}
              >
                모두 비우기
              </button>
              <ul className="flex-1 space-y-2 overflow-y-auto">
                {favoriteItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => open(item)}
                      className={twMerge(
                        "flex w-full items-start gap-2",
                        "rounded-lg bg-gray-100 p-3 text-left",
                        "transition-colors hover:bg-gray-200",
                      )}
                    >
                      <span className="shrink-0 text-base leading-snug">
                        ⭐
                      </span>
                      <span className="wrap-break-word text-[15px] leading-snug text-gray-700">
                        {item.question}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <p className="text-sm text-gray-400">즐겨찾기가 없습니다</p>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={close}
        onExited={clearData}
        title={data?.question}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(data?.answer ?? ""),
          }}
        />
      </Modal>
    </div>
  );
}
