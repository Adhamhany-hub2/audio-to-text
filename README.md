# Audio to Text — Full Landing Page Edition

A complete one-page web app that converts audio to text using Speechmatics AI.
Built with **React + Vite + Tailwind CSS**.

No backend. No database. No login. One page, multiple sections, one feature.

## ⚠️ Important: API key safety

This app calls Speechmatics directly from the browser, so your API key is
included in the JavaScript that gets sent to visitors.

✅ **Safe to do:** Run on your computer, show friends, learn from it.
❌ **Don't deploy publicly** — anyone can view your key in DevTools and burn
   through your free credits.

When you want to deploy publicly, you'll need a small backend that holds the
key. That's why backends exist!

## Setup (one time)

### 1. Install dependencies

```bash
npm install
```

### 2. Get a Speechmatics API key

- Sign up at [portal.speechmatics.com](https://portal.speechmatics.com)
- Go to **API Keys** and create a new one
- **Copy it immediately** — you only see it once

### 3. Create your .env

```bash
copy .env.example .env       # Windows
cp .env.example .env         # Mac/Linux
```

Open `.env` and paste your real key:

```
VITE_SPEECHMATICS_API_KEY=your_actual_key_here
```

## Run

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Folder structure

```
audio-to-text-v2/
├── index.html               # the HTML page (loads React)
├── package.json             # dependencies
├── vite.config.js           # Vite config
├── tailwind.config.js       # Tailwind config + custom colors
├── postcss.config.js
├── .env.example             # template for your API key
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # top-level component, stitches sections together
    ├── speechmatics.js      # talks to the Speechmatics API
    ├── useScrollReveal.js   # custom hook for scroll-reveal animations
    ├── index.css            # Tailwind directives + reveal animation CSS
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Features.jsx
        ├── HowItWorks.jsx
        ├── Converter.jsx     # ← the actual upload + transcribe UI
        ├── About.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

11 small, focused files. Each component has one job.

## Sections of the page (top to bottom)

1. **Navbar** — sticky, with theme toggle and mobile menu
2. **Hero** — big headline + "Try it now" call-to-action
3. **Features** — 3 cards highlighting accuracy, languages, simplicity
4. **How it works** — 3 numbered steps explaining the flow
5. **Converter** — the heart of the app: upload → transcribe → result
6. **About** — short bio + skill chips
7. **Contact** — name + email + message form (demo only, doesn't send)
8. **Footer** — credits

Click any link in the navbar to smooth-scroll to that section.

## What you'll learn from this code

This v2 is specifically designed to teach you React patterns:

- **Components and props** — see how `App.jsx` passes `theme` and `onToggleTheme` into `Navbar`
- **`.map()` to render lists** — see `Features.jsx`, `HowItWorks.jsx`, `Navbar.jsx`
- **`useState`** — every section that has interactivity uses it (`Navbar`, `Converter`, `Contact`)
- **`useEffect`** — see `App.jsx` for the theme syncing and `useScrollReveal.js` for IntersectionObserver
- **Custom hooks** — `useScrollReveal` shows you how to extract reusable logic
- **Lifting state up** — theme lives in `App`, but the toggle button lives in `Navbar`
- **Controlled forms** — see `Contact.jsx` for the standard React form pattern
- **Conditional rendering** — `{loading && <Spinner />}`, `{transcript && <Result />}`
- **Dark mode with Tailwind** — every component uses `dark:` variants

## Things to try after it works

These are great little exercises:

1. **Change the brand color** — edit `tailwind.config.js`, swap blue for purple/teal/red
2. **Add another feature card** — just add an item to the array in `Features.jsx`
3. **Save the last transcript to localStorage** — so it survives a refresh
4. **Add a download-as-txt button** for the transcript
5. **Add a 4th step to "How it works"** — see how easy it is now that it's an array
6. **Replace the emoji avatar** in `About.jsx` with a real photo
7. **Make the contact form actually send** using a free service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com)

Each touches a different React concept. Try one a day.

Have fun.
