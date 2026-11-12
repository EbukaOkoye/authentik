import { History, LifeBuoy, ScanLine } from "lucide-react";

import { PhoneTab } from "@/types";

interface PhoneTabBarProps {
  activeTab: PhoneTab;
  tone?: "light" | "dark";
  onSelect?: (tab: PhoneTab) => void;
}

const TABS = [
  { id: "scan", label: "Scan", Icon: ScanLine },
  { id: "history", label: "History", Icon: History },
  { id: "help", label: "Help", Icon: LifeBuoy },
] as const;

export const PhoneTabBar = ({
  activeTab,
  tone = "light",
  onSelect,
}: PhoneTabBarProps) => {
  const isDark = tone === "dark";

  return (
    <nav
      aria-label="App tabs"
      className={`relative z-20 grid shrink-0 grid-cols-3 border-t pb-[24px] pt-[7px] backdrop-blur-xl ${
        isDark
          ? "border-white/10 bg-black/70"
          : "border-black/10 bg-[#f9f9f9]/95"
      }`}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = id === activeTab;
        const isSelectable = Boolean(onSelect) && id !== "help";
        const color = isActive
          ? "text-primary"
          : isDark
          ? "text-white/45"
          : "text-[#8e8e93]";

        return (
          <button
            key={id}
            type="button"
            disabled={!isSelectable}
            onClick={() => isSelectable && onSelect?.(id as PhoneTab)}
            className={`flex flex-col items-center gap-[2px] ${color} disabled:cursor-default`}
          >
            <Icon className="h-[21px] w-[21px]" strokeWidth={isActive ? 2.2 : 1.8} />
            <span className="text-[10px] font-medium tracking-tight">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

