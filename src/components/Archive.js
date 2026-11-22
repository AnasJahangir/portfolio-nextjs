import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import CoverImage from './CoverImage';

export default function Archive({ projects }) {
  if (!projects || projects.length === 0) return null;
  return (
    <section id="archive" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
      <SectionHeading title="More work" />
      <div className="grid sm:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.id ?? i} delay={(i % 2) * 0.06}>
            <article className="group h-full rounded-xl border border-border bg-panel overflow-hidden hover:border-text/50 transition-colors">
              <a
                href={p.external || undefined}
                target={p.external ? '_blank' : undefined}
                rel="noreferrer"
                className="block overflow-hidden"
                aria-label={p.title}
              >
                <CoverImage
                  src={p.cover_image || '/images/project-placeholder.svg'}
                  alt={`${p.title} preview`}
                  width={800}
                  height={600}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </a>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-medium text-heading">
                    {p.external ? (
                      <a href={p.external} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </h3>
                  {p.external && (
                    <a
                      href={p.external}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.title} live site`}
                      className="text-text hover:text-accent transition-colors shrink-0"
                    >
                      ↗
                    </a>
                  )}
                </div>
                {p.description && (
                  <p className="mt-1.5 text-sm leading-relaxed">{p.description}</p>
                )}
                {(p.tech || []).length > 0 && (
                  <p className="mt-3 text-xs text-text">{(p.tech || []).join(' · ')}</p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
