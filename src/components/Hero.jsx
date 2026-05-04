// =====================================================================
// Hero — the big headline section at the top of the page
// =====================================================================

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
    >
      {/* Decorative background — soft gradient circle */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px]
                   rounded-full bg-brand-100 dark:bg-brand-700/20 blur-3xl opacity-60 -z-10"
      />

      <div className="max-w-3xl mx-auto px-4 text-center">
        <span
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium
                     bg-brand-50 text-brand-700 border border-brand-100
                     dark:bg-brand-700/20 dark:text-brand-400 dark:border-brand-700/40 reveal"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
          Powered by Speechmatics AI
        </span>

        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight reveal">
          Turn audio into{' '}
          <span className="text-brand-600 dark:text-brand-400">accurate text</span>{' '}
          in seconds.
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto reveal">
          Upload an mp3 or wav file and get a clean, ready-to-use transcript. Built for
          students, journalists, podcasters, and anyone who needs words from voice — fast.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 reveal">
          <a
            href="#converter"
            className="px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold
                       shadow-lg shadow-brand-500/30 transition"
          >
            Try it now — it's free
          </a>
          <a
            href="#how"
            className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700
                       hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition"
          >
            How it works
          </a>
        </div>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-500 reveal">
          No sign-up required · Supports 7+ languages
        </p>
      </div>
    </section>
  );
}
