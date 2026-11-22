import Image from 'next/image';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function FeaturedProjects({ projects }) {
  if (!projects || projects.length === 0) return null;
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <SectionHeading number="03" title="Some Things I've Built" />
      <div className="space-y-20">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={p.id ?? i}>
              <article className="grid md:grid-cols-12 gap-6 items-center group">
                <a
                  href={p.external || p.github || '#work'}
                  target={p.external || p.github ? '_blank' : undefined}
                  rel="noreferrer"
                  className={`md:col-span-7 ${flip ? 'md:order-2' : ''} block overflow-hidden rounded-lg border border-border transition-transform duration-300 hover:-translate-y-1`}
                  aria-label={p.title}
                >
                  <Image
                    src={p.cover_image || '/images/project-placeholder.svg'}
                    alt={`${p.title} preview`}
                    width={1200}
                    height={675}
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </a>
                <div className={`md:col-span-5 ${flip ? 'md:order-1 md:text-right' : ''}`}>
                  <p className="font-mono text-accent text-sm">Featured Project</p>
                  <h3 className="font-display text-2xl font-bold text-heading mt-2">
                    {p.external ? (
                      <a href={p.external} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <div className="bg-panel border border-border rounded-lg p-5 mt-4 text-[15px] leading-relaxed shadow-lg">
                    {p.description}
                  </div>
                  <ul className={`flex flex-wrap gap-x-4 gap-y-2 mt-4 font-mono text-xs text-text-light ${flip ? 'md:justify-end' : ''}`}>
                    {(p.tech || []).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <div className={`flex gap-4 mt-4 ${flip ? 'md:justify-end' : ''}`}>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`} className="text-text-light hover:text-accent transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.72-1.53-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                        </svg>
                      </a>
                    )}
                    {p.external && (
                      <a href={p.external} target="_blank" rel="noreferrer" aria-label={`${p.title} live site`} className="text-text-light hover:text-accent transition-colors">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
