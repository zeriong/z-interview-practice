import { useState } from "react";
import { INTERVIEW_DATA } from "@/shared/constants";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToItem = (index: number) => {
    const el = document.getElementById(`interview-q-${index}`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 데스크탑 사이드바 */}
      <aside className="hidden h-full w-[360px] shrink-0 flex-col overflow-y-auto p-8 shadow-lg md:flex">
        <SidebarHeading />
        <NavList onItemClick={scrollToItem} />
      </aside>

      {/* 모바일: 햄버거 버튼 */}
      <button
        type="button"
        aria-label="메뉴 열기"
        onClick={() => setIsOpen(true)}
        className={[
          "fixed left-4 top-4 z-30 md:hidden",
          "flex h-11 w-11 items-center justify-center",
          "rounded-xl bg-white shadow-md",
        ].join(" ")}
      >
        <HamburgerIcon />
      </button>

      {/* 모바일: 오버레이 */}
      <div
        className={[
          "fixed inset-0 z-40 md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* 백드롭 */}
        <button
          type="button"
          aria-label="메뉴 닫기"
          className={[
            "absolute inset-0 bg-black/50",
            "transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={() => setIsOpen(false)}
        />

        {/* 사이드바 패널 */}
        <aside
          className={[
            "absolute left-0 top-0 flex h-full w-[300px] flex-col",
            "overflow-y-auto bg-white p-6 shadow-xl",
            "transition-transform duration-300",
            isOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="mb-6 flex items-start justify-between">
            <SidebarHeading />
            <button
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400"
            >
              <CloseIcon />
            </button>
          </div>
          <NavList
            onItemClick={(i) => {
              scrollToItem(i);
              setIsOpen(false);
            }}
            compact
          />
        </aside>
      </div>
    </>
  );
}

function SidebarHeading() {
  return (
    <div className="font-bold">
      <p className="text-[36px] text-primary">Preparing</p>
      <p className="ml-8 text-gray-500">
        for <span className="text-[36px] text-pr-orange">interview</span>
      </p>
    </div>
  );
}

function NavList({
  onItemClick,
  compact = false,
}: {
  onItemClick: (i: number) => void;
  compact?: boolean;
}) {
  return (
    <ul className="mt-6 md:mt-14 flex flex-col gap-3">
      {INTERVIEW_DATA.map((item, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => onItemClick(index)}
            className={`w-full rounded-lg bg-gray-100 text-left ${compact ? "p-3" : "p-4"}`}
          >
            <span
              className={`wrap-break-word leading-snug text-gray-700 ${compact ? "text-[15px]" : "text-[16px]"}`}
            >
              {item.question}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function HamburgerIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 6h16M3 11h16M3 16h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17 5L5 17M5 5l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
