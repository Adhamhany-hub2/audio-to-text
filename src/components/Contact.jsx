// =====================================================================
// Contact — name + email + message form
// =====================================================================
// Important: this form doesn't actually send anything anywhere — there's
// no backend in this project. When the user clicks Submit we just show a
// success message. In a real app, you'd POST the data to an API endpoint
// (or use a service like Formspree, EmailJS, etc.).
// =====================================================================

import { useState } from 'react';

export default function Contact() {
  // Form state — one piece per field.
  // (Alternative: store all fields in one object. Either works.)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from refreshing the page
    setError('');

    // Very basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    // Pretend to submit — in a real app you'd send a fetch() POST request here
    console.log('Contact form submitted:', { name, email, message });

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');

    // Hide success message after 4 seconds
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10 reveal">
          <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
            Contact
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Get in touch</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Have feedback or want to work together? Drop me a message.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="reveal space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
                     rounded-2xl p-6 sm:p-8 shadow-lg"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5">
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adham Hany"
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700
                         rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500
                         focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/40 transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5">
              Your email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700
                         rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500
                         focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/40 transition"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me what's on your mind…"
              className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700
                         rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-500
                         focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/40 transition resize-y"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900
                            px-3 py-2 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
          {submitted && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900
                            px-3 py-2 text-sm text-green-700 dark:text-green-300">
              ✓ Thanks! Your message was received (this is a demo — no email is actually sent).
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg bg-brand-600 hover:bg-brand-700 text-white
                       font-semibold transition shadow-lg shadow-brand-500/30"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
