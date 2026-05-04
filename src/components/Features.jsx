// =====================================================================
// Features — 3 cards highlighting what the app does well
// =====================================================================

// Storing the data in an array means we only write the JSX for one card,
// then map() over the array. This is a super common React pattern.
const features = [
  {
    icon: '✨',
    title: 'Industry-grade accuracy',
    body: 'Speechmatics\' enhanced engine delivers studio-quality transcripts with punctuation and proper formatting.',
  },
  {
    icon: '🌍',
    title: '7+ languages',
    body: 'Transcribe audio in English, Spanish, French, German, Arabic, Portuguese, Italian, and more.',
  },
  {
    icon: '⚡',
    title: 'Fast & simple',
    body: 'Drop your file, click a button, and get text. No sign-up, no clutter — just results.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Features
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            Everything you need to convert audio
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Smaller component — one card. Receives icon/title/body as props.
function FeatureCard({ icon, title, body }) {
  return (
    <div
      className="reveal p-6 rounded-2xl border border-slate-200 dark:border-slate-800
                 bg-white dark:bg-slate-900 hover:border-brand-300 dark:hover:border-brand-700
                 hover:shadow-lg hover:-translate-y-1 transition"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{body}</p>
    </div>
  );
}
