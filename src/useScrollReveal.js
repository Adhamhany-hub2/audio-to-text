// =====================================================================
// useScrollReveal — a custom React hook
// =====================================================================
// What's a "custom hook"? It's a regular function that uses other React
// hooks (useState, useEffect, etc.) and gets reused across components.
// By convention, custom hooks start with "use".
//
// What this one does:
//   Finds every element on the page with class="reveal" and uses the
//   IntersectionObserver browser API to add the class "visible" once the
//   element scrolls into view. The CSS in index.css then animates them in.
// =====================================================================

import { useEffect } from 'react';

export function useScrollReveal() {
  // useEffect runs after the component renders.
  // The empty array [] at the end means: run this once, when the
  // component mounts (the very first render).
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    // The observer "watches" elements and tells us when they enter / leave
    // the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // We only need to animate once, so stop watching this element.
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Trigger when 10% of the element is visible
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Cleanup — runs when the component unmounts
    return () => observer.disconnect();
  }, []);
}
