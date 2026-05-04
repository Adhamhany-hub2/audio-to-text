// =====================================================================
// Footer — bottom of every page
// =====================================================================

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center
                      justify-between gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>
          © {new Date().getFullYear()} <strong className="text-slate-700 dark:text-slate-300">Audio to Text</strong>
          {' '}· Built by Adham
        </span>
        <span>Powered by Speechmatics</span>
      </div>
    </footer>
  );
}
