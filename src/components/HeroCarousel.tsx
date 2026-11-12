"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { useHeroCarousel } from "@/hooks/use-hero-carousel";
import { HERO_SLIDES } from "@/lib/constants";

const TEXT_EASE = [0.22, 1, 0.36, 1] as const;

export const HeroCarousel = () => {
  const {
    activeIndex,
    activeSlide,
    setIsPaused,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useHeroCarousel();

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Huthentic highlights"
      className="relative isolate h-[600px] overflow-hidden bg-navy sm:h-[640px] lg:h-[700px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {HERO_SLIDES.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={slide.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 -z-10 transition-opacity duration-[1100ms] ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              fill
              priority={idx === 0}
              sizes="100vw"
              className={`object-cover object-[68%_center] ${isActive ? "animate-ken-burns" : ""}`}
            />
          </div>
        );
      })}

      {/* Legibility scrim: heavy on the text side, clear over the subject */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06203b]/95 via-[#06203b]/72 to-[#06203b]/5" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#06203b]/70 to-transparent" />

      <div className="mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            className="max-w-xl"
            exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: TEXT_EASE, delay: 0.1 }}
              className="text-balance font-heading text-[2.6rem] font-bold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl"
            >
              {activeSlide.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: TEXT_EASE, delay: 0.22 }}
              className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/80 sm:text-lg"
            >
              {activeSlide.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: TEXT_EASE, delay: 0.34 }}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <a
                href={activeSlide.primaryCtaHref}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#1a6f80]"
              >
                {activeSlide.primaryCtaLabel}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={activeSlide.secondaryCtaHref}
                className="text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white"
              >
                {activeSlide.secondaryCtaLabel}
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:flex lg:left-5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:flex lg:right-5"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {HERO_SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goToSlide(idx)}
            aria-label={`Show slide ${idx + 1}`}
            aria-current={idx === activeIndex}
            className="py-2"
          >
            <span
              className={`block h-[3px] rounded-full transition-all duration-500 ${
                idx === activeIndex ? "w-10 bg-white" : "w-5 bg-white/40 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};
