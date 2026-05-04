// =====================================================================
// App — the top-level component that puts everything together
// =====================================================================
// Notice how short and clean this file is now! Each section lives in
// its own file in /components, and App just arranges them top-to-bottom.
//
// App's job:
//   1. Manage the dark/light theme state
//   2. Run the scroll-reveal animations
//   3. Lay out the sections in order
// =====================================================================

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Converter from './components/Converter';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useScrollReveal } from './useScrollReveal';

export default function App() {
  // Theme state. Initialize from localStorage (so it persists between visits)
  // or from the user's OS preference if there's nothing saved yet.
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Whenever theme changes, update the <html> element and save to localStorage.
  // Tailwind's dark: classes activate when <html class="dark">.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle helper — passed to <Navbar> as a prop
  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  // Activate the scroll-reveal animations for elements with class="reveal"
  useScrollReveal();

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Converter />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
