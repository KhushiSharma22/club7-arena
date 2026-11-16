"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the element has scrolled into view (one-shot). Used for
 * below-the-fold content that should reveal on arrival rather than
 * play its entrance animation before the user can see it. Reduced
 * motion still needs this (it gates opacity, not just an animation),
 * so it stays on unconditionally — CSS handles skipping the motion.
 */
export function useRevealOnView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // A section can be taller than a phone viewport. Cap the required
      // intersection to a small visible slice, rather than a fraction of
      // the entire (potentially very tall) form or gallery.
      { threshold: Math.min(threshold, 48 / Math.max(1, el.getBoundingClientRect().height)) }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
