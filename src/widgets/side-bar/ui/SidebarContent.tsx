import { CloseIcon } from "@/shared/ui/icons";
import NavList from "./NavList";
import SidebarHeading from "./SidebarHeading";

interface Props {
  onClose: () => void;
  onItemClick: (index: number) => void;
}

export default function SidebarContent({ onClose, onItemClick }: Props) {
  return (
    <>
      <div className="mb-6 flex items-start justify-between">
        <SidebarHeading />
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={onClose}
          className="p-1 text-gray-400"
        >
          <CloseIcon />
        </button>
      </div>
      <NavList onItemClick={onItemClick} />
    </>
  );
}
