import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { twMerge } from "tailwind-merge";
import { CloseIcon } from "@/shared/ui/icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className={twMerge(
          "absolute inset-0 bg-black/50",
          "transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={twMerge(
          "relative z-10 flex max-h-[80vh] flex-col",
          "w-[calc(100%-2rem)] max-w-[600px]",
          "rounded-2xl bg-white shadow-2xl",
          "transition-all duration-300",
          visible
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0",
        )}
      >
        <div
          className={twMerge(
            "flex shrink-0 items-center justify-between",
            "border-b border-gray-200 px-5 py-4",
          )}
        >
          <h2 className="text-lg font-bold text-gray-800">
            {title ?? "\u00A0"}
          </h2>
          <button
            type="button"
            aria-label="모달 닫기"
            onClick={onClose}
            className={twMerge(
              "rounded-lg p-1 text-gray-400",
              "transition-colors hover:bg-gray-100 hover:text-gray-600",
            )}
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-auto px-5 py-4">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
