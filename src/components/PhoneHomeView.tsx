import { QrCode, ScanLine } from "lucide-react";

export const PhoneHomeView = () => {
  return (
    <div className="flex flex-1 flex-col bg-[#f2f2f7] px-4 pt-[58px]">
      <h3 className="text-[30px] font-bold tracking-[-0.035em] text-black">Scan</h3>
      <p className="mt-0.5 text-[13px] text-[#8e8e93]">Check a product before you pay.</p>

      <div className="mt-5 rounded-[14px] bg-white p-4">
        <p className="text-[13px] font-semibold text-black">Where to find the code</p>
        <p className="mt-0.5 text-[12px] leading-snug text-[#8e8e93]">
          It&apos;s printed on the pack, usually on the side or near the seal.
        </p>

        {/* Pack illustration with the code position highlighted */}
        <div className="relative mx-auto mt-4 h-[150px] w-[110px] rounded-[6px] border border-[#d4e1e5] bg-gradient-to-br from-white to-[#eef4f6] shadow-[0_6px_14px_-8px_rgba(10,32,54,0.35)]">
          <span className="absolute inset-x-0 top-0 h-6 rounded-t-[6px] bg-[#1f6a96]" />
          <span className="absolute left-3 top-9 h-1.5 w-14 rounded-full bg-[#cbdbe0]" />
          <span className="absolute left-3 top-12 h-1.5 w-10 rounded-full bg-[#cbdbe0]" />
          <span className="absolute bottom-4 right-3 flex h-12 w-12 items-center justify-center rounded-[4px] bg-white">
            <span className="animate-node-pulse absolute -inset-1.5 rounded-[8px] border-2 border-primary" />
            <QrCode className="h-9 w-9 text-black" />
          </span>
        </div>
      </div>

      <div className="mt-auto pb-3">
        <span className="flex w-full items-center justify-center gap-2 rounded-[12px] bg-primary py-3 text-[15px] font-semibold text-white">
          <ScanLine className="h-4 w-4" />
          Scan a product
        </span>
      </div>
    </div>
  );
};

