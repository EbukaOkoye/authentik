import { Camera, CopyX, KeyRound, MapPin } from "lucide-react";

import { PRIVACY_PILLARS, SECTION_IDS } from "@/lib/constants";
import { PrivacyPillar } from "@/types";

const PILLAR_ICONS: Record<PrivacyPillar["id"], typeof Camera> = {
  camera: Camera,
  location: MapPin,
  serials: KeyRound,
  copies: CopyX,
};

export const PrivacyTrustSection = () => {
  return (
    <section id={SECTION_IDS.privacy} className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="max-w-xl font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2.6rem] sm:leading-[1.1]">
          Built to check products, not people.
        </h2>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PRIVACY_PILLARS.map((pillar) => {
            const Icon = PILLAR_ICONS[pillar.id];
            return (
              <div key={pillar.id} className="border-t-2 border-foreground/80 pt-5">
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.8} />
                <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
