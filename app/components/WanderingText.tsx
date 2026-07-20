"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface WanderingTextProps {
  text: string;
  className?: string;
  delayStart?: number;
}

export default function WanderingText({ text, className = "", delayStart = 0.5 }: WanderingTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char-item");
    if (chars.length === 0) return;

    const tl = gsap.timeline({ delay: delayStart });

    gsap.set(chars, { opacity: 0, scale: 1, x: 0, y: 0, rotation: 0 });

    tl.to(chars, {
      duration: 0.8,
      x: () => gsap.utils.random(-150, 150),
      y: () => gsap.utils.random(-100, 100),
      rotation: () => gsap.utils.random(-90, 90),
      scale: () => gsap.utils.random(0.5, 1.5),
      opacity: () => gsap.utils.random(0.3, 0.8),
      ease: "power2.out",
      stagger: {
        amount: 0.3,
        from: "random",
      },
    });

    tl.to(chars, {
      duration: 2.5,
      x: (i, target) => {
        const currentX = gsap.getProperty(target, "x") as number;
        return currentX + gsap.utils.random(-30, 30);
      },
      y: (i, target) => {
        const currentY = gsap.getProperty(target, "y") as number;
        return currentY + gsap.utils.random(-25, 25);
      },
      rotation: (i, target) => {
        const currentRot = gsap.getProperty(target, "rotation") as number;
        return currentRot + gsap.utils.random(-20, 20);
      },
      ease: "sine.inOut",
      stagger: {
        amount: 0.5,
        from: "random",
      },
    });

    tl.to(chars, {
      duration: 1.5,
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      ease: "elastic.out(1.1, 0.6)",
      stagger: {
        amount: 1.2,
        from: "start",
      },
    });

    return () => {
      tl.kill();
    };
  }, [text, delayStart]);

  const words = text.split(" ");

  return (
    <h1
      ref={containerRef}
      className={`flex flex-wrap justify-center items-center select-none ${className}`}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <span
              key={charIndex}
              className="char-item inline-block origin-center will-change-transform"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
