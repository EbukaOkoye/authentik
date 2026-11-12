import { ReactNode } from "react";

import { StatusBarTone } from "@/types";

import { IosStatusBar } from "./IosStatusBar";

interface IphoneMockupProps {
  children: ReactNode;
  /** "light" = white status-bar glyphs (for dark screens like the camera). */
  statusBarTone?: StatusBarTone;
  screenClassName?: string;
  className?: string;
}

/**
 * iPhone 15 Pro, natural titanium. Proportions follow the real device
 * (71.6 × 146.6 mm) at 300px wide: 3px titanium band, ~9px black border,
 * ~40px display corner radius, 92 × 27 Dynamic Island.
 */
export const IphoneMockup = ({
  children,
  statusBarTone = "dark",
  screenClassName = "bg-white",
  className = "",
}: IphoneMockupProps) => {
  return (
    <div
      className={`relative mx-auto h-[614px] w-[300px] shrink-0 select-none ${className}`}
    >
      {/* Left: Action button, volume up, volume down */}
      <span aria-hidden="true" className="iphone-button absolute -left-[2.5px] top-[112px] h-[26px] w-[3px] rounded-l-[2px]" />
      <span aria-hidden="true" className="iphone-button absolute -left-[2.5px] top-[160px] h-[46px] w-[3px] rounded-l-[2px]" />
      <span aria-hidden="true" className="iphone-button absolute -left-[2.5px] top-[216px] h-[46px] w-[3px] rounded-l-[2px]" />
      {/* Right: Side button */}
      <span aria-hidden="true" className="iphone-button absolute -right-[2.5px] top-[176px] h-[74px] w-[3px] rounded-r-[2px]" />

      {/* Titanium band */}
      <div className="iphone-titanium absolute inset-0 rounded-[52px] p-[3px] shadow-[0_40px_80px_-30px_rgba(6,32,59,0.55),0_18px_36px_-18px_rgba(6,32,59,0.35)]">
        {/* Antenna lines */}
        <span aria-hidden="true" className="absolute left-[68px] top-0 h-[3px] w-[4px] bg-[#4a4844]/70" />
        <span aria-hidden="true" className="absolute bottom-0 right-[68px] h-[3px] w-[4px] bg-[#4a4844]/70" />

        {/* Black border */}
        <div className="h-full w-full rounded-[49px] bg-[#050505] p-[9px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
          {/* Display */}
          <div
            className={`relative h-full w-full overflow-hidden rounded-[40px] font-ios antialiased ${screenClassName}`}
          >
            <IosStatusBar tone={statusBarTone} />

            {/* Dynamic Island */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[10px] z-40 flex h-[27px] w-[92px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[9px]"
            >
              <span className="h-[9px] w-[9px] rounded-full bg-[radial-gradient(circle_at_35%_35%,#2c3a52_0%,#0b111c_55%,#000_100%)]" />
            </div>

            <div className="absolute inset-0 flex flex-col">{children}</div>

            {/* Home indicator */}
            <span
              aria-hidden="true"
              className={`absolute bottom-[7px] left-1/2 z-40 h-[4.5px] w-[108px] -translate-x-1/2 rounded-full transition-colors duration-300 ${
                statusBarTone === "light" ? "bg-white/90" : "bg-black/85"
              }`}
            />

            {/* Faint glass reflection */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-50 rounded-[40px] bg-[linear-gradient(118deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0)_28%)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

