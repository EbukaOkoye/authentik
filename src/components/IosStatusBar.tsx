import { StatusBarTone } from "@/types";

interface IosStatusBarProps {
  tone: StatusBarTone;
}

export const IosStatusBar = ({ tone }: IosStatusBarProps) => {
  const fill = tone === "light" ? "#ffffff" : "#000000";
  const text = tone === "light" ? "text-white" : "text-black";

  return (
    <div
      className={`absolute inset-x-0 top-0 z-30 flex h-[47px] items-center justify-between pl-[30px] pr-[22px] pt-[3px] font-ios transition-colors duration-300 ${text}`}
    >
      <span className="tabular text-[14.5px] font-semibold tracking-[-0.01em]">
        9:41
      </span>

      <div className="flex items-center gap-[5px]" aria-hidden="true">
        {/* Cellular */}
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="0.9" fill={fill} />
          <rect x="4.6" y="5" width="3" height="6" rx="0.9" fill={fill} />
          <rect x="9.2" y="2.6" width="3" height="8.4" rx="0.9" fill={fill} />
          <rect x="13.8" y="0" width="3" height="11" rx="0.9" fill={fill} />
        </svg>

        {/* Wi-Fi */}
        <svg width="15" height="11" viewBox="0 0 15 11">
          <path
            d="M7.5 2.3c2.1 0 4 .8 5.5 2.1l1.1-1.1C12.3 1.6 10 .7 7.5.7S2.7 1.6.9 3.3L2 4.4c1.5-1.3 3.4-2.1 5.5-2.1Z"
            fill={fill}
          />
          <path
            d="M7.5 5.4c1.3 0 2.4.5 3.3 1.2l1.1-1.1C10.7 4.4 9.2 3.8 7.5 3.8S4.3 4.4 3.1 5.5l1.1 1.1c.9-.7 2-1.2 3.3-1.2Z"
            fill={fill}
          />
          <path d="M7.5 10.3 9.6 8.2c-.6-.5-1.3-.8-2.1-.8s-1.5.3-2.1.8l2.1 2.1Z" fill={fill} />
        </svg>

        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12">
          <rect
            x="0.5"
            y="0.5"
            width="21"
            height="11"
            rx="3.2"
            fill="none"
            stroke={fill}
            strokeOpacity="0.4"
          />
          <rect x="2" y="2" width="16.5" height="8" rx="1.8" fill={fill} />
          <path
            d="M23 4v4c.8-.3 1.3-1.1 1.3-2S23.8 4.3 23 4Z"
            fill={fill}
            fillOpacity="0.45"
          />
        </svg>
      </div>
    </div>
  );
};

