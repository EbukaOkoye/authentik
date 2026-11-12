"use client";

import { useCallback, useEffect, useState } from "react";

import { HERO_AUTO_ADVANCE_MS, HERO_SLIDES } from "@/lib/constants";

export const useHeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = useCallback((): void => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback((): void => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number): void => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(nextSlide, HERO_AUTO_ADVANCE_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isPaused, nextSlide]);

  return {
    activeIndex,
    activeSlide: HERO_SLIDES[activeIndex],
    totalSlides,
    isPaused,
    setIsPaused,
    nextSlide,
    prevSlide,
    goToSlide,
  };
};
