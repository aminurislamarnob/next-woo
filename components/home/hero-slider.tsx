"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "flickity/css/flickity.css";
import type FlickityType from "flickity";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string;
  badge?: string;
  heading: string;
  text?: string;
  button?: { label: string; href: string };
  /** Optional background image (local /public path or configured remote host). */
  image?: string;
  /** Fallback background when no image is provided. */
  bgClassName?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoplayMs?: number;
  className?: string;
}

export function HeroSlider({
  slides,
  autoplayMs = 5000,
  className,
}: HeroSliderProps) {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const flkty = React.useRef<FlickityType | null>(null);
  const [active, setActive] = React.useState(0);

  // Initialise Flickity directly so the effect cleanup destroys it correctly
  // (avoids the desync/blank state caused by StrictMode double-mounts when
  // using react-flickity-component). Flickity touches `window`, so it's
  // imported dynamically inside the client-only effect.
  React.useEffect(() => {
    const node = carouselRef.current;
    if (!node || slides.length === 0) return;

    let instance: FlickityType | null = null;
    let cancelled = false;

    import("flickity").then(({ default: Flickity }) => {
      if (cancelled || !carouselRef.current) return;
      instance = new Flickity(carouselRef.current, {
        cellAlign: "left",
        contain: true,
        wrapAround: slides.length > 1,
        autoPlay: autoplayMs,
        pauseAutoPlayOnHover: true,
        pageDots: false,
        prevNextButtons: false,
        draggable: slides.length > 1,
      });
      flkty.current = instance;
      const sync = () => instance && setActive(instance.selectedIndex);
      instance.on("change", sync);
      instance.on("select", sync);
      // Recompute layout once mounted to avoid an initial misaligned frame.
      requestAnimationFrame(() => instance?.resize());
    });

    return () => {
      cancelled = true;
      flkty.current = null;
      instance?.destroy();
    };
  }, [slides, autoplayMs]);

  return (
    <section
      className={cn("relative w-full bg-[hsl(var(--foreground)/0.04)]", className)}
      aria-roledescription="carousel"
    >
      <div
        ref={carouselRef}
        className="hero-flickity h-[450px] overflow-hidden lg:h-[550px]"
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={cn(
              "carousel-cell relative h-[450px] w-full lg:h-[550px]",
              !slide.image && (slide.bgClassName ?? "bg-muted")
            )}
          >
            {slide.image && (
              <>
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover object-center"
                />
                {/* Dark-to-transparent overlay keeps the left-aligned text legible */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </>
            )}

            <div className="relative z-10 mx-auto flex h-full max-w-[1520px] items-center justify-start px-6 sm:px-10">
              <div className="max-w-[500px] text-left text-white">
                {slide.badge && (
                  <span className="mb-5 inline-flex rounded-[0_12px_0_12px] bg-[#f7dfbb] px-3 py-2 text-[13px] font-medium text-[#605442]">
                    {slide.badge}
                  </span>
                )}
                <h2 className="mb-5 text-4xl font-bold capitalize leading-[1.13] tracking-tight sm:text-5xl lg:text-6xl">
                  {slide.heading}
                </h2>
                {slide.text && (
                  <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                    {slide.text}
                  </p>
                )}
                {slide.button && (
                  <Link
                    href={slide.button.href}
                    className="mt-7 inline-flex items-center rounded-full bg-white px-7 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/90"
                  >
                    {slide.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom controls wired to the Flickity instance */}
      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-20 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => flkty.current?.previous()}
            className="flex h-7 w-7 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={active === i}
                onClick={() => flkty.current?.select(i)}
                className={cn(
                  "h-1.5 rounded-full bg-white transition-all duration-300",
                  active === i ? "w-8 opacity-100" : "w-3.5 opacity-50"
                )}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => flkty.current?.next()}
            className="flex h-7 w-7 items-center justify-center text-white/80 transition-colors hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </section>
  );
}
