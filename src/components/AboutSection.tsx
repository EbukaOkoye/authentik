"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ABOUT_CONTENT, SECTION_IDS } from "@/lib/constants";

export const AboutSection = () => {
  return (
    <section id={SECTION_IDS.about} className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(8% 0% 8% 0%)" }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted lg:col-span-5"
        >
          <Image
            src={ABOUT_CONTENT.image}
            alt={ABOUT_CONTENT.imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="lg:col-span-7">
          <h2 className="max-w-xl text-balance font-heading text-3xl font-bold tracking-tight text-foreground sm:text-[2.6rem] sm:leading-[1.1]">
            {ABOUT_CONTENT.heading}
          </h2>
          <div className="mt-7 max-w-[62ch] space-y-5 text-[17px] leading-[1.7] text-muted-foreground">
            {ABOUT_CONTENT.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <a
            href={`#${SECTION_IDS.howItWorks}`}
            className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-primary underline decoration-primary/30 underline-offset-[6px] transition-colors hover:decoration-primary"
          >
            See how a scan works
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
