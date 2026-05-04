// =====================================================================
// About — short personal section
// =====================================================================

const skills = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Kotlin', 'MySQL'];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50
                                   border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          {/* Avatar / icon */}
          <div className="reveal flex justify-center md:justify-start">
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-brand-500 to-brand-700
                            grid place-items-center text-5xl shadow-xl">
              👋
            </div>
          </div>

          {/* Text */}
          <div className="md:col-span-2">
            <span className="reveal text-sm font-semibold text-brand-600 dark:text-brand-400
                             uppercase tracking-wider">
              About me
            </span>
            <h2 className="reveal mt-2 text-3xl sm:text-4xl font-bold">
              Hi, I'm <span className="text-brand-600 dark:text-brand-400">Adham</span>
            </h2>
            <p className="reveal mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              I'm a frontend developer who loves building modern, responsive web apps.
              This little project was built to learn how to wire up a real AI API from the
              browser using just <strong>HTML, CSS, JavaScript, React, and Tailwind</strong>.
            </p>
            <p className="reveal mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
              I also have programming experience with Kotlin and database systems like MySQL,
              and I'm currently learning React deeply.
            </p>

            {/* Skill chips — built from the array above with .map() */}
            <div className="mt-5 flex flex-wrap gap-2 reveal">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs font-medium
                             bg-brand-50 text-brand-700 border border-brand-100
                             dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
