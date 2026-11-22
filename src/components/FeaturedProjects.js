import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import CoverImage from './CoverImage';

export default function FeaturedProjects({ projects }) {
  if (!projects || projects.length === 0) return null;
  return (
    <section id="work" className="max-w-3xl mx-auto px-6 py-16 scroll-mt-20">
      <SectionHeading title="Selected work" />
      <div className="space-y-14">
        {projects.map((p, i) => (
          <Reveal key={p.id ?? i}>
            <article>
              <a
                href={p.external || p.github || '#work'}
                target={p.external || p.github ? '_blank' : undefined}
                rel="noreferrer"
                className="block overflow-hidden rounded-xl border border-border"
                aria-label={p.title}
              >
                <CoverImage
                  src={p.cover_image || '/images/project-placeholder.svg'}
                  alt={`${p.title} preview`}
                  width={1200}
                  height={800}
                  className="w-full aspect-[3/2] object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              </a>
              <div className="mt-5">
                <h3 className="text-xl font-display font-semibold text-heading">
                  {p.external ? (
                    <a href={p.external} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </h3>
                <p className="mt-2 leading-relaxed">{p.description}</p>
                {(p.tech || []).length > 0 && (
                  <p className="mt-3 text-sm text-text">{(p.tech || []).join(' · ')}</p>
                )}
                <div className="mt-3 flex gap-5 text-sm">
                  {p.external && (
                    <a href={p.external} target="_blank" rel="noreferrer" className="text-heading hover:text-accent transition-colors">
                      Live site ↗
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="text-heading hover:text-accent transition-colors">
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
