import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const SKILLS = [
  'JavaScript',
  'React.js',
  'Next.js',
  'TypeScript',
  'HTML5',
  'CSS3',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'Git',
  'Linux / SSH',
  'AI-assisted development',
];

export default function About() {
  return (
    <section id="about" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
      <SectionHeading title="About" />
      <Reveal>
        <div className="space-y-4 leading-relaxed">
          <p>
            Hello! I&apos;m Anas, a full-stack developer based in Karachi, Pakistan. I&apos;ve
            spent the last 3 years building complete web products — not just screens, but the
            whole thing: frontend, backend APIs, databases and deployment.
          </p>
          <p>
            My core stack is JavaScript, React.js, Next.js and TypeScript, with Tailwind CSS
            for styling and Node.js with Express on the backend. I work with AI tools every
            day to move faster, and I&apos;ve shipped products like a full resume builder, a
            lead CRM with WhatsApp automation, and a gym management system.
          </p>
          <p>
            I care about products that actually work for real people — fast to load, simple to
            use, and finished end to end.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          {SKILLS.map((s) => (
            <span
              key={s}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-light"
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
