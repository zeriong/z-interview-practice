import { useRouterState } from "@tanstack/react-router";
import DOMPurify from "dompurify";
import { twMerge } from "tailwind-merge";

import { useFavoritesStore } from "@/entities/favorites/model";
import { useQuizStore } from "@/entities/quiz/model";
import { useSidebarStore } from "@/entities/sidebar/model";
import { useModal } from "@/shared/hooks";
import type { InterviewItem } from "@/shared/types";
import { Modal } from "@/shared/ui";
import { CloseIcon } from "@/shared/ui/icons";

import { useSidebarSearch } from "../model";
import FavoritesList from "./FavoritesList";
import NavList from "./NavList";
import QuizHistoryList from "./QuizHistoryList";
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
  const { clearAll: clearAllFavorites } = useFavoritesStore();
  const { clearHistory } = useQuizStore();
  const { isOpen, data, open, close, clearData } = useModal<InterviewItem>();
  const {
    searchQuery,
    setSearchQuery,
    favSearchQuery,
    setFavSearchQuery,
    filteredItems,
    filteredFavoriteItems,
    quizHistoryItems,
    hasFavorites,
  } = useSidebarSearch();

  const listLabel = isQuizPage ? "Quiz History" : "Interview List";

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
          <QuizHistoryList
            items={quizHistoryItems}
            onItemClick={open}
            onClearHistory={handleClearHistory}
          />
        </div>
      );
    }

    return (
      <>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="질문 검색..."
          className={twMerge(
            "mt-4 w-full shrink-0 rounded-lg border border-gray-200",
            "bg-white px-3 py-2 text-sm text-gray-700",
            "placeholder:text-gray-400 focus:border-primary focus:outline-none",
          )}
        />
        <NavList items={filteredItems} onItemClick={onItemClick} />
      </>
    );
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="mb-6 shrink-0 flex items-start justify-between md:mb-10">
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
          <FavoritesList
            items={filteredFavoriteItems}
            searchQuery={favSearchQuery}
            onSearchChange={setFavSearchQuery}
            onClearAll={handleClearAllFavorites}
            onItemClick={open}
            hasFavorites={hasFavorites}
          />
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
