import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/entities/sidebar/model";
import SidebarContent from "./SidebarContent";

export default function SideBar() {
  const { isOpen, close, scrollTo } = useSidebarStore();

  const handleItemClick = (index: number) => {
    scrollTo(index);
    close();
  };

  return (
    <>
      {/* 데스크톱: 항상 열린 사이드 패널 */}
      <aside
        className={twMerge(
          "hidden md:flex h-full w-[300px] shrink-0 flex-col",
          "overflow-hidden bg-white p-6 shadow-xl",
        )}
      >
        <div className="min-w-[252px] flex-1 min-h-0 flex flex-col">
          <SidebarContent onItemClick={(i) => scrollTo(i)} />
        </div>
      </aside>

      {/* 모바일: 오버레이 */}
      <div
        className={twMerge(
          "fixed inset-0 z-40 md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="메뉴 닫기"
          className={twMerge(
            "absolute inset-0 bg-black/50",
            "transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={close}
        />

        <aside
          className={twMerge(
            "absolute left-0 top-0 flex h-full w-[300px] flex-col",
            "overflow-hidden bg-white p-6 shadow-xl",
            "transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContent onClose={close} onItemClick={handleItemClick} />
        </aside>
      </div>
    </>
  );
}
