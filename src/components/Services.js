import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const SERVICES = [
  {
    title: 'Web Development',
    desc: 'Complete websites and web apps — from the first screen to deployment, fast and responsive.',
    points: ['Next.js & React', 'Responsive by default', 'SEO-ready'],
  },
  {
    title: 'Frontend Development',
    desc: 'Clean, modern interfaces with React, Next.js, TypeScript and Tailwind CSS.',
    points: ['React / Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend & APIs',
    desc: 'REST APIs and server logic with Node.js and Express, backed by a database that stays up.',
    points: ['Node.js / Express', 'REST APIs', 'Turso / SQL'],
  },
  {
    title: 'AI-Assisted Builds',
    desc: 'Full products built with AI as a coding partner — reviewed, tested and shipped by a human.',
    points: ['Faster delivery', 'Human-reviewed code', 'Real products'],
  },
  {
    title: 'WhatsApp Automation',
    desc: 'Automated WhatsApp messaging for businesses — campaigns, reminders and member updates.',
    points: ['Outreach campaigns', 'Reminders', 'CRM integration'],
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading number="04" title="What I Do" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.08}>
            <div className="h-full bg-panel border border-border rounded-lg p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50">
              <h3 className="font-display text-lg font-semibold text-heading">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed">{s.desc}</p>
              <ul className="mt-4 space-y-1.5 font-mono text-xs text-text-light">
                {s.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <span className="text-accent" aria-hidden="true">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
