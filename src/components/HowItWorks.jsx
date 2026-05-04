// =====================================================================
// HowItWorks — 3 numbered steps showing the user flow
// =====================================================================

const steps = [
  {
    number: '1',
    title: 'Upload',
    body: 'Drop in an mp3, wav, or m4a file (up to 50 MB). Choose the language you want.',
  },
  {
    number: '2',
    title: 'Transcribe',
    body: 'We send your audio to Speechmatics and wait for the AI to do its thing.',
  },
  {
    number: '3',
    title: 'Done',
    body: 'Read the transcript right on the page. Copy it, save it, share it — it\'s yours.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50
                 border-y border-slate-200 dark:border-slate-800"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12 reveal">
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            How it works
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">
            From audio to text in 3 steps
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ number, title, body }) {
  return (
    <div className="reveal p-6 rounded-2xl bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800">
      <div
        className="h-10 w-10 rounded-full bg-brand-600 text-white grid place-items-center
                   font-bold text-lg mb-4 shadow-md shadow-brand-500/30"
      >
        {number}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{body}</p>
    </div>
  );
}
