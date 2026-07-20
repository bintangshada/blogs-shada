"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { Draggable } from "gsap/Draggable";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import WanderingText from "./components/WanderingText";

interface Blog {
  id: string;
  slug: string;
  title: string;
  createdAt: Date | string;
}

interface HomeClientProps {
  blogs: Blog[];
}

export default function HomeClient({ blogs }: HomeClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const introParaRef = useRef<HTMLParagraphElement>(null);
  const blogsSectionRef = useRef<HTMLDivElement>(null);
  const blogsTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Observer, Draggable, Flip, CustomEase);

    const container = containerRef.current;
    if (!container) return;

    CustomEase.create("customBounce", "M0,0 C0.12,0.76 0.23,1.18 0.44,1.18 C0.65,1.18 0.72,0.92 0.84,0.98 C0.92,1.02 0.96,1 1,1");

    const splitIntoWordsAndLines = (element: HTMLElement | null) => {
      if (!element) return;
      const text = element.innerText;
      const words = text.split(" ");
      element.innerHTML = "";
      
      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "inline-block mr-[0.25em] overflow-hidden vertical-align-bottom";
        
        const innerSpan = document.createElement("span");
        innerSpan.className = "split-word inline-block will-change-transform translate-y-[100%]";
        innerSpan.innerText = word;
        
        span.appendChild(innerSpan);
        element.appendChild(span);
      });
    };

    splitIntoWordsAndLines(introParaRef.current);
    splitIntoWordsAndLines(blogsTitleRef.current);

    const entranceTl = gsap.timeline();

    const introWords = introParaRef.current?.querySelectorAll(".split-word");
    if (introWords && introWords.length > 0) {
      entranceTl.to(
        introWords,
        {
          y: "0%",
          duration: 1.2,
          stagger: 0.012,
          ease: "customBounce",
        },
        "+=3.5"
      );
    }

    const runScrambleText = (element: HTMLElement, finalText: string) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
      const duration = 1.5;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: 1,
        duration: duration,
        ease: "power1.inOut",
        onUpdate: () => {
          const progress = obj.val;
          const currentLength = Math.floor(finalText.length * progress);
          let scrambled = finalText.substring(0, currentLength);
          
          for (let i = currentLength; i < finalText.length; i++) {
            if (finalText[i] === " ") {
              scrambled += " ";
            } else {
              scrambled += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          element.innerText = scrambled;
        },
        onComplete: () => {
          element.innerText = finalText;
        }
      });
    };

    const listItems = blogsSectionRef.current?.querySelectorAll(".blog-item");
    listItems?.forEach((item) => {
      const titleEl = item.querySelector("h2");
      if (titleEl) {
        const originalText = titleEl.innerText.trim();
        item.addEventListener("mouseenter", () => {
          runScrambleText(titleEl, originalText);
        });
      }
    });

    const blogsWords = blogsTitleRef.current?.querySelectorAll(".split-word");
    if (blogsWords && blogsWords.length > 0) {
      gsap.to(blogsWords, {
        scrollTrigger: {
          trigger: blogsSectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: "0%",
        duration: 0.8,
        stagger: 0.03,
        ease: "power2.out",
      });
    }

    if (listItems && listItems.length > 0) {
      gsap.fromTo(
        listItems,
        { opacity: 0, y: 30, rotationX: -10 },
        {
          scrollTrigger: {
            trigger: blogsSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }

    const observerInstance = Observer.create({
      target: window,
      type: "pointer",
      onMove: (self) => {
        const xVal = self.x ?? 0;
        const yVal = self.y ?? 0;
        const xPercent = (xVal / window.innerWidth - 0.5) * 2;
        const yPercent = (yVal / window.innerHeight - 0.5) * 2;

        gsap.to(container, {
          rotationY: xPercent * 2.5,
          rotationX: -yPercent * 2.5,
          duration: 0.6,
          ease: "power1.out",
          transformPerspective: 1200,
        });
      },
    });

    const dragInstance = Draggable.create(heroRef.current, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: container,
      onDragEnd: function() {
        gsap.to(this.target, {
          x: 0,
          y: 0,
          duration: 1.5,
          ease: "elastic.out(1.1, 0.5)",
        });
      }
    });

    const blogsTitle = blogsTitleRef.current;
    if (blogsTitle) {
      blogsTitle.style.cursor = "pointer";
      blogsTitle.addEventListener("click", () => {
        const state = Flip.getState(blogsTitle);
        
        const isCentered = blogsTitle.classList.contains("justify-center");
        if (isCentered) {
          blogsTitle.classList.remove("justify-center");
          blogsTitle.classList.add("justify-start");
        } else {
          blogsTitle.classList.remove("justify-start");
          blogsTitle.classList.add("justify-center");
        }

        Flip.from(state, {
          duration: 0.6,
          ease: "power3.inOut",
          absolute: true
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      observerInstance.kill();
      dragInstance[0]?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="container max-w-200 py-12 px-4 will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div ref={heroRef} className="hero mb-16 select-none cursor-grab active:cursor-grabbing touch-none">
        <WanderingText
          text="Hello Welcome to my Blogs"
          className="flex flex-wrap justify-center items-center font-bold text-3xl md:text-4xl"
          delayStart={0.3}
        />
        <br />
        <p
          ref={introParaRef}
          className="text-justify leading-relaxed text-gray-700 dark:text-gray-300 pointer-events-none"
        >
          My name is Bintang Shada Kawibya Putra but you can call me Shada, a
          little bit about myself—to be honest, I don&apos;t really know what I
          want to focus on right now (dd23/MM09/yy25), so I&apos;m trying
          everything, but I tend to get bored with things easily. That&apos;s
          why I created this website, which might become a story about my life
          journey. I made it simple, just the way I want it, so don&apos;t
          expect too much. And I hope I can write a lot of blogs here too,
          hehe.
        </p>
      </div>

      <div ref={blogsSectionRef} className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h1
          ref={blogsTitleRef}
          className="my-4 text-xl flex justify-center font-bold select-none"
        >
          Blogs
        </h1>
        <ul className="list-inside list-disc space-y-3 ml-4">
          {blogs.map((blog: Blog) => (
            <li key={blog.id} className="blog-item origin-top opacity-0">
              <Link
                href={`/articles/${blog.slug}`}
                className="hover:underline inline-block group py-1"
              >
                <h2 className="inline font-medium group-hover:text-violet-500 transition-colors duration-200">
                  {blog.title} -{" "}
                </h2>
                <p className="inline text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
