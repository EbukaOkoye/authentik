import { ReactNode } from "react";

import {
  STATUS_GUIDANCE,
  STATUS_LABELS,
  STATUS_TEXT_STYLES,
} from "@/lib/constants";
import { SampleCodeRecord } from "@/types";

import { StatusIcon } from "./StatusIcon";

interface PhoneResultViewProps {
  record: SampleCodeRecord;
  actions?: ReactNode;
}

export const PhoneResultView = ({ record, actions }: PhoneResultViewProps) => {
  const rows = [
    { label: "Product", value: record.productName },
    { label: "Manufacturer", value: record.manufacturer },
    { label: "Batch", value: record.batchNumber, mono: true },
    { label: "NAFDAC No.", value: record.nafdacNumber, mono: true },
    { label: "Expiry", value: record.expiryDate, mono: true },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#f2f2f7] px-4 pt-[58px]">
      <div className="flex items-center gap-3 pb-4">
        <StatusIcon status={record.status} size={44} />
        <div className="min-w-0">
          <p
            className={`text-[22px] font-bold leading-tight tracking-[-0.03em] ${
              STATUS_TEXT_STYLES[record.status]
            }`}
          >
            {STATUS_LABELS[record.status]}
          </p>
          <p className="mt-0.5 text-[12.5px] leading-snug text-[#3c3c43]/75">
            {STATUS_GUIDANCE[record.status]}
          </p>
        </div>
      </div>

      <dl className="overflow-hidden rounded-[12px] bg-white">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-3 border-b border-black/[0.07] px-3.5 py-[9px] last:border-b-0"
          >
            <dt className="shrink-0 text-[13px] text-[#8e8e93]">{row.label}</dt>
            <dd
              className={`text-right text-[13px] leading-snug text-black ${
                row.mono ? "tabular font-mono text-[12px]" : ""
              }`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-2 px-1 text-[11px] leading-snug text-[#8e8e93]">
        {record.note}
      </p>

      {actions && <div className="mt-auto space-y-2 pb-3 pt-3">{actions}</div>}
    </div>
  );
};

