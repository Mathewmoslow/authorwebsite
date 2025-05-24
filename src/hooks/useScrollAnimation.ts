import { useEffect, useRef, RefObject } from "react";

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  perspective?: number;
  rotation?: number;
  transition?: string;
};

export function useScrollAnimation<T extends HTMLElement>(
  options: AnimationOptions = {}
): RefObject<T> {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    perspective = 1000,
    rotation = 15,
    transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
  } = options;
  
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold, rootMargin }
    );
    
    const handleScroll = () => {
      if (!ref.current) return;
      
      const elementRect = ref.current.getBoundingClientRect();
      const elementCenter = elementRect.top + elementRect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const distanceFromCenter = (elementCenter - windowCenter) / (window.innerHeight / 2);
      
      // Apply 3D transform based on scroll position
      if (Math.abs(distanceFromCenter) < 1.2) {
        const rotateY = -distanceFromCenter * rotation;
        const translateZ = Math.abs(distanceFromCenter) * -20;
        ref.current.style.transform = `perspective(${perspective}px) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
      }
    };
    
    const element = ref.current;
    if (element) {
      element.style.transition = transition;
      observer.observe(element);
      
      const animateElements = element.querySelectorAll(".animate-on-scroll");
      animateElements.forEach(el => observer.observe(el));
      
      window.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
        const animateElements = element.querySelectorAll(".animate-on-scroll");
        animateElements.forEach(el => observer.unobserve(el));
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, rootMargin, perspective, rotation, transition]);
  
  return ref as RefObject<T>; // Fixed: Add type assertion
}