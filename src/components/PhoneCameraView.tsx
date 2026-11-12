import { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flashlight, X } from "lucide-react";

import { ABOUT_CONTENT } from "@/lib/constants";

interface PhoneCameraViewProps {
  torchOn: boolean;
  detected: boolean;
  onToggleTorch?: () => void;
  /** Content pinned under the viewfinder (manual entry, hints). */
  footer?: ReactNode;
}

export const PhoneCameraView = ({
  torchOn,
  detected,
  onToggleTorch,
  footer,
}: PhoneCameraViewProps) => {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-black">
      {/* Live camera feed */}
      <Image
        src={ABOUT_CONTENT.image}
        alt=""
        fill
        sizes="276px"
        className={`object-cover transition-[filter] duration-500 ${
          torchOn ? "brightness-[1.15] saturate-[1.05]" : "brightness-[0.62]"
        } ${detected ? "" : "scale-[1.04]"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70" />

      {/* Top controls */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-[54px]">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md">
          <X className="h-4 w-4" />
        </span>
        <button
          type="button"
          onClick={onToggleTorch}
          disabled={!onToggleTorch}
          aria-pressed={torchOn}
          aria-label="Torch"
          className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
            torchOn ? "bg-white text-black" : "bg-black/45 text-white"
          }`}
        >
          <Flashlight className="h-4 w-4" />
        </button>
      </div>

      {/* Viewfinder, centred on the QR sticker in the feed */}
      <div className="relative z-10 flex flex-1 items-start justify-center pt-[96px]">
        <motion.div
          animate={{
            width: detected ? 74 : 168,
            height: detected ? 74 : 168,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="relative"
        >
          {["left-0 top-0 border-l-[3px] border-t-[3px] rounded-tl-[14px]",
            "right-0 top-0 border-r-[3px] border-t-[3px] rounded-tr-[14px]",
            "left-0 bottom-0 border-l-[3px] border-b-[3px] rounded-bl-[14px]",
            "right-0 bottom-0 border-r-[3px] border-b-[3px] rounded-br-[14px]",
          ].map((corner) => (
            <span
              key={corner}
              className={`absolute h-7 w-7 transition-colors duration-300 ${corner} ${
                detected ? "border-[#61bdb2]" : "border-white"
              }`}
            />
          ))}
          {!detected && (
            <span className="animate-scan-sweep absolute inset-x-2 top-2 h-[2px] rounded-full bg-[#61bdb2] shadow-[0_0_10px_2px_rgba(97,189,178,0.6)]" />
          )}
        </motion.div>
      </div>

      <div className="relative z-10 px-4 pb-3">
        <p className="mb-3 text-center text-[13px] font-medium text-white">
          {detected ? "Code found. Hold still…" : "Point your camera at the QR code"}
        </p>
        {footer}
      </div>
    </div>
  );
};

