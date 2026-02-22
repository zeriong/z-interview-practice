import { twMerge } from "tailwind-merge";
import { useSidebarStore } from "@/entities/sidebar/model";
import SidebarContent from "./SidebarContent";

export default function SideBar() {
  const { isOpen, close, toggle, scrollTo } = useSidebarStore();

  const handleItemClick = (index: number) => {
    scrollTo(index);
    toggle();
  };

  return (
    <>
      {/* 데스크톱: 콘텐츠를 밀어내는 슬라이드 패널 */}
      <aside
        className={twMerge(
          "hidden md:flex h-full shrink-0 flex-col",
          "overflow-hidden bg-white p-6 shadow-xl",
          "transition-[width,padding] duration-300",
          isOpen ? "w-[300px]" : "w-0 p-0",
        )}
      >
        <div
          className={twMerge(
            "min-w-[252px] flex-1 min-h-0 flex flex-col",
            "transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          )}
        >
          <SidebarContent onClose={close} onItemClick={handleItemClick} />
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
