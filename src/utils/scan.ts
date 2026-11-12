import { SAMPLE_CODE_RECORDS, UNKNOWN_CODE_RECORD } from "@/lib/constants";
import { SampleCodeRecord } from "@/types";

export const normalizeCode = (raw: string): string => raw.trim().toUpperCase();

export const resolveCodeRecord = (raw: string): SampleCodeRecord => {
  const code = normalizeCode(raw);
  return SAMPLE_CODE_RECORDS[code] ?? { code, ...UNKNOWN_CODE_RECORD };
};

export const pushToHistory = (
  history: SampleCodeRecord[],
  record: SampleCodeRecord,
  limit: number
): SampleCodeRecord[] =>
  [record, ...history.filter((item) => item.code !== record.code)].slice(0, limit);

