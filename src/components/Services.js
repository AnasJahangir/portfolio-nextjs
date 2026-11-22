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
    <section id="services" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
      <SectionHeading title="What I do" />
      <div className="divide-y divide-border border-y border-border">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.04}>
            <div className="py-6">
              <h3 className="text-lg font-medium text-heading">{s.title}</h3>
              <p className="mt-1.5 leading-relaxed">{s.desc}</p>
              <p className="mt-2 text-sm text-text">{s.points.join(' · ')}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
