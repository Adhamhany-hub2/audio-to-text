// =====================================================================
// Navbar
// =====================================================================
// Sticky navbar at the top of the page.
// Receives `theme` and `onToggleTheme` as props from App.jsx — we need
// these because the theme toggle button lives here, but the actual
// theme state lives at the top of the app.
// This pattern is called "lifting state up".
// =====================================================================

import { useState } from 'react';

export default function Navbar({ theme, onToggleTheme }) {
  // Whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Helper — closes mobile menu when a link is clicked
  function closeMenu() {
    setMenuOpen(false);
  }

  // The list of navigation links — keeping it as data lets us .map() over
  // it twice (desktop + mobile), no copy-paste.
  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#how', label: 'How it works' },
    { href: '#converter', label: 'Try it' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md
                 bg-white/80 dark:bg-slate-950/80
                 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 font-bold text-lg">
          <span className="h-8 w-8 rounded-lg bg-brand-600 grid place-items-center text-white">
            🎙️
          </span>
          <span>Audio to Text</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600
                         dark:text-slate-300 dark:hover:text-brand-400 rounded-md transition"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggleButton theme={theme} onToggle={onToggleTheme} />
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            className="h-9 w-9 grid place-items-center rounded-md
                       hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {/* Show X when open, hamburger when closed */}
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — only visible when menuOpen is true */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <div className="px-4 py-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block py-3 text-sm font-medium text-slate-600 dark:text-slate-300
                           hover:text-brand-600 dark:hover:text-brand-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// =====================================================================
// ThemeToggleButton — a smaller component used twice (desktop & mobile)
// =====================================================================
// Defining it in the same file is fine when it's only used here.
// If we needed it elsewhere we'd move it to its own file.
function ThemeToggleButton({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="h-9 w-9 grid place-items-center rounded-md
                 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
    >
      {isDark ? (
        // Sun (shown when in dark mode — click to go light)
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        // Moon (shown when in light mode — click to go dark)
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
