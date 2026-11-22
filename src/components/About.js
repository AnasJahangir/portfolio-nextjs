import Image from 'next/image';
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
    <section id="about" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading number="01" title="About Me" />
      <div className="grid md:grid-cols-[3fr_2fr] gap-12 items-start">
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
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-8 font-mono text-sm">
            {SKILLS.map((s) => (
              <li key={s} className="flex items-center gap-2 text-text-light">
                <span className="text-accent" aria-hidden="true">▸</span>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative max-w-xs mx-auto md:mx-0">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg border-2 border-accent/60" aria-hidden="true" />
            <Image
              src="/images/me.jpg"
              alt="Anas Jahangir"
              width={300}
              height={300}
              className="relative rounded-lg object-cover w-full aspect-square"
              priority={false}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
