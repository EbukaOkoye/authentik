import { ChevronRight } from "lucide-react";

import { STATUS_LABELS, STATUS_TEXT_STYLES } from "@/lib/constants";
import { SampleCodeRecord } from "@/types";

import { StatusIcon } from "./StatusIcon";

interface PhoneHistoryViewProps {
  history: SampleCodeRecord[];
  onOpen: (code: string) => void;
}

export const PhoneHistoryView = ({ history, onOpen }: PhoneHistoryViewProps) => {
  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#f2f2f7] px-4 pt-[58px]">
      <h3 className="text-[30px] font-bold tracking-[-0.035em] text-black">History</h3>

      {history.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-10 text-center">
          <p className="text-[15px] font-semibold text-black">No scans yet</p>
          <p className="mt-1 text-[12.5px] leading-snug text-[#8e8e93]">
            Products you check will show up here so you can find them again.
          </p>
        </div>
      ) : (
        <ul className="mt-4 overflow-hidden rounded-[12px] bg-white">
          {history.map((item) => (
            <li key={item.code} className="border-b border-black/[0.07] last:border-b-0">
              <button
                type="button"
                onClick={() => onOpen(item.code)}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left active:bg-black/5"
              >
                <StatusIcon status={item.status} size={22} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] text-black">
                    {item.productName}
                  </span>
                  <span className={`block text-[11px] font-medium ${STATUS_TEXT_STYLES[item.status]}`}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-[#c7c7cc]" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

